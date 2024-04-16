import { format } from 'date-fns';
import { queryFirebird } from '../../database/firebird';
import { findChecksMapper } from './mappers/CheckMapper';
import { financialType } from '../../messages/FinancialMessages';

class CheckRepository {
  findToday(externalId: string, type: financialType) {
    return queryFirebird(
      externalId,
      `SELECT
        SUM(c.VALOR) AS VALOR,
        p.RAZAO_SOCIAL
      FROM CHEQUE c
      INNER JOIN PESSOA p ON p.ID = c.ID_PESSOA
      WHERE c.TIPO = '${type === 'receivables' ? 'R' : 'E'}'
      AND c.SITUACAO = 'A'
      AND c.DATA_VENCIMENTO = '${format(new Date(), 'MM/dd/yyyy')}'
      GROUP BY p.RAZAO_SOCIAL
      ORDER BY valor desc`,
      findChecksMapper,
    );
  }

  findRange(
    externalId: string,
    type: financialType,
    startDate: Date,
    endDate: Date,
  ) {
    return queryFirebird(
      externalId,
      `SELECT
        SUM(c.VALOR) AS VALOR,
        p.RAZAO_SOCIAL
      FROM CHEQUE c
      INNER JOIN PESSOA p ON p.ID = c.ID_PESSOA
      WHERE c.TIPO = '${type === 'receivables' ? 'R' : 'E'}'
      AND c.SITUACAO = 'A'
      AND c.DATA_VENCIMENTO >= '${format(startDate, 'MM/dd/yyyy')}'
      AND c.DATA_VENCIMENTO <= '${format(endDate, 'MM/dd/yyyy')}'
      GROUP BY p.RAZAO_SOCIAL
      ORDER BY valor desc`,
      findChecksMapper,
    );
  }
}

export default new CheckRepository();

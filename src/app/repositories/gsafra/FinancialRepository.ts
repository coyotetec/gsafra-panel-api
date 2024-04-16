import { format } from 'date-fns';
import { queryFirebird } from '../../database/firebird';
import { findPayablesMapper } from './mappers/FinancialMapper';
import { financialType } from '../../messages/FinancialMessages';

class FinancialRepository {
  findToday(host: string, externalId: string, type: financialType) {
    return queryFirebird(
      host,
      externalId,
      `SELECT
        SUM(
          crp.VALOR_PARCELA -
          crp.TOTAL_PAGO +
          crp.TOTAL_MULTA +
          crp.TOTAL_JUROS -
          crp.TOTAL_DESCONTO
        ) AS VALOR,
        p.RAZAO_SOCIAL
      FROM CONTA_RECEBER_PAGAR crp
      INNER JOIN CRP_M cm ON cm.ID = crp.ID_CRP_M
      INNER JOIN PESSOA p ON p.ID = cm.ID_PESSOA
      WHERE cm.TIPO = ${type === 'receivables' ? 1 : 2}
      AND crp.SITUACAO = 'A'
      AND crp.DATA_VENCIMENTO = '${format(new Date(), 'MM/dd/yyyy')}'
      GROUP BY p.RAZAO_SOCIAL
      ORDER BY VALOR DESC`,
      findPayablesMapper,
    );
  }

  findRange(
    host: string,
    externalId: string,
    type: financialType,
    startDate: Date,
    endDate: Date,
  ) {
    return queryFirebird(
      host,
      externalId,
      `SELECT
        SUM(
          crp.VALOR_PARCELA -
          crp.TOTAL_PAGO +
          crp.TOTAL_MULTA +
          crp.TOTAL_JUROS -
          crp.TOTAL_DESCONTO
        ) AS VALOR,
        p.RAZAO_SOCIAL
      FROM CONTA_RECEBER_PAGAR crp
      INNER JOIN CRP_M cm ON cm.ID = crp.ID_CRP_M
      INNER JOIN PESSOA p ON p.ID = cm.ID_PESSOA
      WHERE cm.TIPO = ${type === 'receivables' ? 1 : 2}
      AND crp.SITUACAO = 'A'
      AND crp.DATA_VENCIMENTO >= '${format(startDate, 'MM/dd/yyyy')}'
      AND crp.DATA_VENCIMENTO <= '${format(endDate, 'MM/dd/yyyy')}'
      GROUP BY p.RAZAO_SOCIAL
      ORDER BY VALOR DESC`,
      findPayablesMapper,
    );
  }
}

export default new FinancialRepository();

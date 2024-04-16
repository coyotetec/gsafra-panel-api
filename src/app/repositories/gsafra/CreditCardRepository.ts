import { format } from 'date-fns';
import { queryFirebird } from '../../database/firebird';
import { findTodayMapper } from './mappers/CreditCardMapper';

class CreditCardRepository {
  async findTodayTotal(externalId: string) {
    return (
      (
        await queryFirebird(
          externalId,
          `SELECT
            SUM(cpd.VALOR) AS TOTAL
          FROM CARTAO_PAGAR_D cpd
          WHERE cpd.SITUACAO = 0
          AND cpd.VENCIMENTO = '${format(new Date(), 'MM/dd/yyyy')}'`,
          findTodayMapper,
        )
      )[0] || 0
    );
  }
}

export default new CreditCardRepository();

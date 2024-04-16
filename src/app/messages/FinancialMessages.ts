import { getDay, subDays } from 'date-fns';
import CheckRepository from '../repositories/gsafra/CheckRepository';
import CreditCardRepository from '../repositories/gsafra/CreditCardRepository';
import FinancialRepository from '../repositories/gsafra/FinancialRepository';
import WhatsappNotificationRepository from '../repositories/gsafra/WhatsappNotificationRepository';
import { payablesMessageGenerate } from './generators/financial/payablesGenerators';
import { sendWhatsappMessage } from '../../utils/sendWhatsappMessage';
import { receivablesMessageGenerate } from './generators/financial/receivablesGenerators';

export type financialType = 'receivables' | 'payables';

class FinancialMessages {
  async accounts(host: string, externalId: string, type: financialType) {
    const contacts = await WhatsappNotificationRepository.findContacts(
      host,
      externalId,
      type === 'payables' ? 'contas_pagar' : 'contas_receber',
    );

    if (contacts.length === 0) {
      console.log(
        `✕ ${externalId}: Não há contatos de ${type === 'payables' ? 'Contas a Pagar' : 'Contas a Receber'}`,
      );
      return;
    }

    const [financial, checks, creditCardTotal] = await Promise.all([
      FinancialRepository.findToday(host, externalId, type),
      CheckRepository.findToday(host, externalId, type),
      type === 'payables'
        ? CreditCardRepository.findTodayTotal(host, externalId)
        : 0,
    ]);

    const saturday = subDays(new Date(), 2);
    const sunday = subDays(new Date(), 1);

    const [weekendFinancial, weekendChecks] =
      getDay(new Date()) === 1
        ? await Promise.all([
            FinancialRepository.findRange(
              host,
              externalId,
              type,
              saturday,
              sunday,
            ),
            CheckRepository.findRange(host, externalId, type, saturday, sunday),
          ])
        : [[], []];

    if (
      financial.length === 0 &&
      checks.length === 0 &&
      creditCardTotal === 0 &&
      weekendFinancial.length === 0 &&
      weekendChecks.length === 0
    ) {
      console.log(
        `✕ ${externalId}: Não há dados de ${type === 'payables' ? 'Contas a Pagar' : 'Contas a Receber'}`,
      );
      return;
    }

    const message =
      type === 'payables'
        ? payablesMessageGenerate({
            payables: [...financial, ...weekendFinancial],
            checks: [...checks, ...weekendChecks],
            creditCardTotal,
          })
        : receivablesMessageGenerate({
            receivables: [...financial, ...weekendFinancial],
            checks: [...checks, ...weekendChecks],
          });

    await Promise.all(
      contacts.map(({ whatsappNumber }) =>
        sendWhatsappMessage(whatsappNumber, message),
      ),
    );

    console.log(
      `✓ ${externalId}: Mensagem de ${type === 'payables' ? 'Contas a Pagar' : 'Contas a Receber'} enviada os números: ${contacts.map(({ whatsappNumber }) => whatsappNumber).join(', ')}`,
    );
  }
}

export default new FinancialMessages();

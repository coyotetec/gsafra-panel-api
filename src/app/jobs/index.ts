import { CronJob } from 'cron';
import FinancialMessages from '../messages/FinancialMessages';
import CompanyRepository from '../repositories/panel/CompanyRepository';

export const financialJob = new CronJob(
  '0 8 * * 1-5',
  async () => {
    const companies = await CompanyRepository.findMany({ active: true });

    for (const company of companies) {
      await FinancialMessages.accounts(company.externalId, 'payables');
      await FinancialMessages.accounts(company.externalId, 'receivables');
    }
  },
  null,
  true,
  'America/Belem',
);

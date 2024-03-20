import { z } from 'zod';
import { companySchema } from '../../schemas/companySchema';
import { APPError } from '../../errors/APPError';
import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

export async function createCompany(
  companyData: z.infer<typeof companySchema>,
) {
  const companyExists = await CompanyRepository.findFirst({
    where: {
      externalId: companyData.externalId,
    },
  });

  if (companyExists) {
    throw new APPError('Já existe uma empresa com este código');
  }

  const company = await CompanyRepository.create({
    data: companyData,
  });

  return company;
}

import { APPError } from '../../../errors/APPError';
import CompanyRepository from '../../../repositories/panel/CompanyRepository';

interface ICreateCompany {
  name: string;
  host: string;
  externalId: string;
}

export async function createCompany(companyData: ICreateCompany) {
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

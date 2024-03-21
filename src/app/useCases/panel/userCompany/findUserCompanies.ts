import { APPError } from '../../../errors/APPError';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';

export async function findUserCompanies(userId: string) {
  const companiesData =
    await UserCompanyRepository.findManyUserCompanies(userId);

  if (!companiesData) throw new APPError('Usuário não encontrado');

  const formattedCompaniesData = companiesData.map(({ company }) => ({
    name: company.name,
    id: company.id,
  }));

  return formattedCompaniesData;
}

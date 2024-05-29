import { decryptPassword } from '../../../../utils/cipherFunctions';
import { APPError } from '../../../errors/APPError';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';

export async function findUserCompanies(userId: string) {
  const companiesData =
    await UserCompanyRepository.findManyUserCompanies(userId);

  if (!companiesData) throw new APPError('Usuário não encontrado');

  const formattedCompaniesData = companiesData.map(({ company }) => ({
    name: company.name,
    id: company.id,
    externalId: company.externalId,
    password: decryptPassword(company.password),
  }));

  return {
    externalUserId: companiesData?.[0].user.externalId,
    companies: formattedCompaniesData,
  };
}

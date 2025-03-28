import { decryptPassword } from '../../../../utils/cipherFunctions';
import { APPError } from '../../../errors/APPError';
import UserRepository from '../../../repositories/gsafra/UserRepository';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';
import UserRepositoryPanel from '../../../repositories/panel/UserRepository';

export async function findUserCompanies(userId: string) {
  const companiesData =
    await UserCompanyRepository.findManyUserCompanies(userId);
  const user = await UserRepositoryPanel.findUnique({ id: userId });
  if (!companiesData) throw new APPError('Usuário não encontrado');
  const formattedCompaniesData = companiesData.map(({ company }) => ({
    name: company.name,
    id: company.id,
    externalId: company.externalId,
    host: company.host || '',
    password: decryptPassword(company.password),
  }));
  const userFirebirdId = formattedCompaniesData.length
    ? await UserRepository.findByEmail(
      formattedCompaniesData[0].host,
      formattedCompaniesData[0].externalId,
      {
        email: user?.email || '',
      },
    )
    : [{ id: '' }];

  return {
    externalUserId: companiesData?.[0]?.user?.externalId,
    companies: formattedCompaniesData,
    userFirebirdId: userFirebirdId.map(item => item.id),
  };
}

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
  }))

  const userFirebirdId = Promise.all(formattedCompaniesData.map(async item => {
    try {
      const data = await UserRepository.findByEmail(
        item.host,
        item.externalId,
        {
          email: user?.email || '',
        })
      return data[0]
    } catch (err) {
      return null
    }
  }))
  const dataFirebirdId = await userFirebirdId
  return {
    externalUserId: companiesData?.map(item => item.company.externalId),
    companies: formattedCompaniesData,
    userFirebirdId: await dataFirebirdId?.map(item => item?.id),
  };
}

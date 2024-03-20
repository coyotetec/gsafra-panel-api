import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';

export async function listUserCompanies(userId: string) {
  const companies = await UserCompanyRepository.findAll({
    userId,
  });

  return companies;
}

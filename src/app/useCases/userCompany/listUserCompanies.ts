import UserCompanyRepository from '../../repositories/panelDB/UserCompanyRepository';

export async function listUserCompanies(userId: string) {
  const companies = await UserCompanyRepository.findAll({
    userId,
  });

  return companies;
}

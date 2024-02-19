import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

export async function findCompanies() {
  return CompanyRepository.findMany();
}

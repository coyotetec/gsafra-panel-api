import CompanyRepository from '../../repositories/CompanyRepository';

export async function findCompanies() {
  return CompanyRepository.findMany();
}

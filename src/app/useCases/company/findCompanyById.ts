import { APPError } from '../../errors/APPError';
import CompanyRepository from '../../repositories/CompanyRepository';

export async function findCompanyById(id: string) {
  const company = await CompanyRepository.findUnique({ where: { id } });

  if (!company) throw new APPError('Company not found');

  return company;
}

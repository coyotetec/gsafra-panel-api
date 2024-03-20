import { APPError } from '../../../errors/APPError';
import CompanyRepository from '../../../repositories/panel/CompanyRepository';

export async function findCompanyById(id: string) {
  const company = await CompanyRepository.findUnique(id);

  if (!company) throw new APPError('Empresa não encontrada');

  return company;
}

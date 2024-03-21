import { APPError } from '../../../errors/APPError';
import CompanyRepository from '../../../repositories/panel/CompanyRepository';

export async function inactivateCompany(id: string) {
  const company = await CompanyRepository.findUnique(id);

  if (!company) throw new APPError('Empresa não encontrada');

  await CompanyRepository.delete({ where: { id } });
}

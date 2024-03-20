import { APPError } from '../../errors/APPError';
import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

export async function inactivateCompany(id: string) {
  const company = await CompanyRepository.findUnique({ where: { id } });

  if (!company) throw new APPError('Empresa não encontrada');

  await CompanyRepository.delete({ where: { id } });
}

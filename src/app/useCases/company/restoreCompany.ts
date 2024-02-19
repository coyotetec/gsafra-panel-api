import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

export function restoreCompany(id: string) {
  const company = CompanyRepository.findUnique({ where: { id } });

  if (!company) throw new Error('Company not found');

  return CompanyRepository.restore({ where: { id } });
}

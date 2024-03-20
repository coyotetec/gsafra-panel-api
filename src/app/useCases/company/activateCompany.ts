import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

export async function activateCompany(id: string) {
  const company = await CompanyRepository.findUnique({ where: { id } });

  if (!company) throw new Error('Empresa não encontrada');

  await CompanyRepository.restore({ where: { id } });
}

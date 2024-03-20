import CompanyRepository from '../../../repositories/panel/CompanyRepository';

export async function activateCompany(id: string) {
  const company = await CompanyRepository.findUnique(id);

  if (!company) throw new Error('Empresa não encontrada');

  await CompanyRepository.restore({ where: { id } });
}

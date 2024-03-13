import { APPError } from '../../errors/APPError';
import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

interface IUpdateCompany {
  name: string;
  externalId: string;
}

export async function updateCompany(data: IUpdateCompany, id: string) {
  const companyExists = await CompanyRepository.findUnique({ where: { id } });

  if (!companyExists) throw new APPError('Empresa não encontrada');

  return await CompanyRepository.update({
    where: { id },
    data,
  });
}

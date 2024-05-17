import { decryptPassword } from '../../../../utils/cipherFunctions';
import CompanyRepository from '../../../repositories/panel/CompanyRepository';

export async function findCompanies() {
  return (await CompanyRepository.findMany()).map((company) => ({
    id: company.id,
    name: company.name,
    password: decryptPassword(company.password),
    host: company.host,
    externalId: company.externalId,
    active: company.active,
    usersQty: company._count.userCompany,
  }));
}

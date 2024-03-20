import CompanyRepository from '../../repositories/panelDB/CompanyRepository';

export async function findCompanies() {
  return (await CompanyRepository.findMany()).map((company) => ({
    id: company.id,
    name: company.name,
    externalId: company.externalId,
    active: company.active,
    usersQty: company._count.userCompany,
  }));
}

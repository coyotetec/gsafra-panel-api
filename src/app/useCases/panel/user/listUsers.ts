import { userRoleType } from '../../../../types/user';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';
import UserRepository from '../../../repositories/panel/UserRepository';

interface IListUsersArgs {
  requesterId: string;
  requesterRole: userRoleType;
}

interface IListUsersResponse {
  id: string;
  name: string;
  email: string;
  role: userRoleType;
  externalId: number;
  active: boolean;
  companies: {
    id: string;
    name: string;
  }[];
}

export async function listUsers({
  requesterId,
  requesterRole,
}: IListUsersArgs) {
  const requesterUserCompanies = await UserCompanyRepository.findAll({
    userId: requesterId,
  });

  let users: IListUsersResponse[] = [];

  if (requesterRole === 'MANAGER') {
    users = (await UserRepository.findAll()).map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      externalId: user.externalId,
      active: user.active,
      companies: user.userCompany.map((userCompany) => ({
        id: userCompany.company.id,
        name: userCompany.company.name,
      })),
    }));
  } else {
    users = (
      await UserRepository.findAll(
        requesterUserCompanies.map((company) => company.companyId),
      )
    )
      .map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          externalId: user.externalId,
          active: user.active,
          companies: user.userCompany.map((userCompany) => ({
            id: userCompany.company.id,
            name: userCompany.company.name,
          })),
        };
      })
      .filter((user) => user.id !== requesterId);
  }

  return users.map(
    ({ active, email, externalId, id, name, role, companies }) => ({
      active,
      email,
      externalId,
      id,
      name,
      role,
      companies,
    }),
  );
}

import { userRoleType } from '../../../types/user';
import UserCompanyRepository from '../../repositories/panelDB/UserCompanyRepository';
import UserRepository from '../../repositories/panelDB/UserRepository';

interface IListUsersArgs {
  requesterId: string;
  requesterRole: userRoleType;
}

interface IListUsersResponse {
  id: string;
  name: string;
  email: string;
  password: string | null;
  role: userRoleType;
  externalId: number;
  active: boolean;
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
    users = await UserRepository.findAll();
  } else {
    users = await UserRepository.findAll(
      requesterUserCompanies.map((company) => company.companyId),
    );
  }

  return users;
}

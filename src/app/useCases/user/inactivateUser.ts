import { userRoleType } from '../../../types/user';
import { APPError } from '../../errors/APPError';
import { AuthError } from '../../errors/AuthError';
import UserCompanyRepository from '../../repositories/panelDB/UserCompanyRepository';
import UserRepository from '../../repositories/panelDB/UserRepository';

interface IInactivateUserArgs {
  userId: string;
  requesterId: string;
  requesterRole: userRoleType;
}

export async function inactivateUser({
  userId,
  requesterId,
  requesterRole,
}: IInactivateUserArgs) {
  const requesterUserCompanies = await UserCompanyRepository.findAll({
    userId: requesterId,
  });
  const user = await UserRepository.findUnique({
    id: userId,
  });
  const userCompanies = await UserCompanyRepository.findAll({
    userId,
  });

  if (!user) {
    throw new APPError('user does not exists');
  }

  let sameCompany = false;

  if (requesterRole === 'MANAGER') {
    sameCompany = true;
  } else {
    requesterUserCompanies.forEach((requesterCompany) => {
      userCompanies.forEach((userCompany) => {
        if (requesterCompany.companyId === userCompany.companyId) {
          sameCompany = true;
        }
      });
    });
  }

  if (!sameCompany) {
    throw new AuthError('you can not do this operation');
  }

  if (user.active) {
    await UserRepository.inactivateUser(userId);
  }
}

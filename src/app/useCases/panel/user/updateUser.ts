import { userRoleType } from '../../../../types/user';
import { APPError } from '../../../errors/APPError';
import { AuthError } from '../../../errors/AuthError';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';
import UserRepository from '../../../repositories/panel/UserRepository';

interface IUpdateUserPayload {
  name: string;
  email: string;
  role: userRoleType;
  externalId?: number;
}

interface IUpdateUserArgs {
  payload: IUpdateUserPayload;
  userId: string;
  requesterId: string;
  requesterRole: string;
}

export async function updateUser({
  payload,
  userId,
  requesterId,
  requesterRole,
}: IUpdateUserArgs) {
  const requesterUserCompanies = await UserCompanyRepository.findAll({
    userId: requesterId,
  });
  const userExists = await UserRepository.findUnique({
    id: userId,
  });
  const userCompanies = await UserCompanyRepository.findAll({
    userId,
  });

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
    throw new AuthError('Você não tem permissão para atualizar este usuário');
  }

  if (!userExists) {
    throw new APPError('Usuário não encontrado');
  }

  const user = await UserRepository.update(userId, {
    name: payload.name,
    email: payload.email,
    role: payload.role,
    externalId: payload.externalId || 0,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    externalId: user.externalId,
    active: user.active,
  };
}

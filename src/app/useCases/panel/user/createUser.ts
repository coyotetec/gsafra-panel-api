import { userRoleType } from '../../../../types/user';
import { sendEmail } from '../../../../utils/sendEmail';
import { APPError } from '../../../errors/APPError';
import { AuthError } from '../../../errors/AuthError';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';
import UserRepository from '../../../repositories/panel/UserRepository';

export interface ICreateUserPayload {
  name: string;
  email: string;
  role: userRoleType;
  companyId?: string;
  externalId?: number;
}

interface ICreateUserArgs {
  payload: ICreateUserPayload;
  requesterId: string;
  requesterRole: userRoleType;
  firebirdUserId: number;
}

export async function createUser({
  payload,
  requesterId,
  requesterRole,
  firebirdUserId,
}: ICreateUserArgs) {
  const requesterUserCompanies = await UserCompanyRepository.findAll({
    userId: requesterId,
  });

  const sameCompany =
    requesterRole === 'MANAGER'
      ? true
      : requesterUserCompanies.some(
          (company) => company.companyId === payload.companyId,
        );

  if (!sameCompany) {
    throw new AuthError('Você não tem permissão para criar este usuário');
  }

  const userAlreadyExists = await UserRepository.findUnique({
    email: payload.email,
  });

  if (userAlreadyExists) {
    throw new APPError('Email já está em uso');
  }

  const user = await UserRepository.create({
    name: payload.name,
    email: payload.email,
    role: payload.role,
    externalId: payload.externalId || 0,
  });

  if (payload.role !== 'MANAGER' && payload.companyId) {
    await UserCompanyRepository.create({
      userId: user.id,
      companyId: payload.companyId,
    });
  }
  sendEmail(
    user.email,
    'Bem-vindo ao Painel GSafra',
    {
      name: user.name,
      url: `${process.env.RESET_PASSWORD_URL}?u=${user.id}&f=${firebirdUserId}&c=${payload.companyId}`,
    },
    'welcome',
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    externalId: user.externalId,
    active: user.active,
  };
}

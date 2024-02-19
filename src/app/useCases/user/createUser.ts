import { userRoleType } from '../../../types/user';
import { sendEmail } from '../../../utils/sendEmail';
import { APPError } from '../../errors/APPError';
import { AuthError } from '../../errors/AuthError';
import UserCompanyRepository from '../../repositories/panelDB/UserCompanyRepository';
import UserRepository from '../../repositories/panelDB/UserRepository';

interface ICreateUserPayload {
  name: string;
  email: string;
  role: userRoleType;
  externalId?: number;
}

interface ICreateUserArgs {
  payload: ICreateUserPayload;
  companyId?: string;
  requesterId: string;
  requesterRole: userRoleType;
}

export async function createUser({
  payload,
  companyId,
  requesterId,
  requesterRole,
}: ICreateUserArgs) {
  const requesterUserCompanies = await UserCompanyRepository.findAll({
    userId: requesterId,
  });

  const sameCompany =
    requesterRole === 'MANAGER'
      ? true
      : requesterUserCompanies.some(
          (company) => company.companyId === companyId,
        );

  if (!sameCompany) {
    throw new AuthError('you can not do this operation');
  }

  const userAlreadyExists = await UserRepository.findUnique({
    email: payload.email,
  });

  if (userAlreadyExists) {
    throw new APPError('email already in use');
  }

  const user = await UserRepository.create({
    ...payload,
    externalId: payload.externalId || 1,
  });

  if (payload.role !== 'MANAGER' && companyId) {
    await UserCompanyRepository.create({
      userId: user.id,
      companyId,
    });
  }

  sendEmail(
    user.email,
    'Bem-vindo ao Painel GSafra',
    { name: user.name },
    'welcome',
  );

  return user;
}

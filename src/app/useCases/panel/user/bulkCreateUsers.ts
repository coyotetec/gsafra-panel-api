import { sendEmail } from '../../../../utils/sendEmail';
import { APPError } from '../../../errors/APPError';
import { ICreateUserPayload } from './createUser';
import UserRepository from '../../../repositories/panel/UserRepository';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';
import { userRoleType } from '../../../../types/user';

interface IBulkCreateUsersResponse {
  id: string;
  name: string;
  email: string;
  role: userRoleType;
  externalId: number;
  active: boolean;
}

export async function bulkCreateUsers(payloads: ICreateUserPayload[]) {
  const users: IBulkCreateUsersResponse[] = [];

  for (const payload of payloads) {
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

    users.push({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      externalId: user.externalId,
      active: user.active,
    });

    if (payload.companyId) {
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
        url: `${process.env.RESET_PASSWORD_URL}?u=${user.id}`,
      },
      'welcome',
    );
  }

  return users;
}

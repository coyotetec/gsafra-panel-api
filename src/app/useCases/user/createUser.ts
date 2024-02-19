import { sendEmail } from '../../../utils/sendEmail';
import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/panelDB/UserRepository';

interface ICreateUserPayload {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  externalId?: number;
}

export async function createUser(payload: ICreateUserPayload) {
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

  sendEmail(
    user.email,
    'Bem-vindo ao Painel GSafra',
    { name: user.name },
    'welcome',
  );

  return user;
}

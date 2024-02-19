import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/panelDB/UserRepository';

interface ICreateUserPayload {
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  externalId?: number;
}

export async function updateUser(userId: string, payload: ICreateUserPayload) {
  const userExists = await UserRepository.findUnique({
    id: userId,
  });

  if (!userExists) {
    throw new APPError('user does not exists');
  }

  const user = await UserRepository.update(userId, {
    ...payload,
    externalId: payload.externalId || 1,
  });

  return user;
}

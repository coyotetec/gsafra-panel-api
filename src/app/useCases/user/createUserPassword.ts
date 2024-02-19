import { hashPassword } from '../../../utils/hashPassword';
import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/panelDB/UserRepository';

export async function createUserPassword(userId: string, password: string) {
  const userExists = await UserRepository.findUnique({
    id: userId,
  });

  if (!userExists) {
    throw new APPError('user does not exists');
  }

  const hashedPassword = await hashPassword(password);

  await UserRepository.createPassword(userId, hashedPassword);
}

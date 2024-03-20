import { hashPassword } from '../../../../utils/hashPassword';
import { APPError } from '../../../errors/APPError';
import UserRepository from '../../../repositories/panel/UserRepository';

export async function createUserPassword(userId: string, password: string) {
  const userExists = await UserRepository.findUnique({
    id: userId,
  });

  if (!userExists) {
    throw new APPError('Usuário não encontrado');
  }

  const hashedPassword = await hashPassword(password);

  await UserRepository.createPassword(userId, hashedPassword);
}

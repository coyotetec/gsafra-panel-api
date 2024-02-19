import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/panelDB/UserRepository';

export async function inactivateUser(userId: string) {
  const userExists = await UserRepository.findUnique({
    id: userId,
  });

  if (!userExists) {
    throw new APPError('user does not exists');
  }

  if (userExists.active) {
    await UserRepository.inactivateUser(userId);
  }
}

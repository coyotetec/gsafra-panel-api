import { hashPassword } from '../../../../utils/hashPassword';
import { sendEmail } from '../../../../utils/sendEmail';
import { APPError } from '../../../errors/APPError';
import UserRepository from '../../../repositories/panel/UserRepository';

export async function createPassword(userId: string, password: string) {
  const userExists = await UserRepository.findUnique({
    id: userId,
  });

  if (!userExists) {
    throw new APPError('Usuário não encontrado');
  }

  if (userExists.password) {
    throw new APPError('Usuário já possui senha');
  }

  const hashedPassword = await hashPassword(password);

  await UserRepository.createPassword(userId, hashedPassword);

  sendEmail(
    userExists.email,
    'Senha Alterada com Sucesso',
    { name: userExists.name },
    'passwordChanged',
  );
}

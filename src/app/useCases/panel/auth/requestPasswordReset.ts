import crypto from 'node:crypto';
import { APPError } from '../../../errors/APPError';
import ResetTokenRepository from '../../../repositories/panel/ResetTokenRepository';
import UserRepository from '../../../repositories/panel/UserRepository';
import { hashPassword } from '../../../../utils/hashPassword';
import { sendEmail } from '../../../../utils/sendEmail';

export async function requestPasswordReset(email: string) {
  const user = await UserRepository.findUnique({
    email,
  });

  if (!user) {
    throw new APPError('Não existe um usuário com esse e-mail');
  }

  const resetTokenExists = await ResetTokenRepository.findUnique({
    userId: user.id,
  });

  if (resetTokenExists) {
    await ResetTokenRepository.deleteById(resetTokenExists.id);
  }

  const resetToken = crypto.randomBytes(16).toString('hex');
  const hashedResetToken = await hashPassword(resetToken);

  await ResetTokenRepository.create({
    userId: user.id,
    token: hashedResetToken,
  });

  sendEmail(
    user.email,
    'Solicitação de Redefinição de Senha',
    {
      name: user.name,
      url: `${process.env.RESET_PASSWORD_URL}?u=${user.id}&t=${resetToken}`,
    },
    'resetPassword',
  );
}

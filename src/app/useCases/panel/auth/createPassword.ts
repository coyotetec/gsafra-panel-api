import axios from 'axios';
import { hashPassword } from '../../../../utils/hashPassword';
import { sendEmail } from '../../../../utils/sendEmail';
import { APPError } from '../../../errors/APPError';
import UserRepository from '../../../repositories/panel/UserRepository';
import { createPasswordFirebird } from '../../gsafra/user/createPassword';
interface ICreatePassword {
  userId: string;
  password: string;
  companyId: string;
  firebirdId: string;
}
export async function createPassword({
  userId,
  password,
  companyId,
  firebirdId,
}: ICreatePassword) {
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
  await createPasswordFirebird({
    companyId,
    firebirdId: Number(firebirdId),
    password: hashedPassword,
  });
  const companyCreatedPassword = await UserRepository.createPassword(
    userId,
    hashedPassword,
  );
  await axios.post('http://acesso.gsafra.com:3004/create-user', {
    email: String(userExists.email),
    companyId: companyCreatedPassword.externalId,
    userId: firebirdId,
  });
  sendEmail(
    userExists.email,
    'Senha Alterada com Sucesso',
    { name: userExists.name },
    'passwordChanged',
  );
}

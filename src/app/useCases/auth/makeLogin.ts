import { validatePassword } from '../../../utils/validatePassword';
import { APPError } from '../../errors/APPError';
import UserRepository from '../../repositories/panelDB/UserRepository';
import jwt from 'jsonwebtoken';

interface IMakeLoginPayload {
  email: string;
  password: string;
}

export async function makeLogin(payload: IMakeLoginPayload) {
  const user = await UserRepository.findUnique({
    email: payload.email,
  });

  if (!user) {
    throw new APPError('Usuário incorreto');
  }

  if (!user.active) {
    throw new APPError('Usuário está inativo');
  }

  if (!user.password) {
    throw new APPError('Usuário não terminou seu cadastro');
  }

  const samePassword = await validatePassword(payload.password, user.password);

  if (!samePassword) {
    throw new APPError('Senha incorreta');
  }

  const jwtSecret = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    jwtSecret,
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
      externalId: user.externalId,
    },
  };
}

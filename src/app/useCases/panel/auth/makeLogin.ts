import { validatePassword } from '../../../../utils/validatePassword';
import { APPError } from '../../../errors/APPError';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';
import UserRepository from '../../../repositories/panel/UserRepository';
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

  const userCompanies = await UserCompanyRepository.findManyUserCompanies(
    user.id,
  );

  if (
    user.role !== 'MANAGER' &&
    userCompanies.every(({ company: { active } }) => !active)
  ) {
    throw new APPError('Você não possui empresa ativa');
  }

  if (!user.active) {
    throw new APPError('Você está inativo');
  }

  if (!user.password) {
    throw new APPError('Você não terminou seu cadastro');
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

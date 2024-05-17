import { validatePassword } from '../../../../utils/cipherFunctions';
import { APPError } from '../../../errors/APPError';
import CompanyRepository from '../../../repositories/panel/CompanyRepository';
import jwt from 'jsonwebtoken';

interface IMakeCompanyLoginPayload {
  externalId: string;
  password: string;
}

export async function makeCompanyLogin(payload: IMakeCompanyLoginPayload) {
  const company = await CompanyRepository.findUnique({
    externalId: payload.externalId,
  });

  if (!company) {
    throw new APPError('Código da empresa incorreto');
  }

  if (!company.active) {
    throw new APPError('Empresa está inativa');
  }

  const samePassword = await validatePassword(
    payload.password,
    company.password,
  );

  if (!samePassword) {
    throw new APPError('Senha incorreta');
  }

  const jwtSecret = process.env.JWT_SECRET as string;
  const token = jwt.sign(
    {
      name: company.name,
      host: company.host,
      code: company.externalId,
    },
    jwtSecret,
  );

  return {
    token,
  };
}

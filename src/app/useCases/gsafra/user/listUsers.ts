import { userRoleType } from '../../../../types/user';
import { APPError } from '../../../errors/APPError';
import { AuthError } from '../../../errors/AuthError';
import UserRepository from '../../../repositories/gsafra/UserRepository';
import CompanyRepository from '../../../repositories/panel/CompanyRepository';
import UserCompanyRepository from '../../../repositories/panel/UserCompanyRepository';

interface IListUserArgs {
  companyId: string;
  requesterId: string;
  requesterRole: userRoleType;
}

export async function listUsers({
  companyId,
  requesterId,
  requesterRole,
}: IListUserArgs) {
  const companyExists = await CompanyRepository.findUnique(companyId);

  if (!companyExists) {
    throw new APPError('Empresa não existe');
  }

  const userBelongsToCompany =
    requesterRole === 'MANAGER'
      ? true
      : await UserCompanyRepository.userBelongsToCompany({
          companyId,
          userId: requesterId,
        });

  if (!userBelongsToCompany) {
    throw new AuthError(
      'Você não tem permissão para listar os usuários desta empresa',
    );
  }

  const users = await UserRepository.findAll(companyExists.externalId);

  return users;
}

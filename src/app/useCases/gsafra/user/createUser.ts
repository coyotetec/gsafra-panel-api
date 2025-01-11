import { APPError } from "../../../errors/APPError";
import UserRepository from "../../../repositories/gsafra/UserRepository";
import CompanyRepository from "../../../repositories/panel/CompanyRepository";

interface IListUserArgs {
  companyId: string;
  login: string;
  idPapel: number;
}

export async function createUserInFirebird({
  companyId,
  login,
  idPapel,
}: IListUserArgs) {
  const companyExists = await CompanyRepository.findUnique({ id: companyId });
  if (!companyExists) {
    throw new APPError("Empresa não existe");
  }

  return UserRepository.createUser(
    companyExists.host,
    companyExists.externalId,
    {
      login,
      idPapel,
    },
  );
}

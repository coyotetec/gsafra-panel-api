import { APPError } from "../../../errors/APPError";
import UserRepository from "../../../repositories/gsafra/UserRepository";
import CompanyRepository from "../../../repositories/panel/CompanyRepository";

interface IListUserArgs {
  companyId: string;
  firebirdId: number;
  password: string;
}

export async function createPasswordFirebird({
  companyId,
  firebirdId,
  password,
}: IListUserArgs) {
  const companyExists = await CompanyRepository.findUnique({ id: companyId });
  if (!companyExists) {
    throw new APPError("Empresa não existe");
  }

  return UserRepository.createPassword(
    companyExists.host,
    companyExists.externalId,
    {
      password,
      firebirdId,
    },
  );
}

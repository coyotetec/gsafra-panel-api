import { APPError } from "../../../errors/APPError";
import PapelRepository from "../../../repositories/gsafra/PapelRepository";
import CompanyRepository from "../../../repositories/panel/CompanyRepository";

interface ListPanelProps {
  companyId: string;
}
export async function listPapel({ companyId }: ListPanelProps) {
  const companyExists = await CompanyRepository.findUnique({ id: companyId });
  if (!companyExists) {
    throw new APPError("Empresa não existe");
  }
  return PapelRepository.findAll({
    host: companyExists.host,
    externalId: companyExists.externalId,
  });
}

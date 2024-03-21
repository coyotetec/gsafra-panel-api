import { capitalizeWords } from '../../../../utils/capitalizeWords';

interface IFindAllPersistence {
  ID: number;
  LOGIN: string;
  EMAIL: string;
}

export interface IFindAllDomain {
  id: number;
  name: string;
  email: string;
}

export function findAllMapper(
  persistence: IFindAllPersistence,
): IFindAllDomain {
  return {
    id: persistence.ID,
    name: capitalizeWords(persistence.LOGIN),
    email: persistence.EMAIL,
  };
}

import { capitalizeWords } from '../../../../utils/capitalizeWords';

interface IFindAllPersistence {
  ID: number;
  LOGIN: string;
  EMAIL: string;
}

export function findAllMapper(persistence: IFindAllPersistence) {
  return {
    id: persistence.ID,
    name: capitalizeWords(persistence.LOGIN),
    email: persistence.EMAIL ? persistence.EMAIL : undefined,
  };
}

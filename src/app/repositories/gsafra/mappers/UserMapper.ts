interface IFindAllPersistence {
  ID: number;
  externalId: string | number;
}

export function findAllMapper(persistence: IFindAllPersistence) {
  return {
    id: persistence.ID,
    externalId: persistence.externalId,
  };
}

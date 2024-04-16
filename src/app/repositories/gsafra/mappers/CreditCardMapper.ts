interface IFindTodayPersistence {
  TOTAL: number;
}

export function findTodayMapper(persistence: IFindTodayPersistence) {
  return persistence.TOTAL;
}

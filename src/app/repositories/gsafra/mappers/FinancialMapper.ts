interface IFindTodayPersistence {
  VALOR: number;
  RAZAO_SOCIAL: string;
}

export function findPayablesMapper(persistence: IFindTodayPersistence) {
  return {
    value: persistence.VALOR,
    recipientName: persistence.RAZAO_SOCIAL.trim(),
  };
}

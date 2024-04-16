interface IFindTodayPersistence {
  VALOR: number;
  RAZAO_SOCIAL: string;
}

export function findChecksMapper(persistence: IFindTodayPersistence) {
  return {
    value: persistence.VALOR,
    recipientName: persistence.RAZAO_SOCIAL.trim(),
  };
}

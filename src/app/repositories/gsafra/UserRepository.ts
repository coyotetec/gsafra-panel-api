import { queryFirebird } from '../../database/firebird';
import { IFindAllDomain, findAllMapper } from './mappers/UserMapper';

class UserRepository {
  findAll(externalId: string) {
    return queryFirebird<IFindAllDomain>(
      externalId,
      `SELECT u.ID, u.LOGIN, p.EMAIL FROM USUARIO u
      LEFT JOIN PESSOA p ON p.ID = u.ID_PESSOA
      WHERE u.STATUS = 1`,
      findAllMapper,
    );
  }
}

export default new UserRepository();

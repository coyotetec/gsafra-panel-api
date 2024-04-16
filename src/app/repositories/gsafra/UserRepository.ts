import { queryFirebird } from '../../database/firebird';
import { findAllMapper } from './mappers/UserMapper';

class UserRepository {
  findAll(externalId: string) {
    return queryFirebird(
      externalId,
      `SELECT u.ID, u.LOGIN, p.EMAIL FROM USUARIO u
      LEFT JOIN PESSOA p ON p.ID = u.ID_PESSOA
      WHERE u.STATUS = 1
      ORDER BY u.LOGIN`,
      findAllMapper,
    );
  }
}

export default new UserRepository();

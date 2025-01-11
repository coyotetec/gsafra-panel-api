import { queryFirebird } from '../../database/firebird';
import { findAllMapper } from './mappers/UserMapper';

class UserRepository {
  findAll(host: string, externalId: string) {
    return queryFirebird(
      host,
      externalId,
      `SELECT u.ID, u.LOGIN, p.EMAIL FROM USUARIO u
      LEFT JOIN PESSOA p ON p.ID = u.ID_PESSOA
      WHERE u.STATUS = 1
      ORDER BY u.LOGIN`,
      findAllMapper,
    );
  }

  createUser(
    host: string,
    externalId: string,
    data: {
      login: string;
      idPapel: number;
    },
  ) {
    return queryFirebird(
      host,
      externalId,
      `
        INSERT INTO USUARIO (ID, LOGIN, LOGIN_APP, STATUS, ID_PAPEL) values (GEN_ID(GEN_USUARIO, 1), '${data.login}', '${data.login}', 1, ${data.idPapel}) RETURNING ID;
      `,
      findAllMapper,
    );
  }

  createPassword(
    host: string,
    externalId: string,
    data: {
      password: string;
      firebirdId: number;
    },
  ) {
    return queryFirebird(
      host,
      externalId,
      `
        UPDATE USUARIO SET SENHA='${data.password}', SENHA_APP='${data.password}' WHERE ID = ${data.firebirdId};
      `,
      findAllMapper,
    );
  }

  findByEmail(
    host: string,
    externalId: string,
    data: {
      email: string;
    },
  ) {
    return queryFirebird(
      host,
      externalId,
      `
      SELECT * FROM USUARIO WHERE USUARIO.LOGIN = '${data.email}';
      `,
      findAllMapper,
    );
  }
}

export default new UserRepository();

import { queryFirebird } from '../../database/firebird';
import { findAllMapper } from './mappers/PapelMapper';
class PapelRepository {
  async findAll({ host, externalId }: { host: string; externalId: string }) {
    console.log(host);
    return queryFirebird(
      host,
      externalId,
      `SELECT * FROM PAPEL`,
      findAllMapper,
    );
  }
}
export default new PapelRepository();

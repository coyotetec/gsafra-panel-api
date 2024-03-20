/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Firebird from 'node-firebird';

export function queryFirebird<D>(
  externalId: string,
  query: string,
  mapper: (persistence: any) => D,
) {
  return new Promise<D[]>((resolve, reject) => {
    Firebird.attach(
      {
        host: process.env.FIREBIRD_HOST,
        port: Number(process.env.FIREBIRD_PORT),
        database: `/opt/firebird/data/${externalId}/AGRO.FDB`,
        user: process.env.FIREBIRD_USER,
        password: process.env.FIREBIRD_PASSWORD,
        lowercase_keys: false,
        pageSize: 4096,
      },
      (err, db) => {
        if (err) {
          return reject(err);
        }

        db.query(query, [], (err, result) => {
          db.detach();

          if (err) {
            return reject(err);
          }

          resolve(result.map((item) => mapper(item)));
        });
      },
    );
  });
}

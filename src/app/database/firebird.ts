/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Firebird from "node-firebird";

export function queryFirebird<D>(
  host: string,
  externalId: string,
  query: string,
  mapper: (persistence: any) => D,
) {
  return new Promise<D[]>((resolve, reject) => {
    Firebird.attach(
      {
        host,
        port: 3050,
        database: `C:\\Cyot\\BD\\${externalId}\\AGRO.FDB`,
        user: process.env.FIREBIRD_USER,
        password: process.env.FIREBIRD_PASSWORD,
        lowercase_keys: false,
        pageSize: 4096,
        blobAsText: true,
      },
      (err, db) => {
        if (err) {
          return reject(err);
        }

        db.query(query, [], (err, result) => {
          db.detach();
          if (!result) {
            return resolve([]);
          }
          if (!Array.isArray(result)) {
            return resolve(result);
          }
          if (err) {
            return reject(err);
          }
          resolve(result.map((item) => mapper(item)));
        });
      },
    );
  });
}

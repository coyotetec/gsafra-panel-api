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
        host: "localhost",
        port: 3050,
        database: `//Library//Frameworks//Firebird.framework//Versions//A//Resources//examples//empbuild//AGRO.FDB`,
        user: "SYSDBA",
        password: "masterkey",
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

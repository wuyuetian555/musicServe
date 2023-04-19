const mysql = require("mysql");
const congfig = {
  host: "124.220.0.103",
  port: "3306",
  user: "music",
  password: "1210875592th",
  database: "music",
  connectionLimit: 10,
};
const pool = mysql.createPool(congfig);

exports.db = (sql, sqlParams) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        conn.query(sql, sqlParams, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
          conn.release();
        });
      }
    });
  }).catch((err) => {
    console.log(err);
  });
};

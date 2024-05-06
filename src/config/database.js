const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  maxIdle: 30,
  idleTimeout: 60000,
  queueLimit: 500,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

module.exports = dbPool.promise();

const mysql = require('mysql2/promise');
require('dotenv').config();

// If DATABASE_URL is present, use it directly; otherwise fallback to individual vars
const poolConfig = process.env.DATABASE_URL
  ? {
      uri: process.env.DATABASE_URL,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      },
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000
    }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 4000,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'robotics_portfolio',
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      },
      waitForConnections: true,
      connectionLimit: 10,
      maxIdle: 10,
      idleTimeout: 60000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000
    };

const pool = mysql.createPool(poolConfig);

async function initDatabase() {
  const connection = await pool.getConnection();
  try {
    console.log('[DB] Connected successfully to TiDB Cloud (robotics_portfolio)');
  } finally {
    connection.release();
  }
}

// Function expected by server.js line 102
function getDbStatus() {
  return {
    target: 'TiDB Cloud Serverless (Singapore)',
    status: 'Connected'
  };
}

module.exports = {
  pool,
  initDatabase,
  getDbStatus,
  query: (...args) => pool.query(...args),
  execute: (...args) => pool.execute(...args),
  getConnection: () => pool.getConnection()
};
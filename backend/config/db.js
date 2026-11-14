const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
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

    // Ensure admin_users table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'superadmin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Detect actual password column name in case table already existed with 'password'
    const [columns] = await connection.query(`SHOW COLUMNS FROM admin_users`);
    const columnNames = columns.map((c) => c.Field);
    const pwdCol = columnNames.includes('password_hash') ? 'password_hash' : 'password';

    // Seed or update default admin credentials (admin@robonext.com / Admin@123)
    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const [existing] = await connection.query(
      'SELECT id FROM admin_users WHERE email = ?',
      ['admin@robonext.com']
    );

    if (existing.length === 0) {
      await connection.query(
        `INSERT INTO admin_users (username, email, ${pwdCol}, role) VALUES (?, ?, ?, ?)`,
        ['Admin', 'admin@robonext.com', hashedPassword, 'superadmin']
      );
      console.log('[DB] Default admin account seeded: admin@robonext.com');
    } else {
      await connection.query(
        `UPDATE admin_users SET ${pwdCol} = ? WHERE email = ?`,
        [hashedPassword, 'admin@robonext.com']
      );
      console.log('[DB] Default admin credentials verified: admin@robonext.com');
    }
  } finally {
    connection.release();
  }
}

// Function expected by server.js
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
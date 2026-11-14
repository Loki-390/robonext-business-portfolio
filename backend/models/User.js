const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    // Handle both direct row arrays and mysql2 [rows, fields] tuples
    const rows = Array.isArray(result[0]) ? result[0] : result;
    const user = rows[0] || null;

    if (user) {
      // Normalize password field so both user.password and user.password_hash work
      const resolvedHash = user.password_hash || user.password;
      user.password_hash = resolvedHash;
      user.password = resolvedHash;
    }

    return user;
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT id, username, email, role, created_at FROM admin_users WHERE id = ?',
      [id]
    );
    const rows = Array.isArray(result[0]) ? result[0] : result;
    return rows[0] || null;
  }

  static async comparePassword(candidatePassword, hash) {
    // Allow passing either a hash string OR the full user object
    const targetHash =
      typeof hash === 'object' && hash !== null
        ? hash.password_hash || hash.password
        : hash;

    if (!candidatePassword || !targetHash || typeof targetHash !== 'string') {
      return false;
    }

    return bcrypt.compare(candidatePassword, targetHash);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}

module.exports = User;
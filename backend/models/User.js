const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const result = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    const rows = Array.isArray(result[0]) ? result[0] : result;
    const user = rows[0] || null;

    if (user) {
      // Normalize password hash property so both 'password' and 'password_hash' work everywhere
      const hash = user.password_hash || user.password;
      user.password_hash = hash;
      user.password = hash;
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

  static async comparePassword(candidatePassword, storedHash) {
    if (!candidatePassword || !storedHash) return false;
    return bcrypt.compare(candidatePassword, storedHash);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}

module.exports = User;
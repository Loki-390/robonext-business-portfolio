const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    const rows = await db.query('SELECT * FROM admin_users WHERE email = ?', [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const rows = await db.query('SELECT id, username, email, role, created_at FROM admin_users WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async comparePassword(candidatePassword, hash) {
    return bcrypt.compare(candidatePassword, hash);
  }

  static async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }
}

module.exports = User;

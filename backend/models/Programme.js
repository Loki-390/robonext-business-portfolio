const db = require('../config/db');

class Programme {
  static async findAll({ status } = {}) {
    let sql = 'SELECT * FROM programmes WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    return db.query(sql + ' ORDER BY id ASC', params);
  }

  static async findById(id) {
    const rows = await db.query('SELECT * FROM programmes WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const sql = `
      INSERT INTO programmes 
      (programme_name, target_classes, description, duration, learning_outcomes, topics, practical_activities, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.programme_name,
      data.target_classes,
      data.description,
      data.duration || null,
      data.learning_outcomes || null,
      data.topics || null,
      data.practical_activities || null,
      data.status || 'active'
    ];
    const result = await db.query(sql, params);
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const sql = `
      UPDATE programmes 
      SET programme_name = ?, target_classes = ?, description = ?, duration = ?, 
          learning_outcomes = ?, topics = ?, practical_activities = ?, status = ?
      WHERE id = ?
    `;
    const params = [
      data.programme_name ?? existing.programme_name,
      data.target_classes ?? existing.target_classes,
      data.description ?? existing.description,
      data.duration ?? existing.duration,
      data.learning_outcomes ?? existing.learning_outcomes,
      data.topics ?? existing.topics,
      data.practical_activities ?? existing.practical_activities,
      data.status ?? existing.status,
      id
    ];
    await db.query(sql, params);
    return this.findById(id);
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM programmes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Programme;

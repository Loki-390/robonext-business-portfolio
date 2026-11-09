const db = require('../config/db');

class Project {
  static async findAll({ status } = {}) {
    let sql = 'SELECT * FROM projects WHERE 1=1';
    const params = [];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    return db.query(sql + ' ORDER BY id ASC', params);
  }

  static async findById(id) {
    const rows = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(data) {
    const sql = `
      INSERT INTO projects 
      (project_name, description, technologies, working_principle, learning_outcomes, image_url, video_url, category, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.project_name,
      data.description,
      data.technologies,
      data.working_principle,
      data.learning_outcomes,
      data.image_url || null,
      data.video_url || null,
      data.category || 'Robotics',
      data.status || 'published'
    ];
    const result = await db.query(sql, params);
    return { id: result.insertId, ...data };
  }

  static async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const sql = `
      UPDATE projects 
      SET project_name = ?, description = ?, technologies = ?, working_principle = ?, 
          learning_outcomes = ?, image_url = ?, video_url = ?, category = ?, status = ?
      WHERE id = ?
    `;
    const params = [
      data.project_name ?? existing.project_name,
      data.description ?? existing.description,
      data.technologies ?? existing.technologies,
      data.working_principle ?? existing.working_principle,
      data.learning_outcomes ?? existing.learning_outcomes,
      data.image_url ?? existing.image_url,
      data.video_url ?? existing.video_url,
      data.category ?? existing.category,
      data.status ?? existing.status,
      id
    ];
    await db.query(sql, params);
    return this.findById(id);
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Project;

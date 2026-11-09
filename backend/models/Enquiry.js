const db = require('../config/db');

class Enquiry {
  static async create(data) {
    const sql = `
      INSERT INTO school_enquiries 
      (school_name, contact_person, designation, email, phone, location, classes_interested, student_strength, preferred_date, message, enquiry_status, internal_notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      data.school_name,
      data.contact_person,
      data.designation,
      data.email,
      data.phone,
      data.location,
      data.classes_interested || null,
      data.student_strength ? Number(data.student_strength) : null,
      data.preferred_date || null,
      data.message || null,
      data.enquiry_status || 'New',
      data.internal_notes || null
    ];
    const result = await db.query(sql, params);
    return { id: result.insertId, ...data };
  }

  static async findAll({ status, search, limit = 100, offset = 0 } = {}) {
    let sql = 'SELECT * FROM school_enquiries WHERE 1=1';
    const params = [];

    if (status && status !== 'all') {
      sql += ' AND enquiry_status = ?';
      params.push(status);
    }

    let rows = await db.query(sql + ' ORDER BY created_at DESC', params);

    if (search && search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(r => 
        (r.school_name && r.school_name.toLowerCase().includes(q)) ||
        (r.contact_person && r.contact_person.toLowerCase().includes(q)) ||
        (r.location && r.location.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q))
      );
    }

    return rows;
  }

  static async findById(id) {
    const rows = await db.query('SELECT * FROM school_enquiries WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) return null;

    const sql = `
      UPDATE school_enquiries 
      SET enquiry_status = ?, internal_notes = ? 
      WHERE id = ?
    `;
    const params = [
      data.enquiry_status || existing.enquiry_status,
      data.internal_notes !== undefined ? data.internal_notes : existing.internal_notes,
      id
    ];
    await db.query(sql, params);
    return this.findById(id);
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM school_enquiries WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static async getStats() {
    const all = await db.query('SELECT * FROM school_enquiries');
    const stats = {
      total: all.length,
      new: all.filter(r => r.enquiry_status === 'New').length,
      contacted: all.filter(r => r.enquiry_status === 'Contacted').length,
      demoScheduled: all.filter(r => r.enquiry_status === 'Demo Scheduled').length,
      demoCompleted: all.filter(r => r.enquiry_status === 'Demo Completed').length,
      proposalSent: all.filter(r => r.enquiry_status === 'Proposal Sent').length,
      confirmed: all.filter(r => r.enquiry_status === 'Partnership Confirmed').length,
      closed: all.filter(r => r.enquiry_status === 'Closed').length
    };
    return stats;
  }
}

module.exports = Enquiry;

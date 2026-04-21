const db = require('../config/db');

const Project = {
  async findAll(ownerId) {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE owner_id = ? ORDER BY created_at DESC',
      [ownerId]
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, description, owner_id }) {
    const [result] = await db.query(
      'INSERT INTO projects (name, description, owner_id) VALUES (?, ?, ?)',
      [name, description, owner_id]
    );
    return { id: result.insertId, name, description, owner_id };
  },

  async update(id, { name, description, status }) {
    await db.query(
      'UPDATE projects SET name = ?, description = ?, status = ? WHERE id = ?',
      [name, description, status, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    await db.query('DELETE FROM projects WHERE id = ?', [id]);
  },
};

module.exports = Project;

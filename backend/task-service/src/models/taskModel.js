const db = require('../config/db');

const Task = {
  async findByProject(projectId, filters = {}) {
    let query = 'SELECT * FROM tasks WHERE project_id = ?';
    const params = [projectId];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    if (filters.priority) {
      query += ' AND priority = ?';
      params.push(filters.priority);
    }

    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ title, description, project_id, assigned_to, priority, due_date }) {
    const [result] = await db.query(
      'INSERT INTO tasks (title, description, project_id, assigned_to, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, project_id, assigned_to, priority, due_date]
    );
    return { id: result.insertId, title, description, project_id, assigned_to, priority, due_date, status: 'todo' };
  },

  async update(id, { title, description, status, priority, assigned_to, due_date }) {
    await db.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, assigned_to = ?, due_date = ? WHERE id = ?',
      [title, description, status, priority, assigned_to, due_date, id]
    );
    return this.findById(id);
  },

  async delete(id) {
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
  },
};

module.exports = Task;

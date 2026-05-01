const pool = require('../config/db');

const UserModel = {

  // Gjej userin me email
  findByEmail: async (email) => {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    );
    return rows[0];
  },

  // Krijo user të ri
  create: async (name, email, hashedPassword) => {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result.insertId;
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  findByIdWithPassword: async (id) => {
    const [rows] = await pool.query(
      'SELECT id, name, email, password, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  updateProfile: async (id, { name, email }) => {
    await pool.query(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
  },

  updatePassword: async (id, hashedPassword) => {
    await pool.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
  },

  findAll: async () => {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    );
    return rows;
  },

  updateRole: async (id, role) => {
    await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
  },

};

module.exports = UserModel;
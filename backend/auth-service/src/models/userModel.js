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

  // Gjej userin me id
  findById: async (id) => {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

};

module.exports = UserModel;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();

const AuthController = {

  // REGISTER
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Kontrollo nese ekziston email-i
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          message: 'This email is already registered!'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Krijo userin
      const userId = await UserModel.create(name, email, hashedPassword);

      // Gjenero token
      const token = jwt.sign(
        { id: userId, email, role: 'member' },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        message: 'Registration successful!',
        token,
        user: { id: userId, name, email, role: 'member' }
      });

    } catch (error) {
      res.status(500).json({ message: 'Gabim në server!', error: error.message });
    }
  },

  // LOGIN
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Kontrollo userin
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(400).json({
          message: 'Invalid email or password!'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid email or password!'
        });
      }

      // Gjenero token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(200).json({
        message: 'Login successful!',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });

    } catch (error) {
      res.status(500).json({ message: 'Gabim në server!', error: error.message });
    }
  },

  // GET PROFILE
  getProfile: async (req, res) => {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Server error!', error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required!' });
      }
      const existing = await UserModel.findByEmail(email);
      if (existing && existing.id !== req.user.id) {
        return res.status(400).json({ message: 'This email is already taken!' });
      }
      await UserModel.updateProfile(req.user.id, { name, email });
      const user = await UserModel.findById(req.user.id);
      res.json({ message: 'Profile updated successfully!', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error!', error: error.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Both fields are required!' });
      }
      if (newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters!' });
      }
      const user = await UserModel.findByIdWithPassword(req.user.id);
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect!' });
      }
      const hashed = await bcrypt.hash(newPassword, 10);
      await UserModel.updatePassword(req.user.id, hashed);
      res.json({ message: 'Password changed successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Server error!', error: error.message });
    }
  },

  // ADMIN — list all users
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error!', error: error.message });
    }
  },

  // ADMIN — change a user's role
  updateUserRole: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      if (!['admin', 'member'].includes(role)) {
        return res.status(400).json({ message: 'Role must be admin or member' });
      }
      if (parseInt(id) === req.user.id) {
        return res.status(400).json({ message: 'You cannot change your own role' });
      }
      await UserModel.updateRole(id, role);
      const user = await UserModel.findById(id);
      res.json({ message: 'Role updated successfully!', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error!', error: error.message });
    }
  },

};

module.exports = AuthController;
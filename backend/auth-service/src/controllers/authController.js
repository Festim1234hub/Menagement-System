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
          message: 'Email-i është i zënë!' 
        });
      }

      // Enkripto fjalëkalimin
      const hashedPassword = await bcrypt.hash(password, 10);

      // Krijo userin
      const userId = await UserModel.create(name, email, hashedPassword);

      // Gjenero token
      const token = jwt.sign(
        { id: userId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'Regjistrimi u krye me sukses!',
        token,
        user: { id: userId, name, email }
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
          message: 'Email-i ose fjalëkalimi është i gabuar!' 
        });
      }

      // Kontrollo fjalëkalimin
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          message: 'Email-i ose fjalëkalimi është i gabuar!' 
        });
      }

      // Gjenero token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({
        message: 'Hyrja u krye me sukses!',
        token,
        user: { id: user.id, name: user.name, email: user.email }
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
        return res.status(404).json({ message: 'Përdoruesi nuk u gjet!' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'Gabim në server!', error: error.message });
    }
  },

};

module.exports = AuthController;
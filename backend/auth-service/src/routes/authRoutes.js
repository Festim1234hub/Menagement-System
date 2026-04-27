const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const { validateRegister, validateLogin } = require('../middleware/validateInput');

// Public routes
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

// Protected routes
router.get('/profile', verifyToken, AuthController.getProfile);

module.exports = router;
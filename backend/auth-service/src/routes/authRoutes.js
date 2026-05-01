const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const { validateRegister, validateLogin } = require('../middleware/validateInput');

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Public routes
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

// Protected routes
router.get('/profile', verifyToken, AuthController.getProfile);
router.put('/profile', verifyToken, AuthController.updateProfile);
router.put('/password', verifyToken, AuthController.changePassword);

// Admin routes
router.get('/users', verifyToken, AuthController.getUsers);
router.put('/users/:id/role', verifyToken, requireAdmin, AuthController.updateUserRole);

module.exports = router;
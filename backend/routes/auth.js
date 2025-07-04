const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const jwt = require('jsonwebtoken');

// Auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// Signup route
router.post('/signup', authControllers.signup);

// Login route
router.post('/login', authControllers.login);

// Update details
router.put('/update-details', auth, authControllers.updateDetails);

// Change password
router.put('/change-password', auth, authControllers.changePassword);

module.exports = router;



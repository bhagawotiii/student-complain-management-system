const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const complaintController = require('../controllers/complaintController');
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

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/complaints
router.post('/', auth, upload.single('file'), complaintController.createComplaint);

// GET /api/complaints
router.get('/', complaintController.getAllComplaints);

// GET /api/complaints/my-complaints
router.get('/my-complaints', auth, complaintController.getMyComplaints);

// PUT /api/complaints/:id/status
router.put('/:id/status', auth, complaintController.updateComplaintStatus);

// DELETE /api/complaints/:id/admin
router.delete('/:id/admin', auth, complaintController.adminDeleteComplaint);

module.exports = router; 
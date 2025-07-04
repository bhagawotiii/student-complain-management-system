const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  category: { type: String, required: true },
  details: { type: String, required: true },
  filePath: { type: String },
  status: { type: String, enum: ['Pending', 'Resolved', 'Rejected'], default: 'Pending' },
  adminMessage: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema); 
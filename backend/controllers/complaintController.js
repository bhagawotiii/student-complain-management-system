const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { name, address, category, details } = req.body;
    const userId = req.user.userId;
    let filePath = '';
    if (req.file) {
      filePath = req.file.path;
    }
    const complaint = new Complaint({
      userId,
      name,
      address,
      category,
      details,
      filePath
    });
    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const userId = req.user.userId;
    const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateComplaintStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can update status' });
    }
    const { id } = req.params;
    const { status, adminMessage } = req.body;
    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status, adminMessage },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Complaint not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.adminDeleteComplaint = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can delete complaints' });
    }
    const { id } = req.params;
    const deleted = await Complaint.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Complaint not found' });
    res.json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 
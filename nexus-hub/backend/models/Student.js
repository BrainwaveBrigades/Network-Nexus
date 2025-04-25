const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  prn: {
    type: String,
    required: true,
    unique: true,
    index: true  // Indexed for fast lookup
  },
  fullName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true,
    index: true  // Indexed for searching/filtering
  },
  studyYear: {
    type: String,
    required: true,
    index: true  // Indexed for searching/filtering
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema, "students");
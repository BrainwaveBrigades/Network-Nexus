const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InternshipSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: 'Remote'
  },
  duration: {
    type: String,
    required: true
  },
  stipend: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  prerequisites: {
    type: String
  },
  requiredSkills: {
    type: [String],
    default: []
  },
  deadline: {
    type: String,
    required: true
  },
  googleFormLink: {
    type: String,
    required: true
  },
  alumniId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  alumniName: {
    type: String,
    required: true
  },
  alumniCompany: {
    type: String,
    required: true
  },
  alumniPosition: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isMarkAsComplete: {
    type: Boolean,
    default: false
  },
  participants: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Internship', InternshipSchema, "internships");
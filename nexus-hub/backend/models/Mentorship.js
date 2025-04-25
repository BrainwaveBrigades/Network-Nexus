const mongoose = require('mongoose');

// Participant sub-schema for storing application details
const ParticipantSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  justification: {
    type: String,
    required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

const MentorshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true  // Indexed for text search
  },
  description: {
    type: String,
    required: true
  },
  targetAudience: {
    type: String,
    required: true
  },
  studyYear: {
    type: String,
    required: true,
    index: true  // Indexed for filtering
  },
  department: {
    type: String,
    required: true,
    index: true  // Indexed for filtering
  },
  fullName: {
    type: String,
    required: true,
    index: true  // Indexed for searching
  },
  jobPosition: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    required: true
  },
  isApproved: {
    type: Boolean,
    required: true,
    index: true
  },
  participants: [ParticipantSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Add virtual properties (not stored in DB but calculated)
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add compound text index for searching across multiple fields
MentorshipSchema.index({ 
  title: 'text', 
  description: 'text', 
  targetAudience: 'text' 
});

// Virtual for current number of participants
MentorshipSchema.virtual('currentParticipants').get(function() {
  return this.participants.length;
});

// Virtual for limit string (current/max)
MentorshipSchema.virtual('limitParsed').get(function() {
  return `${this.participants.length}/${this.limit}`;
});

// Virtual to check if mentorship is full
MentorshipSchema.virtual('isFull').get(function() {
  return this.participants.length >= this.limit;
});

module.exports = mongoose.model('Mentorship', MentorshipSchema, "mentorships");
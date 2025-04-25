const mongoose = require('mongoose');
const Mentorship = require('../models/Mentorship');
const Student = require('../models/Student');
const ApiResponse = require('../utils/apiResponse');

// Apply to mentorship
exports.applyToMentorship = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { mentorshipId } = req.params;
    const { prn, justification } = req.body;
    
    // Find student by PRN
    const student = await Student.findOne({ prn }).session(session);
    
    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json(
        ApiResponse.error('Student not found with this PRN')
      );
    }
    
    // Find mentorship
    const mentorship = await Mentorship.findById(mentorshipId).session(session);
    
    if (!mentorship) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json(
        ApiResponse.error('Mentorship not found')
      );
    }
    
    // Check if mentorship is full
    if (mentorship.participants.length >= mentorship.maxParticipants) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json(
        ApiResponse.error('Mentorship is already full')
      );
    }
    
    // Check if student has already applied
    const alreadyApplied = mentorship.participants.some(
      participant => participant.student.equals(student._id)
    );
    
    if (alreadyApplied) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json(
        ApiResponse.error('You have already applied to this mentorship')
      );
    }
    
    // Add student to participants
    mentorship.participants.push({
      student: student._id,
      justification
    });
    
    await mentorship.save({ session });
    await session.commitTransaction();
    session.endSession();
    
    // Return student details along with response for auto-fill
    res.status(201).json(
      ApiResponse.success('Application submitted successfully', {
        student: {
          fullName: student.fullName,
          department: student.department,
          studyYear: student.studyYear,
          phone: student.phoneNumber,
          email: student.email
        },
        mentorship: {
          title: mentorship.title,
          limit: `${mentorship.participants.length}/${mentorship.maxParticipants}`
        }
      })
    );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// Validate PRN and return student details
exports.validatePRN = async (req, res, next) => {
  try {
    const { prn } = req.params;
    
    const student = await Student.findOne({ prn });
    
    if (!student) {
      return res.status(404).json(
        ApiResponse.error('Student not found with this PRN')
      );
    }
    
    res.json(
      ApiResponse.success('Student found', {
        fullName: student.fullName,
        department: student.department,
        studyYear: student.studyYear,
        phone: student.phoneNumber,
        email: student.email
      })
    );
  } catch (error) {
    next(error);
  }
};

// Get participant list for a mentorship (admin only)
exports.getParticipants = async (req, res, next) => {
  try {
    const { mentorshipId } = req.params;
    
    const mentorship = await Mentorship.findById(mentorshipId)
      .populate('participants.student', 'fullName prn department studyYear phone email');
    
    if (!mentorship) {
      return res.status(404).json(
        ApiResponse.error('Mentorship not found')
      );
    }
    
    res.json(
      ApiResponse.success(
        'Participants retrieved successfully',
        mentorship.participants
      )
    );
  } catch (error) {
    next(error);
  }
};
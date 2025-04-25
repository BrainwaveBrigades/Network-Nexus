const express = require('express');
const router = express.Router();
const mentorshipController = require('../controllers/mentorship');

// Get all mentorships with pagination & filtering
router.get('/', mentorshipController.getMentorships);

// Get single mentorship by ID
router.get('/:id', mentorshipController.getMentorshipById);

// Create new mentorship
router.post('/', mentorshipController.createMentorship);

// Get available departments (for filters)
router.get('/metadata/departments', mentorshipController.getDepartments);

// Get available study years (for filters)
router.get('/metadata/studyyears', mentorshipController.getStudyYears);

module.exports = router;
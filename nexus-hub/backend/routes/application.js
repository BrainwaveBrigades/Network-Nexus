const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

// Apply to mentorship
router.post('/mentorships/:mentorshipId/apply', applicationController.applyToMentorship);

// Validate PRN and retrieve student details
router.get('/validate-prn/:prn', applicationController.validatePRN);

// Get participants for a mentorship (admin only)
router.get('/mentorships/:mentorshipId/participants', applicationController.getParticipants);

module.exports = router;
const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internship');

// GET all approved internships
router.get('/', internshipController.getAllInternships);

// GET internship by ID
router.get('/:id', internshipController.getInternshipById);

// GET search internships
router.get('/search', internshipController.searchInternships);

// POST track application click and get Google Form link
router.post('/:id/apply', internshipController.trackApplication);

module.exports = router;
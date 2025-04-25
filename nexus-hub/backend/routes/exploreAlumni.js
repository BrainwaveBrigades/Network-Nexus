// routes/alumniRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getAllAlumni, 
    createAlumni, 
    getAlumni, 
    updateAlumni, 
    deleteAlumni 
} = require('../controllers/alumniController');

// Routes
router.route('/')
    .get(getAllAlumni)
    .post(createAlumni);

router.route('/:id')
    .get(getAlumni)
    .put(updateAlumni)
    .delete(deleteAlumni);

module.exports = router;
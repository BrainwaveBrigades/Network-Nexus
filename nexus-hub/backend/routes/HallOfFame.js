const express = require('express');
const { getHallOfFame } = require('../controllers/HallOfFame');

const router = express.Router();

// Route for getting all Hall of Fame entries with pagination, filtering, and search
router.get('/', getHallOfFame);

module.exports = router;

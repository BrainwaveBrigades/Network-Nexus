const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const mentorshipRoutes = require('./routes/mentorship');
const internshipRoutes = require('./routes/internship');
const applicationRoutes = require('./routes/application');
const HallOfFame = require('./routes/HallOfFame');
const exploreAlumni = require('./routes/exploreAlumni');

// Initialize express app
const app = express();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(cors());

// Request logging
app.use(morgan('dev'));

// Parse JSON request body
app.use(express.json());

// Parse URL-encoded request body
app.use(express.urlencoded({ extended: true }));

// Compress all responses
app.use(compression());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// API Routes
app.use('/api/mentorships', mentorshipRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/hall-of-fame', HallOfFame);
app.use('/api/alumni', exploreAlumni);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
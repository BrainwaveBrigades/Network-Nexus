import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  optionsSuccessStatus: 200,
  credentials: true
}));
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(compression());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));


// Landing Page Routes
import alumniSuccessStoriesRoutes from './routes/LandingPage/alumniSuccessStoriesRoutes.js';
import emailRoutes from './routes/LandingPage/emailRoutes.js';
import contactRoutes from './routes/LandingPage/contactRoutes.js';
import alumniMapRoutes from './routes/LandingPage/alumniMap.routes.js';

app.use('/api', alumniSuccessStoriesRoutes);
app.use('/api', emailRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/alumni-map', alumniMapRoutes);

// Admin Routes
import adminRoutes from './routes/Admin/adminRoutes.js';
import bulkUploadRoute from './routes/Admin/bulkUpload.js';
import adminDirectory from './routes/Admin/directoryRoutes.js';
import programRoutes from './routes/Admin/mentorship.js';
import addSingleAlumni from './routes/Admin/addAlumni.js';
import internshipRoutes from './routes/Admin/internship.js';

app.use('/api/admin', adminRoutes);
app.use('/api/admin', bulkUploadRoute);
app.use('/api/admin', adminDirectory);
app.use('/api/programs', programRoutes);
app.use('/api/addAlumni', addSingleAlumni);
app.use('/api/internships', internshipRoutes);

// Alumni Routes
import alumniRoutes from './routes/Alumni/alumniRoutes.js';
import alumniInternship from './routes/Alumni/internship.js';
import alumniMentorship from './routes/Alumni/mentorship.js';

app.use('/api/alumni', alumniRoutes);
app.use('/api/alumni/internships', alumniInternship);
app.use('/api/alumni/mentorships', alumniMentorship);

// Error Handling
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

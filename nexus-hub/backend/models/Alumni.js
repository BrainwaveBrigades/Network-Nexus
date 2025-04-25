// models/Alumni.js
const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema({
    fullName: { 
        type: String, 
        required: [true, 'Full name is required'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    department: { 
        type: String, 
        required: [true, 'Department is required'],
        enum: ['CSE', 'AIML', 'ENTC', 'MECH', 'CIVIL', 'OTHER']
    },
    passOutYear: { 
        type: Number, 
        required: [true, 'Pass out year is required'] 
    },
    jobPosition: String,
    companyName: String,
    location: String,
    successStory: String,
    linkedInURL: String,
    hallOfFame: String,
    specialAchievements: String,
    avatar: {
        type: String,
        default: function() {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.fullName)}&background=6366F1&color=fff`;
        }
    },
}, {
    timestamps: true
});

// Create a virtual field to map between frontend and backend field names
AlumniSchema.virtual('graduationYear').get(function() {
    return this.passOutYear;
});

AlumniSchema.virtual('currentPosition').get(function() {
    return this.jobPosition;
});

AlumniSchema.virtual('company').get(function() {
    return this.companyName;
});

AlumniSchema.virtual('bio').get(function() {
    return this.successStory;
});

AlumniSchema.virtual('linkedin').get(function() {
    return this.linkedInURL;
});

// Include virtuals when converting to JSON
AlumniSchema.set('toJSON', { virtuals: true });
AlumniSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Alumni', AlumniSchema, "alumnis");
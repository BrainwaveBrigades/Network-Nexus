import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB Connection
const MONGO_URI = "mongodb+srv://networknexusMERN:WGKonEqRljv3RlIs@networknexus.wnx9c9d.mongodb.net/alumniNetwork?retryWrites=true&w=majority&appName=NetworkNexus";
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Alumni Schema with hallOfFame field added
const alumniSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    prn: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    passOutYear: { type: Number, required: true },
    jobPosition: String,
    companyName: String,
    location: String,
    latitude: Number,
    longitude: Number,
    successStory: String,
    linkedInURL: String,
    phoneNumber: String,
    skills: String,
    role: { type: String, default: "Alumni" },
    specialAchievements: String,
    hallOfFame: { type: String, enum: [null, "", "notable", "featured"], default: null }, // Added field
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

alumniSchema.index({ longitude: 1, latitude: 1 });
const Alumni = mongoose.model('Alumni', alumniSchema);

// Sample data arrays
const firstNames = [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 
    'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
];

const departments = [
    'Computer Science', 'Electrical Engineering', 'Mechanical Engineering',
    'Civil Engineering', 'Electronics', 'Information Technology',
    'Artificial Intelligence', 'Data Science', 'Biotechnology'
];

const jobPositions = [
    'Software Engineer', 'Senior Developer', 'Project Manager', 'Data Analyst',
    'Systems Architect', 'DevOps Engineer', 'Product Manager', 'UX Designer',
    'QA Engineer', 'Database Administrator', 'Network Engineer', 'Security Specialist',
    'Technical Lead', 'CTO', 'CEO', 'Research Scientist', 'Machine Learning Engineer'
];

const companies = [
    'Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook', 'Tesla', 'Netflix',
    'Adobe', 'Oracle', 'IBM', 'Intel', 'NVIDIA', 'Cisco', 'Salesforce', 'Uber',
    'Airbnb', 'Twitter', 'LinkedIn', 'Spotify', 'Slack', 'Zoom', 'GitHub'
];

const skills = [
    'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Swift', 'Kotlin',
    'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'TensorFlow', 'PyTorch',
    'SQL', 'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST API', 'Git'
];

const locations = [
    { city: 'New York', country: 'USA', lat: 40.7128, lon: -74.0060 },
    { city: 'London', country: 'UK', lat: 51.5074, lon: -0.1278 },
    { city: 'Tokyo', country: 'Japan', lat: 35.6762, lon: 139.6503 },
    { city: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093 },
    { city: 'Berlin', country: 'Germany', lat: 52.5200, lon: 13.4050 },
    { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    { city: 'Toronto', country: 'Canada', lat: 43.6532, lon: -79.3832 },
    { city: 'Singapore', country: 'Singapore', lat: 1.3521, lon: 103.8198 },
    { city: 'Mumbai', country: 'India', lat: 19.0760, lon: 72.8777 },
    { city: 'São Paulo', country: 'Brazil', lat: -23.5505, lon: -46.6333 }
];

// Possible hallOfFame values with weights (null 50%, empty 20%, notable 20%, featured 10%)
const hallOfFameValues = [
    null, null, null, null, null, // 50% chance
    "", "", // 20% chance
    "notable", "notable", // 20% chance
    "featured" // 10% chance
];

// Function to generate random alumni data
const generateRandomAlumni = (index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`;
    const prn = `PRN${Math.floor(100000 + Math.random() * 900000)}`;
    const department = departments[Math.floor(Math.random() * departments.length)];
    const passOutYear = Math.floor(Math.random() * 20) + 2000;
    const jobPosition = jobPositions[Math.floor(Math.random() * jobPositions.length)];
    const companyName = companies[Math.floor(Math.random() * companies.length)];
    
    // Generate 3-5 random skills
    const shuffledSkills = [...skills].sort(() => 0.5 - Math.random());
    const selectedSkills = shuffledSkills.slice(0, 3 + Math.floor(Math.random() * 3)).join(', ');
    
    const locationData = locations[Math.floor(Math.random() * locations.length)];
    const location = `${locationData.city}, ${locationData.country}`;
    
    // Random hallOfFame value
    const hallOfFame = hallOfFameValues[Math.floor(Math.random() * hallOfFameValues.length)];
    
    return {
        fullName,
        email,
        password: 'test123', // Simple password for testing
        prn,
        department,
        passOutYear,
        jobPosition,
        companyName,
        location,
        latitude: locationData.lat,
        longitude: locationData.lon,
        successStory: `I graduated from ${department} in ${passOutYear} and now work as a ${jobPosition} at ${companyName}.`,
        linkedInURL: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}${index}`,
        phoneNumber: `+1${Math.floor(2000000000 + Math.random() * 8000000000)}`,
        skills: selectedSkills,
        role: "Alumni",
        specialAchievements: Math.random() > 0.7 ? `Won ${['Best Employee', 'Innovation Award', 'Tech Excellence'][Math.floor(Math.random() * 3)]} at ${companyName}` : '',
        hallOfFame // Added field
    };
};

// Function to generate and insert alumni
const generateAndInsertAlumni = async (count) => {
    try {
        // Clear existing data (optional)
        // await Alumni.deleteMany({});
        // console.log('🧹 Cleared existing alumni data');
        
        const alumniToInsert = [];
        
        for (let i = 0; i < count; i++) {
            const alumniData = generateRandomAlumni(i);
            alumniToInsert.push(alumniData);
            
            // Log progress
            if (i > 0 && i % 50 === 0) {
                console.log(`Generated ${i} alumni records...`);
            }
        }
        
        console.log(`✅ Generated ${alumniToInsert.length} alumni records`);
        console.log('⏳ Inserting into MongoDB...');
        
        // Hash passwords before inserting
        const alumniWithHashedPasswords = await Promise.all(
            alumniToInsert.map(async alumni => ({
                ...alumni,
                password: await bcrypt.hash(alumni.password, 10)
            }))
        );
        
        // Insert in batches of 100
        const batchSize = 100;
        for (let i = 0; i < alumniWithHashedPasswords.length; i += batchSize) {
            const batch = alumniWithHashedPasswords.slice(i, i + batchSize);
            await Alumni.insertMany(batch, { ordered: false });
            console.log(`✅ Inserted batch ${i / batchSize + 1}`);
        }
        
        console.log('🎉 All alumni data inserted successfully!');
    } catch (error) {
        console.error('❌ Error generating/inserting alumni:', error);
    } finally {
        mongoose.connection.close();
        console.log("🔗 MongoDB Connection Closed");
    }
};

// Handle process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log("⚠️ MongoDB Connection Closed due to SIGINT");
    process.exit(0);
});

// Generate 500 alumni records
generateAndInsertAlumni(500);
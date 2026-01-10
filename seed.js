const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define Schemas locally to avoid import issues
const UserSchema = new mongoose.Schema({
    name: String, email: { type: String, unique: true }, password: { type: String, select: false },
    role: { type: String, enum: ['CANDIDATE', 'RECRUITER'], default: 'CANDIDATE' },
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const JobSchema = new mongoose.Schema({
    title: String, description: String, companyName: String, location: String, salary: String,
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
    createdAt: { type: Date, default: Date.now },
});
const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

const MONGODB_URI = "mongodb+srv://Mukesh_job_portal:Muk1240gmail@jobportal.h7azgrv.mongodb.net/?appName=JobPortal"; // Hardcoded safe URI

const jobsData = [
    { title: "Senior Frontend Developer", company: "TechCorp", loc: "San Francisco, CA", sal: "$120k - $150k" },
    { title: "Backend Engineer (Node.js)", company: "CloudScale", loc: "Remote", sal: "$100k - $130k" },
    { title: "Product Designer", company: "Creative Minds", loc: "New York, NY", sal: "$90k - $120k" },
    { title: "Full Stack Developer", company: "StartUp Inc.", loc: "Austin, TX", sal: "$110k - $140k" },
    { title: "DevOps Engineer", company: "InfraGlobal", loc: "Remote", sal: "$130k - $160k" },
    { title: "Data Scientist", company: "DataFlow", loc: "Boston, MA", sal: "$115k - $145k" },
    { title: "Mobile App Developer", company: "AppWorks", loc: "Seattle, WA", sal: "$105k - $135k" },
    { title: "QA Automation Engineer", company: "QualityFirst", loc: "Chicago, IL", sal: "$95k - $115k" },
    { title: "Security Analyst", company: "SecureNet", loc: "Washington, DC", sal: "$110k - $140k" },
    { title: "Engineering Manager", company: "BigTech", loc: "Los Angeles, CA", sal: "$160k - $200k" },
];

async function seed() {
    try {
        const uri = process.env.MONGODB_URI || MONGODB_URI;
        await mongoose.connect(uri);
        console.log("Connected to MongoDB for seeding...");

        const hashedPassword = await bcrypt.hash("password123", 10);

        for (let i = 0; i < 10; i++) {
            const email = `recruiter${i + 1}@example.com`;

            let user = await User.findOne({ email });
            if (!user) {
                user = await User.create({
                    name: `Recruiter ${i + 1}`,
                    email,
                    password: hashedPassword,
                    role: 'RECRUITER'
                });
                console.log(`Created recruiter: ${email}`);
            } else {
                console.log(`Recruiter exists: ${email}`);
            }

            // Post a job for this recruiter
            const jobInfo = jobsData[i];
            await Job.create({
                title: jobInfo.title,
                description: `We are looking for a talented ${jobInfo.title} to join our team at ${jobInfo.company}. Requires 3+ years of experience with modern technologies.`,
                companyName: jobInfo.company,
                location: jobInfo.loc,
                salary: jobInfo.sal,
                recruiterId: user._id,
                jobType: 'Full-time'
            });
            console.log(`Posted job: ${jobInfo.title}`);
        }

        console.log("Seeding complete!");
    } catch (error) {
        console.error("Seeding error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();

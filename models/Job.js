import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a job title'],
        maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a job description'],
    },
    companyName: {
        type: String,
        required: [true, 'Please provide a company name'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'],
    },
    salary: {
        type: String, // Can be a range "50k-80k"
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);

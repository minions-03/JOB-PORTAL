import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    resumeUrl: {
        type: String,
        required: [true, 'Please provide a resume URL'],
    },
    status: {
        type: String,
        enum: ['PENDING', 'REVIEWING', 'SHORTLISTED', 'REJECTED', 'ACCEPTED'],
        default: 'PENDING',
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent duplicate applications for the same job by the same user
ApplicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);

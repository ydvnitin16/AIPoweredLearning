import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        likes: {
            type: Number,
            default: 0,
        },
        suggestedTopics: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;

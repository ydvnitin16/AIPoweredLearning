import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            required: true,
        },
        isDone: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;

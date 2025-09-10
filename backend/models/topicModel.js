import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema(
    {
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        topic: {
            type: String,
            required: true,
            trim: true,
        },
        output: {
            type: Object,
            default: {},
        },
        revision: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;

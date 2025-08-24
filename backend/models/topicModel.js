import mongoose from "mongoose";

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
        notes: {
            type: String,
            default: '', // markdown or html
        },
        revision: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Topic = mongoose.model('Topic', topicSchema);
export default Topic;

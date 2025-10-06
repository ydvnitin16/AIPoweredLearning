import Topic from '../models/topicModel.js';
import Progress from '../models/progressModel.js';
import { checkOwnerShip, isValidObjectId } from '../utils/validationUtils.js';
import { handleError, throwError } from '../utils/helper.js';
import { requireSubject, requireTopic } from '../services/requireService.js';
import {
    attachImagesToOutput,
    deleteImageFromCloudinary,
} from '../utils/cloudinaryUtils.js';

const createTopic = async (req, res) => {
    const { subjectId, topic } = req.body;
    let output = req.output || req.body.output;
    const revision = output.revision;
    if (typeof output === 'string') {
        output = JSON.parse(output);
    }
    try {
        const subject = await requireSubject(subjectId);

        checkOwnerShip(subject.createdBy.valueOf(), req.user.id);

        subject.suggestedTopics = subject.suggestedTopics.filter(
            (t) => t !== topic
        );

        if (req.files?.length) {
            output = attachImagesToOutput(output, req.files);
        }

        const newTopic = new Topic({
            subjectId: subjectId,
            topic: topic,
            output: output,
            revision: revision,
        });
        const createdTopic = await newTopic.save();

        await subject.save();

        res.status(201).json({
            message: 'Topic created successfully.',
            topic: createdTopic,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const updateTopicNotes = async (req, res) => {
    const { topicId, notes } = req.body;
    try {
        if (!isValidObjectId(topicId)) throwError('Invalid topic id', 400);

        const topic = await requireTopic(topicId);
        const subject = await requireSubject(topic.subjectId);

        checkOwnerShip(subject.createdBy.toString(), req.user.id);

        topic.notes = typeof notes === 'string' ? notes : topic.notes;
        const saved = await topic.save();

        res.status(200).json({ message: 'Notes updated', topic: saved });
    } catch (err) {
        handleError(res, err);
    }
};

const getTopicsOfSubject = async (req, res) => {
    const { subjectId } = req.params;
    try {
        if (!isValidObjectId(subjectId)) throwError('Invalid subject id', 400);

        const subject = await requireSubject(subjectId);
        const topics = await Topic.find({ subjectId: subjectId });

        const topicIds = topics.map((t) => t._id);

        const progressRecords = await Progress.find({
            userId: req.user.id,
            topicId: { $in: topicIds },
        });

        const progressMap = {};

        progressRecords.forEach((record) => {
            progressMap[record.topicId.valueOf()] = record.isDone;
        });

        const topicsWithProgress = topics.map((topic) => ({
            _id: topic._id,
            topic: topic.topic,
            output: topic.output,
            revision: topic.revision,
            notes: topic.notes,
            createdAt: topic.createdAt,
            updatedAt: topic.updatedAt,
            isDone: progressMap[topic._id.valueOf()] || false,
        }));

        res.status(200).json({
            message: 'Topics fetched successfully',
            topics: topicsWithProgress || [],
        });
    } catch (err) {
        handleError(res, err);
    }
};

const deleteTopic = async (req, res) => {
    const { id } = req.body;
    try {
        if (!isValidObjectId(id)) throwError('Invalid topic id', 400);

        const topic = await requireTopic(id);
        const subject = await requireSubject(topic.subjectId);

        checkOwnerShip(subject.createdBy.toString(), req.user.id);

        // delete cloudinary images
        if (topic.output?.content && Array.isArray(topic.output.content)) {
            for (const block of topic.output.content) {
                if (block.type === 'image' && block.data?.publicId) {
                    await deleteImageFromCloudinary(block.data.publicId);
                }
            }
        }

        const progressResult = await Progress.deleteMany({ topicId: id });

        await Topic.deleteOne({ _id: id });

        res.status(200).json({
            message: `Topic deleted successfully. Also removed ${progressResult.deletedCount} progress records and related images.`,
        });
    } catch (err) {
        handleError(res, err);
    }
};

const markAsDone = async (req, res) => {
    const { subjectId, topicId, isDone } = req.body;

    try {
        if (typeof isDone !== 'boolean') {
            throwError('isDone must be a Boolean', 400);
        }
        const subject = await requireSubject(subjectId);
        const topic = await requireTopic(topicId);

        if ((topic.subjectId.toString() !== subjectId.toString()))
            throwError('Topic not belongs to that subjectId', 403);

        const progress = await Progress.findOneAndUpdate(
            {
                userId: req.user.id,
                subjectId,
                topicId,
            },
            { isDone },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({
            message: 'Progress updated successfully',
            progress,
        });
    } catch (err) {
        handleError(res, err);
    }
};

export { createTopic, updateTopicNotes, getTopicsOfSubject, deleteTopic, markAsDone };

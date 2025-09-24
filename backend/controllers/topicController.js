import mongoose from 'mongoose';
import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';
import User from '../models/userModel.js';
import Progress from '../models/progressModel.js';

const createTopic = async (req, res) => {
    const { subjectId, topic } = req.body;
    const output = req.output;
    const revision = output.revision;
    try {
        const subject = await Subject.findById(subjectId);
        if (!subject)
            return res.status(404).json({ message: 'Subject not found.' });

        if (subject.createdBy.valueOf() !== req.user.id)
            return res.status(403).json({
                message:
                    "You are not allowed to create topic in other's Subject",
            });

        subject.suggestedTopics = subject.suggestedTopics.filter(
            (t) => t !== topic
        );

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
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const getTopicsOfSubject = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid subject ID.' });
    }
    try {
        const subject = await Subject.findById(id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const topics = await Topic.find({ subjectId: id });

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
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const deleteTopic = async (req, res) => {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid subject ID.' });
    }
    try {
        const topic = await Topic.findById(id);
        if (!topic)
            return res.status(404).json({ message: 'Topic not found.' });

        const subject = await Subject.findById(topic.subjectId);
        if (subject.createdBy.valueOf() !== req.user.id)
            return res.status(403).json({
                message:
                    "You are not allowed to delete topic in other's Subject",
            });

        await Topic.deleteOne({ _id: id });
        res.status(200).json({ message: 'Topic deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const markAsDone = async (req, res) => {
    const userId = mongoose.Types.ObjectId(req.user._id); // Logged-in user
    const { subjectId, topicId, isDone } = req.body;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ message: 'Invalid subjectId' });
    }
    if (!mongoose.Types.ObjectId.isValid(topicId)) {
        return res.status(400).json({ message: 'Invalid topicId' });
    }
    if (typeof isDone !== 'boolean') {
        return res.status(400).json({ message: 'isDone must be a boolean' });
    }
    console.log('Serching')

    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found' });
        }
        if (topic.subjectId.toString() !== subjectId.toString()) {
            return res
                .status(400)
                .json({ message: 'Topic does not belong to this subject' });
        }

        const progress = await Progress.findOneAndUpdate(
            {
                userId,
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
    } catch (error) {
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

export { createTopic, getTopicsOfSubject, deleteTopic, markAsDone };

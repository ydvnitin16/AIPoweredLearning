import mongoose from 'mongoose';
import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';
import User from '../models/userModel.js';

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

        subject.suggestedTopics = subject.suggestedTopics.filter(t => t !== topic);

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
        res.status(200).json({
            message: 'Topics fetched successfully',
            topics: topics || [],
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

export { createTopic, getTopicsOfSubject, deleteTopic };

import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';
import User from '../models/userModel.js';
import Progress from '../models/progressModel.js';

const createTopic = async (req, res) => {
    const { subjectId, topic } = req.body;
    let output = req.output || req.body.output;
    const revision = output.revision;
    if (typeof output === 'string') {
        output = JSON.parse(output);
    }
    try {
        const subject = await Subject.findById(subjectId);
        if (!subject)
            return res.status(404).json({ message: 'Subject not found.' });

        if (subject.createdBy.valueOf() !== req.user.id)
            return res.status(403).json({
                message:
                    "You are not allowed to create topic in other's Subject",
            });

        console.log(subjectId, topic);
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
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

function attachImagesToOutput(output, files) {
    let fileIdx = 0;
    output.content = output.content.map((block) => {
        if (
            block.type === 'image' &&
            block.data?.placeholder &&
            files[fileIdx]
        ) {
            block.data = {
                url: files[fileIdx].path,
                publicId: files[fileIdx].filename,
            };
            fileIdx++;
        }
        return block;
    });
    return output;
}

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
        return res.status(400).json({ message: 'Invalid topic ID.' });
    }

    try {
        const topic = await Topic.findById(id);
        if (!topic) {
            return res.status(404).json({ message: 'Topic not found.' });
        }

        const subject = await Subject.findById(topic.subjectId);
        if (!subject || subject.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message:
                    "You are not allowed to delete topic in other's Subject",
            });
        }

        // --- Delete Cloudinary images if present ---
        if (topic.output?.content && Array.isArray(topic.output.content)) {
            for (const block of topic.output.content) {
                if (block.type === 'image' && block.data?.publicId) {
                    try {
                        await cloudinary.uploader.destroy(block.data.publicId);
                        console.log(`Deleted image: ${block.data.publicId}`);
                    } catch (err) {
                        console.error(
                            `Failed to delete image ${block.data.publicId}:`,
                            err.message
                        );
                    }
                }
            }
        }

        // --- Delete progress records linked to this topic ---
        const progressResult = await Progress.deleteMany({ topicId: id });

        // --- Delete the topic itself ---
        await Topic.deleteOne({ _id: id });

        res.status(200).json({
            message: `Topic deleted successfully. Also removed ${progressResult.deletedCount} progress records and related images.`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const markAsDone = async (req, res) => {
    const { subjectId, topicId, isDone } = req.body;

    if (typeof isDone !== 'boolean') {
        return res.status(400).json({ message: 'isDone must be a boolean' });
    }

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
    } catch (error) {
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

export { createTopic, getTopicsOfSubject, deleteTopic, markAsDone };

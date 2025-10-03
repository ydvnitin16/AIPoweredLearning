import Subject from '../models/subjectModel.js';
import User from '../models/userModel.js';
import Topic from '../models/topicModel.js';
import mongoose from 'mongoose';
import { v2 as cloudinary } from "cloudinary";
import Progress from '../models/progressModel.js'

const createSubject = async (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Please Give the Title' });
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const subject = await Subject({
            title: title.trim(),
            createdBy: req.user.id,
            suggestedTopics: req?.suggestedTopics,
        });

        const createdSubject = await subject.save();
        user.subjects.push(createdSubject._id);
        await user.save();

        res.status(201).json({
            message: 'Subject created successfully.',
            subject: createdSubject,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const updateSubject = async (req, res) => {
    const { title, subjectId } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Please Give the Title' });
    }
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const subject = await Subject.findById(subjectId);

        if (!subject)
            return res.status(404).json({ message: 'Subject not found' });

        if (user._id.valueOf() !== subject.createdBy.valueOf()) {
            return res.status(403).json({
                message: "You can't generate suggestion in other's subject",
            });
        }

        subject.suggestedTopics = req.suggestedTopics;
        await subject.save();

        res.status(201).json({
            message: 'Suggestions generated successfully.',
            subject: subject,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const getImportedSubjects = async (req, res) => {
    const { id } = req.user;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const importedSubjects = await Subject.find({
            _id: { $in: user.importedSubjects },
        })
            .select('-suggestedTopics -isPublic')
            .populate({
                path: 'createdBy',
                select: 'email name -_id',
            });
        res.status(200).json({
            message: 'Fetched successfully.',
            importedSubjects: importedSubjects || [],
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const getSubjects = async (req, res) => {
    const { id } = req.user;
    try {
        const subjects = await Subject.find({
            createdBy: id,
        });

        const subjectIds = subjects.map((sub) => sub._id);

        // all topics of each subject
        const topics = await Topic.find({ subjectId: { $in: subjectIds } });

        const totalTopicsMap = {};

        // count of topics for each subject
        topics.forEach((topic) => {
            const subId = topic.subjectId.valueOf();
            totalTopicsMap[subId] = (totalTopicsMap[subId] || 0) + 1;
        });

        // fetch done topics
        const progressRecords = await Progress.find({
            userId: req.user.id,
            subjectId: { $in: subjectIds },
            isDone: true,
        });

        const doneTopicsMap = {};

        // count of done topics for each subject
        progressRecords.forEach((record) => {
            const subId = record.subjectId.toString();
            doneTopicsMap[subId] = (doneTopicsMap[subId] || 0) + 1;
        });

        const subjectWithProgress = subjects.map((subject) => {
            const subId = subject._id.valueOf();
            const totalTopics = totalTopicsMap[subId] || 0;
            const doneTopics = doneTopicsMap[subId] || 0;
            let progress = 0;
            if (totalTopics > 0) {
                progress = Math.round((doneTopics / totalTopics) * 100);
            }
            return {
                _id: subject._id,
                title: subject.title,
                isPublic: subject.isPublic,
                likes: subject.likes,
                createdBy: subject.createdBy,
                suggestedTopics: subject.suggestedTopics,
                totalTopics: totalTopics,
                doneTopics: doneTopics,
                progress: progress,
            };
        });

        res.status(200).json({
            message: 'Fetched your subjects successfully.',
            subjects: subjectWithProgress || [],
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const getPublicSubjects = async (req, res) => {
    try {
        const publicSubjects = await Subject.find({ isPublic: true })
            .select('-suggestedTopics -isPublic')
            .populate({
                path: 'createdBy',
                select: 'email name -_id',
            });
        res.status(200).json({
            message: 'Public subjects fetched successfully.',
            publicSubjects: publicSubjects || [],
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const updateIsPublicStatus = async (req, res) => {
    const { subjectId, isPublic } = req.body;

    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ message: 'Invalid subject ID.' });
    }
    if (typeof isPublic !== 'boolean') {
        return res.status(400).json({ message: 'isPublic must be a boolean.' });
    }
    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        if (subject.createdBy.valueOf() !== req.user.id) {
            return res.status(403).json({
                message: 'You are not allowed to update this subject',
            });
        }
        subject.isPublic = isPublic;
        const updatedSubject = await subject.save();
        res.status(200).json({
            message: `Subject set to ${isPublic ? 'Public' : 'private'}`,
            subject: updatedSubject,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const importSubject = async (req, res) => {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid subject ID.' });
    }
    try {
        const originalSubject = await Subject.findById(id);
        if (!originalSubject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        if (originalSubject.createdBy.valueOf() === req.user.id) {
            return res
                .status(403)
                .json({ message: `You can't import your own document` });
        }
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (user.importedSubjects.includes(originalSubject._id)) {
            return res
                .status(400)
                .json({ message: 'Subject already imported.' });
        }
        user.importedSubjects.push(originalSubject._id);

        await user.save();
        return res.status(200).json({
            message: `Subject imported successfully: ${originalSubject.title}`,
            importedSubjectId: originalSubject._id,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

const deleteSubject = async (req, res) => {
    const { subjectId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ message: "Invalid subject ID." });
    }

    try {
        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        if (subject.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You not allowed to delete this subject",
            });
        }

        // --- Remove subject reference from user ---
        const user = await User.findById(req.user.id);
        user.subjects = user.subjects.filter(
            (id) => id.toString() !== subjectId
        );
        await user.save();

        // --- Find all topics of this subject ---
        const topics = await Topic.find({ subjectId });
        const topicIds = topics.map((t) => t._id);

        // --- Delete all Cloudinary images from each topic ---
        for (const topic of topics) {
            if (topic.output?.content && Array.isArray(topic.output.content)) {
                for (const block of topic.output.content) {
                    if (block.type === "image" && block.data?.publicId) {
                        try {
                            await cloudinary.uploader.destroy(
                                block.data.publicId
                            );
                            console.log(
                                `Deleted image: ${block.data.publicId}`
                            );
                        } catch (err) {
                            console.error(
                                `Failed to delete image ${block.data.publicId}:`,
                                err.message
                            );
                        }
                    }
                }
            }
        }

        // --- Delete progress of all topics under this subject ---
        const progressResult = await Progress.deleteMany({
            subjectId,
            topicId: { $in: topicIds },
        });

        // --- Delete topics and subject ---
        const topicResult = await Topic.deleteMany({ subjectId });
        await Subject.findByIdAndDelete(subjectId);

        res.status(200).json({
            message: `Subject deleted. ${topicResult.deletedCount ? `${topicResult.deletedCount} topics,` : ''} ${progressResult.deletedCount ? `${progressResult.deletedCount} progress records` : ''}, related images removed successfully.`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
};

const deleteImportedSubject = async (req, res) => {
    const { subjectId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(subjectId)) {
        return res.status(400).json({ message: "Invalid subject ID." });
    }

    try {
        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }

        const user = await User.findById(req.user.id);
        user.importedSubjects = user.importedSubjects.filter(s => s.toString() !== subjectId);
        await user.save()


        res.status(200).json({
            message: `Subject deleted.`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Server error. Please try again later.",
        });
    }
}

export {
    createSubject,
    getSubjects,
    getPublicSubjects,
    updateIsPublicStatus,
    importSubject,
    getImportedSubjects,
    deleteSubject,
    updateSubject,
    deleteImportedSubject
};

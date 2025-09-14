import Subject from '../models/subjectModel.js';
import User from '../models/userModel.js';
import Topic from '../models/topicModel.js';
import mongoose from 'mongoose';

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
        res.status(200).json({
            message: 'Fetched your subjects successfully.',
            subjects: subjects || [],
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
        return res.status(400).json({ message: 'Invalid subject ID.' });
    }
    try {
        const subject = await Subject.findById(subjectId);

        if (!subject)
            return res.status(404).json({ message: 'Subject not found' });

        if (subject.createdBy.valueOf() !== req.user.id)
            return res
                .status(403)
                .json({ message: 'You not allowed to delete this subject' });

        const user = await User.findById(req.user.id);
        user.subjects = user.subjects.filter(
            (id) => id.valueOf() !== subjectId
        );
        await user.save();

        const result = await Topic.deleteMany({ subjectId: subjectId });
        await Subject.findByIdAndDelete(subjectId);
        res.status(200).json({
            message: `Subject and its ${result.deletedCount} topics deleted successfully.`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Server error. Please try again later.',
        });
    }
};

export {
    createSubject,
    getSubjects,
    getPublicSubjects,
    updateIsPublicStatus,
    importSubject,
    getImportedSubjects,
    deleteSubject,
    updateSubject
};

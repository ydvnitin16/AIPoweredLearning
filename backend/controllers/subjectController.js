import Subject from '../models/subjectModel.js';
import User from '../models/userModel.js';

const createSubject = async (req, res) => {
    const { title } = req.body;

    if (!title || title === null || title === null || title.trim() === '') {
        res.json({ message: 'Please Give the Title' });
    }
    try {
        const subject = await Subject({
            title: title.trim(),
            userId: req.user.id,
            suggestedTopics: req.suggestedTopics,
        });

        const user = await User.findById(req.user.id);
        const createdSubject = await subject.save();
        user.subjects.push(createdSubject._id);
        await user.save()

        res.json({ message: 'Saved successfully.' });
    } catch (err) {
        res.json({ message: 'Server Error Please try again Later' });
    }
};

const getMySubjects = async (req, res) => {
    const { id } = req.user;
    try {
        const mySubjects = await Subject.find({ userId: id });
        res.json({ message: 'Got My subjects.', mySubjects });
    } catch (err) {
        res.json({ message: 'Server Error Please try again Later' });
    }
};

const getPublicSubjects = async (req, res) => {
    try {
        const publicSubjects = await Subject.find({ isPublic: true });
        res.json({ message: 'Got all subjects.', publicSubjects });
    } catch (err) {
        res.json({ message: 'Server Error Please try again Later' });
    }
};

const getSubject = async (req, res) => {
    const { id } = req.params;
    try {
        const subject = await Subject.findById(id);
        res.json({ message: 'Got subject.', subject });
    } catch (err) {
        res.json({ message: 'Server Error Please try again Later' });
    }
};

const updateIsPublicStatus = async (req, res) => {
    const { subjectId, isPublic } = req.body;
    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.json({ message: 'Subject Not Found' });
        }
        if (subject.userId.valueOf() !== req.user.id) {
            return res.json({
                message: 'You are not allowed to update this subject',
            });
        }
        subject.isPublic = isPublic;
        await subject.save();
        res.json({
            message: `Subject set to ${isPublic ? 'Public' : 'private'}`,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error. Please try again later.' });
    }
};

export {
    createSubject,
    getMySubjects,
    getPublicSubjects,
    getSubject,
    updateIsPublicStatus,
};

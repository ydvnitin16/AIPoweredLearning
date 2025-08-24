import Subject from '../models/subjectModel.js';

const createSubject = async (req, res) => {
    console.log(req.body)
    const { title } = req.body;

    if (!title || title === null || title === null || title.trim() === '') {
        res.json({ message: 'Please Give the Title' });
    }
    try {
        const subject = await Subject({
            title: title.trim(),
            userId: req.user.id,
        });

        subject.save();
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

const getAllSubjects = async (req, res) => {
    try {
        const allSubjects = await Subject.find({ isPublic: true });
        res.json({ message: 'Got all subjects.', allSubjects });
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

export { createSubject, getMySubjects, getAllSubjects, getSubject };

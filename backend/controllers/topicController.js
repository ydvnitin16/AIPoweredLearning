import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';

const createTopic = async (req, res) => {
    try {
        const { subjectId, title, explanation, flashcards, notes, revision } =
            req.body;
        const topic = await Topic({
            subjectId: subjectId,
            title: title,
            explanation: explanation,
            flashcards: flashcards,
            notes: notes,
            revision: revision,
        });
        const createdTopic = await topic.save();
        const subject = await Subject.findById(subjectId);
        subject.topics.push(createdTopic._id);
        await subject.save();
        res.json({ message: 'Topic Added.' });
    } catch (err) {
        res.json({ message: 'Server Error Please try again Later' });
    }
};

const getTopicsOfSubject = async (req, res) => {
    const { id } = req.params;
    try {
        const topics = await Topic.find({ subjectId: id });
        res.json({ message: 'Topics', topics });
    } catch (error) {
        res.json({ message: 'Server Error Please try again Later' });
    }
};

export { createTopic, getTopicsOfSubject };

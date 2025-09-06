import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';
import User from '../models/userModel.js';

const createTopic = async (req, res) => {
    try {
        console.log('Entered Topic');
        const { subjectId, topic } = req.body;

        const output = req.output;
        const revision = output.quickRevision;
        console.log('Output at topicC: ', output);
        const newTopic = new Topic({
            subjectId: subjectId,
            topic: topic,
            output: output,
            revision: revision,
        });
        const createdTopic = await newTopic.save();
        console.log('Created Topic:, ', createTopic);
        const subject = await Subject.findById(subjectId);
        subject.topics.push(createdTopic._id);
        subject.suggestedTopics = req.suggestedTopics;
        console.log('subject: ', subject);
        console.log('saving...');
        await subject.save();
        res.json({ message: 'Topic Added.', newTopic });
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

const markAsDone = async (req, res) => {
    const { isDone, topicId } = req.body;
    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.json({ message: 'Topic Not Found' });
        }

        const user = await User.findById(req.user.id);
        const youAllowed = user.subjects.some(
            (subj) => subj.toString() === topic.subjectId.toString()
        );

        if(!youAllowed) return res.json({ message: 'You are not allowed' });

        topic.isDone = isDone;
        await topic.save();
        res.json({
            message: `Topic marked ${isDone ? 'completed' : 'in progress'}`,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: 'Server error. Please try again later.' });
    }
};

export { createTopic, getTopicsOfSubject, markAsDone };

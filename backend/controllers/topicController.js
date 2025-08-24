import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';

const createTopic = async (req, res) => {
    try {
        console.log('Entered Topic')
        const { subjectId, topic } = req.body;

        const output = req.output;
        const revision = output.quickRevision;
        console.log('Output at topicC: ', output)
        const newTopic = new Topic({
            subjectId: subjectId,
            topic: topic,
            output: output,
            revision: revision,
        });
        const createdTopic = await newTopic.save();
        console.log('Created Topic:, ', createTopic)
        const subject = await Subject.findById(subjectId);
        console.log("subject: ",subject)
        subject.topics.push(createdTopic._id);
        console.log('saving...')
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

export { createTopic, getTopicsOfSubject };

import Subject from '../models/subjectModel.js';
import Topic from '../models/topicModel.js';

const createTopic = async (req, res) => {
    try {
        console.log('Entered Topic')
        const { subjectId, title } = req.body;

        const output = req.output;
        const revision = output.quickRevision;
        console.log('Output at topicC: ', output)
        const topic = new Topic({
            subjectId: subjectId,
            title: title,
            output: output,
            revision: revision,
        });
        const createdTopic = await topic.save();
        console.log('Created Topic:, ', createTopic)
        const subject = await Subject.findById(subjectId);
        console.log("subject: ",subject)
        subject.topics.push(createdTopic._id);
        console.log('saving...')
        await subject.save();
        res.json({ message: 'Topic Added.', topic });
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

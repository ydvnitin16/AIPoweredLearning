import GenAI from '../configs/gemini.js';
import {
    buildPrompt,
    createUserConfig,
    parseJson,
} from '../utils/aiUtils.js';
import { handleError, throwError } from '../utils/helper.js';
import { validateTitle } from '../utils/validationUtils.js';

const generateTopicExp = async (req, res, next) => {
    const { topic } = req.body;
    try {
        if (!validateTitle(topic)) {
            throwError('Please enter topic');
        }

        const userConfig = createUserConfig(req.body, req.user);
        const prompt = buildPrompt(userConfig);

        const model = GenAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent(prompt);
        const output = result.response.text();
        const jsonOutput = parseJson(output);
        req.output = jsonOutput;
        next();
    } catch (err) {
        handleError(res, err)
    }
};

const getSuggestedTopics = async (req, res, next) => {
    const { title, topics } = req.body;

    if (!validateTitle(title)) {
        return res.status(400).json({ message: 'Please Give the Title' });
    }

    const prompt = `
    You are a curriculum assistant.
        Given a ${title} subject ${
        topics ? `${topics} these topics are already done` : ''
    }, generate 10 highly relevant and logically ordered topics that a learner should study next. 
        - Input is a SUBJECT return subtopics covering the subject step by step.
        - Format your output strictly as a valid JSON array of strings:
        ["topic1", "topic2", "topic3", ...]
        
        Input: ${title}
        `;
    try {
        const model = GenAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const result = await model.generateContent(prompt);
        const output = result.response.text();
        const jsonOutput = parseJson(output);
        req.suggestedTopics = jsonOutput;
    } catch (err) {
        handleError(res, err);
    } finally {
        next();
    }
};

export { generateTopicExp, getSuggestedTopics };

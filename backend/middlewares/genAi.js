import GenAI from '../configs/gemini.js';
import {
    buildPrompt,
    createUserConfig,
    parseJson,
} from '../helper/aiHelpers.js';

const generateTopicExp = async (req, res, next) => {
    const { topic } = req.body;

    const userConfig = createUserConfig(req.body, req.user);
    const prompt = buildPrompt(userConfig);

    try {
        const model = GenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log('genAi...');
        const result = await model.generateContent(prompt);
        const output = result.response.text();
        const jsonOutput = parseJson(output);
        req.output = jsonOutput;
        console.log("JSON Output: ",jsonOutput);
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Failed to generate topic explanation.',
        });
    }
};

const getSuggestedTopics = async (req, res, next) => {
    const { title } = req.body;
    const prompt = `
    You are a curriculum assistant.
        Given a ${title} subject, generate 10 highly relevant and logically ordered topics that a learner should study next. 
        - Input is a SUBJECT return subtopics covering the subject step by step.
        - Format your output strictly as a valid JSON array of strings:
        ["topic1", "topic2", "topic3", ...]
        
        Input: ${title}
        `;
    try {
        const model = GenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log('genAi...');
        const result = await model.generateContent(prompt);
        const output = result.response.text();
        const jsonOutput = parseJson(output)
        console.log("JSON Output: ",jsonOutput);
        req.suggestedTopics = jsonOutput;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            message: 'Failed to generate topic explanation.',
        });
    }
};

export { generateTopicExp, getSuggestedTopics };

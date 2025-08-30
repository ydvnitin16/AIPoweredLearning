import GenAI from '../configs/gemini.js';

const generateTopicExp = async (req, res, next) => {
    console.log('entered genai!');
    console.log('req.body', req.body, 'req.user', req.user);
    const { topic } = req.body;
    const userConfig = {
        topic: req.body.topic,
        subject: req.body.subject,
        prompt: req.body.prompt,
        flashcards: {
            enabled: req.body.flashcards.enabled,
            count: req.body.flashcards.count,
        },
        quizzes: {
            enabled: req.body.quizzes.enabled,
            count: req.body.quizzes.count,
        },
        practiceQuestions: {
            enabled: req.body.practiceQuestions.enabled,
            difficulty: req.body.practiceQuestions.difficulty,
            count: req.body.practiceQuestions.count,
        },
        userProfile: {
            bio: req.user.bio,
            additionalInfo: req.user.additionalInfo,
        },
    };

    const prompt = buildPrompt(userConfig);

    const model = GenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('genAi...');
    const result = await model.generateContent(prompt);
    console.log('generated!');
    const output = result.response.text();
    const cleanOutput = output.replace(/```json|```/g, '').trim();
    console.log('cleaned!');
    try {
        const jsonOutput = JSON.parse(cleanOutput);
        console.log('exiting');
        req.output = jsonOutput;
        console.log(jsonOutput);
        next();
    } catch (err) {
        console.error('Failed to parse JSON:', cleanOutput);
    }
};

const getSuggestedTopics = async (req, res, next) => {
    const { title, topic } = req.body;
    const prompt = `
    You are a curriculum assistant.
        Given a subject or topic, generate 10 highly relevant and logically ordered topics that a learner should study next. 
        - If the input is a SUBJECT (e.g. "Computer Networks"), return subtopics covering the subject step by step.
        - If the input is a TOPIC (e.g. "OSI Model"), return related or next-level topics that follow naturally in the learning path.
        - Format your output strictly as a valid JSON array of strings:
        ["topic1", "topic2", "topic3", ...]
  
    Input: ${title || topic}
  `;
    const model = GenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('genAi...');
    const result = await model.generateContent(prompt);
    console.log('generated!');
    const output = result.response.text();
    console.log(output);
    const cleanOutput = output.replace(/```json|```/g, '').trim();
    console.log('cleaned!');

    try {
        const jsonOutput = JSON.parse(cleanOutput);
        console.log('exiting');
        console.log(jsonOutput);
        req.suggestedTopics = jsonOutput;
        next();
    } catch (err) {
        console.log(err.message);
        console.error('Failed to parse JSON:', cleanOutput);
    }
};

function buildPrompt(config) {
    let flashcardRule = config.flashcards.enabled
        ? `Generate exactly ${config.flashcards.count} flashcards.`
        : 'Do not generate flashcards.';

    let quizRule = config.quizzes.enabled
        ? `Generate exactly ${config.quizzes.count} quizzes.`
        : 'Do not generate quizzes.';

    let practiceRule = config.practiceQuestions.enabled
        ? `Generate ${config.practiceQuestions.count} practice questions with difficulty ${config.practiceQuestions.difficulty}.`
        : 'Do not generate practice questions.';

    return `
You are an AI content generator specialized in education. 
You always output ONLY valid JSON. 
Do not include \`\`\`json or any markdown formatting.
Never include reasoning — only the JSON object.

User context:
- Topic: ${config.topic}
- Subject: ${config.subject}
- What user do: ${config.userProfile.bio}
- additional Info: ${config.userProfile.additionalInfo}
- Extra Instruction: ${config.prompt || 'None'}

Follow this example schema strictly:
{
  "content": [
    { "type": "...", "heading": "...", "data": "..." },
    { "type": "...", "heading": "...", "data": "..." },
    { "type": "...", "heading": "...", "data": "..." }
     ...
  ],
  "flashcards": [
    { "question": "...", "answer": "..." }
  ],
  "quizzes": [
    { "question": "...", "options": ["..."], "answer": "..." }
  ],
  "practiceQuestions": [
    { "question": "...", "answer": "..." }
  ],
  "quickRevision": "..."
}

Rules:
- Explanations: clear, structured, ${
        config.userProfile.preference || 'college-level'
    }.
- Content: supported types ['text', 'code', 'formula']
- Code: always include inline comments.
- ${flashcardRule}
- ${quizRule}
- ${practiceRule}
- Quick revision: 2–3 sentences.
- Ensure the JSON is valid and parsable.
- Output must be valid JSON (no trailing commas, no comments outside code).
   `;
}

export { generateTopicExp, getSuggestedTopics };

import GenAI from '../configs/gemini.js';

const generateTopicExp = async (req, res, next) => {
    console.log('entered genai!');
    console.log('req.body', req.body, 'req.user', req.user);
    const { topic } = req.body;
    const userConfig = {
        topic: req.body.topic,
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
    const { title } = req.body;
    const prompt = `
      Generate array of 10 topics related to subject ${title}
      follow this schema strictly:
      ["topic1", "topic2",...]
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
- What user do: ${config.userProfile.bio}
- additional Info: ${config.userProfile.additionalInfo}
- Extra Instruction: ${config.prompt || 'None'}

Follow this schema strictly:
{
  "content": [
    { "type": "text", "heading": "...", "data": "..." },
    { "type": "code", "data": "..." },
    { "type": "formula", "heading": "...", "data": "..." },
    { "type": "image", "heading": "...", "data": "..." }
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

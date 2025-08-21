import GenAI from '../configs/gemini.js';

const generateTopicExp = async (req, res, next) => {
    console.log('entered genai!');
    const { title } = req.body;
    const model = GenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('genAi...');
    const result = await model.generateContent(`
        You are an AI that only outputs JSON.
  Explain the topic: ${title}, 3 flashcards and 4 quizzes in this JSON format only:

  {
    "content": [
      { "type": "text", "heading": "..." "data": "..." },
      { "type": "code", "data": "..." },
      { "type": "formula", "heading": "..." "data": "..." },
      { "type": "image", "heading": "..." "data": "..." },
       ..............
    ],
    "flashcards": [
      { "question": "...", "answer": "..." }
    ],
    "quizzes": [
      { "question": "...", "options": ["..."], "answer": "..." }
    ],
    "quickRevision": '....'
  }

  Rules:
  - Only output valid JSON.
  - Do not include \`\`\`json or any markdown formatting.
  - Ensure the JSON is valid and parsable.
  - Code also contain comments
`);
    console.log('generated!');
    const output = result.response.text();
    const cleanOutput = output.replace(/```json|```/g, '').trim();
    console.log('cleaned!');
    try {
        const jsonOutput = JSON.parse(cleanOutput);
        console.log('exiting');
        req.output = jsonOutput;
        next();
    } catch (err) {
        console.error('Failed to parse JSON:', cleanOutput);
    }
};

export { generateTopicExp };

function createUserConfig(body, user) {
    return {
        topic: body.topic,
        subject: body.subject,
        prompt: body.prompt,
        flashcards: {
            enabled: body.flashcards?.enabled,
            count: body.flashcards?.count,
        },
        quizzes: {
            enabled: body.quizzes?.enabled,
            count: body.quizzes?.count,
        },
        practiceQuestions: {
            enabled: body.practiceQuestions?.enabled,
            difficulty: body.practiceQuestions?.difficulty,
            count: body.practiceQuestions?.count,
        },
        userProfile: {
            bio: user.bio,
            additionalInfo: user.additionalInfo,
        },
    };
}

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
  "revision": "..."
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

function cleanJsonOutput(output) {
    return output.replace(/```json|```/g, '').trim();
}

function parseJson(output) {
    const cleaned = cleanJsonOutput(output);
    try {
        return JSON.parse(cleaned);
    } catch (err) {
        console.log('Failed to parse JSON: ', cleaned);
        throw new Error('Invalid JSON format.');
    }
}

export { createUserConfig, buildPrompt, parseJson };

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import connectDB from './configs/mongoConfig.js';
import userRoute from './routes/userRoute.js';
import subjectRoute from './routes/subjectRoute.js';
import topicRoute from './routes/topicRoute.js';
import GenAI from './configs/gemini.js';

dotenv.config();
connectDB();
const app = express();
app.use(
    cors({
        origin: process.env.CLIENTSERVER,
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.get('/generate', async (req, res) => {
    const { topic } = req.body;
    const model = GenAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(`
  Explain the topic: ${topic} in this JSON format only:

  {
    "content": [
      { "type": "text", "data": "..." },
      { "type": "code", "data": "..." },
      { "type": "formula", "data": "..." },
      { "type": "image", "data": "..." }
    ],
    "flashcards": [
      { "question": "...", "answer": "..." }
    ],
    "quizzes": [
      { "question": "...", "options": ["..."], "answer": "..." }
    ]
  }

  Rules:
  - Only output valid JSON.
  - Do not include \`\`\`json or any markdown formatting.
  - Ensure the JSON is valid and parsable.
`);

    const output = result.response.text();
    const cleanOutput = output.replace(/```json|```/g, '').trim();

    let jsonOutput;
    try {
        jsonOutput = JSON.parse(cleanOutput);
        res.json({output, cleanOutput, jsonOutput})
    } catch (err) {
        console.error('Failed to parse JSON:', cleanOutput);
    }
});

app.use('/', userRoute);
app.use('/', subjectRoute);
app.use('/', topicRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server running at http://localhost:3000');
});

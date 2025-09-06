import express from 'express';
import { auth } from '../middlewares/auth.js';
import { createTopic, getTopicsOfSubject, markAsDone } from '../controllers/topicController.js';
import { generateTopicExp, getSuggestedTopics } from '../middlewares/genAi.js';
const router = express.Router();

router.post('/topics', auth, generateTopicExp, getSuggestedTopics, createTopic)
router.get('/:id/topics', auth, getTopicsOfSubject)
router.put('/topics/done', auth, markAsDone)

export default router;

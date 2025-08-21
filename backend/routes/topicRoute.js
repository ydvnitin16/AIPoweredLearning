import express from 'express';
import { auth } from '../middlewares/auth.js';
import { createTopic, getTopicsOfSubject } from '../controllers/topicController.js';
import { generateTopicExp } from '../middlewares/genAi.js';
const router = express.Router();

router.post('/topics', auth, generateTopicExp, createTopic)
router.get('/:id/topics', auth, getTopicsOfSubject)

export default router;

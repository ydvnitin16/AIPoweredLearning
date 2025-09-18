import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
    createTopic,
    deleteTopic,
    getTopicsOfSubject,
    markAsDone,
} from '../controllers/topicController.js';
import { generateTopicExp } from '../middlewares/genAi.js';
const router = express.Router();

router.post('/topics', auth, generateTopicExp, createTopic);
router.get('/:id/topics', auth, getTopicsOfSubject);
router.delete('/topics/delete', auth, deleteTopic);
router.put('/topics/status', auth, markAsDone);

export default router;

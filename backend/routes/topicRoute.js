import express from 'express';
import { auth } from '../middlewares/auth.js';
import { createTopic, getTopicsOfSubject } from '../controllers/topicController.js';
const router = express.Router();

router.post('/topics', auth, createTopic)
router.get('/:id/topics', auth, getTopicsOfSubject)

export default router;

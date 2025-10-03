import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
    createTopic,
    deleteTopic,
    getTopicsOfSubject,
    markAsDone,
} from '../controllers/topicController.js';
import { generateTopicExp } from '../middlewares/genAi.js';
import { storage } from '../configs/cloudinary.js';
import multer from 'multer';

const router = express.Router();

const uploads = multer({
    storage,
});

router.post('/topics', auth, generateTopicExp, createTopic);
router.post('/create-topic', auth, uploads.array('images'), createTopic);
router.get('/:id/topics', auth, getTopicsOfSubject);
router.delete('/topics/delete', auth, deleteTopic);
router.put('/topics/status', auth, markAsDone);

export default router;

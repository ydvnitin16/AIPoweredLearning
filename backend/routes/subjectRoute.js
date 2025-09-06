import express from 'express';
import { createSubject, getMySubjects, getPublicSubjects, getSubject, updateIsPublicStatus } from '../controllers/subjectController.js';
import { auth } from '../middlewares/auth.js';
import { getSuggestedTopics } from '../middlewares/genAi.js';
const router = express.Router();

router.post('/subjects', auth, getSuggestedTopics, createSubject);
router.get('/my-subjects', auth, getMySubjects);
router.get('/public-subjects', auth, getPublicSubjects);
router.get('/subjects/:id', auth, getSubject);
router.put('/subjects/public', auth, updateIsPublicStatus);

export default router;

import express from 'express';
import { createSubject, getMySubjects, getAllSubjects, getSubject } from '../controllers/subjectController.js';
import { auth } from '../middlewares/auth.js';
import { getSuggestedTopics } from '../middlewares/genAi.js';
const router = express.Router();

router.post('/subjects', auth, getSuggestedTopics, createSubject);
router.get('/my-subjects', auth, getMySubjects);
router.get('/all-subjects', auth, getAllSubjects);
router.get('/subjects/:id', auth, getSubject);

export default router;

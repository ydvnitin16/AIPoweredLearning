import express from 'express';
import {
    createSubject,
    getSubjects,
    getPublicSubjects,
    updateIsPublicStatus,
    importSubject,
    getImportedSubjects,
    deleteSubject,
    updateSubject,
    deleteImportedSubject,
} from '../controllers/subjectController.js';
import { auth } from '../middlewares/auth.js';
import { getSuggestedTopics } from '../middlewares/genAi.js';
const router = express.Router();

router.post('/subjects', auth, getSuggestedTopics, createSubject);
router.get('/subjects', auth, getSubjects);
router.get('/public-subjects', auth, getPublicSubjects);
router.get('/imported-subjects', auth, getImportedSubjects);
router.put('/subjects/public', auth, updateIsPublicStatus);
router.post('/subjects/import', auth, importSubject);
router.delete('/subjects', auth, deleteSubject);
router.delete('/imported-subjects', auth, deleteImportedSubject);
router.put('/subjects/suggestions', auth, getSuggestedTopics, updateSubject);

export default router;

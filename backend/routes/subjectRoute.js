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
router.put('/subjects/suggestions', auth, getSuggestedTopics, updateSubject);
router.delete('/subjects', auth, deleteSubject);
router.put('/subjects/public', auth, updateIsPublicStatus);
router.get('/public-subjects', auth, getPublicSubjects);
router.post('/subjects/import', auth, importSubject);
router.get('/imported-subjects', auth, getImportedSubjects);
router.delete('/imported-subjects', auth, deleteImportedSubject);

export default router;

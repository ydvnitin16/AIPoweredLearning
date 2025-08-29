import express from 'express';
import { validateUser } from '../middlewares/userValidate.js';
import {
    registerUser,
    loginUser,
    logoutUser,
    updateProfile,
} from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', validateUser('register'), registerUser);
router.post('/login', validateUser('login'), loginUser);
router.put('/update-profile', auth, updateProfile);
router.delete('/logout', logoutUser);

export default router;

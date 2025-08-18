import express from 'express';
import { validateUser } from '../middlewares/userValidate.js';
import {
    registerUser,
    loginUser,
    logoutUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', validateUser('register'), registerUser);
router.post('/login', validateUser('login'), loginUser);
router.delete('/logout', logoutUser);

export default router;

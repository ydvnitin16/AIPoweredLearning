import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { throwError, handleError } from '../utils/helper.js';

// user register -> Store user info to the DB
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check is User already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) throwError('Email already exists!', 409);

        // hash password & answer using bcrypt
        const hashPwd = await bcrypt.hash(password, 10);

        // Save user info in DB
        const user = await User({
            name,
            email,
            password: hashPwd,
        });
        await user.save();

        res.status(201).json({ message: 'Registered Successfully!' });
    } catch (err) {
        handleError(res, err);
    }
};

// User Login -> Auth user to get access
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Get user
        const userInfo = await User.findOne({ email });

        // If Email not found
        if (!userInfo) throwError('Invalid Credentials', 404);

        const isPasswordCorrect = await bcrypt.compare(
            password,
            userInfo.password
        );

        if (!isPasswordCorrect) throwError('Invalid Credentials', 404);

        // If correct credentials_ auth user

        const token = jwt.sign(
            {
                id: userInfo._id,
                name: userInfo.name,
                email: userInfo.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3d' }
        );

        res.cookie('authHeader', `Bearer ${token}`, {
            httpOnly: true, // sent only to http
            secure: process.env.NODE_ENV === 'production', // cookie only set to the https
            sameSite: 'none', // accessed by same domain
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expires in 3 Days
        });

        res.status(200).json({
            message: 'Logged In Successfully.',
            user: {
                id: userInfo._id,
                name: userInfo.name,
                email: userInfo.email,
                bio: userInfo.bio,
                preference: userInfo.preference,
                additionalInfo: userInfo.additionalInfo,
            },
        });
    } catch (err) {
        handleError(res, err);
    }
};

// User Logout
const logoutUser = (req, res) => {
    res.clearCookie('authHeader');
    res.status(200).json({ message: 'Logout Successfully.' });
};

const updateProfile = async (req, res) => {
    const { name, bio, additionalInfo } = req.body;
    try {
        if (!name || name.trim().length < 2)
            throwError(
                'Name is required and must be at least 2 characters.',
                400
            );

        const userProfile = await User.findById(req.user.id);
        userProfile.name = name;
        userProfile.bio = bio;
        userProfile.additionalInfo = additionalInfo;

        await userProfile.save();

        const token = jwt.sign(
            {
                id: userProfile._id,
                name: userProfile.name,
                email: userProfile.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3d' }
        );

        res.cookie('authHeader', `Bearer ${token}`, {
            httpOnly: true, // sent only to http
            secure: false, // cookie only set to the https
            sameSite: 'lax', // accessed by same domain
            maxAge: 3 * 24 * 60 * 60 * 1000, // Expires in 3 Days
        });

        res.status(200).json({
            message: 'Profile Updated Successfully.',
            user: {
                id: userProfile._id,
                name: userProfile.name,
                email: userProfile.email,
                bio: userProfile.bio,
                preference: userProfile.preference,
                additionalInfo: userProfile.additionalInfo,
            },
        });
    } catch (err) {
        handleError(res, err);
    }
};

export { registerUser, loginUser, logoutUser, updateProfile };

import mongoose from 'mongoose';
import { throwError } from './helper.js';

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const validateTitle = (title) => {
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return false;
    }
    return true;
};

export const checkOwnerShip = (...matches) => {
    if (matches.length === 0)
        throwError(
            'You are not authorized to perform this action.',
            403
        );
    const first = matches[0];
    for (let i = 1; i < matches.length; i++) {
        if (matches[i] !== first) {
            throwError(
                'You are not authorized to perform this action.',
                403
            );
        }
    }
    return true;
};

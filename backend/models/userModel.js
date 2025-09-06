import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Subject', // My subject
            },
        ],
        bio: { type: String, default: '', trim: true },
        additionalInfo: { type: String, default: '', trim: true },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

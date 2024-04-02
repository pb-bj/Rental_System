import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

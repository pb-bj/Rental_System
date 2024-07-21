import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    amount: { type: Number },
    paymentDate: { type: Date, default: Date.now },
}, { timestamps: true })

export const Payment = new mongoose.model('Payment', paymentSchema);

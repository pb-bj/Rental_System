import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true }
}, { timestamps: true })

export const Payment = new mongoose.model('Payment', paymentSchema);

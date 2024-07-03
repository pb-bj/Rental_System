import { Payment } from "../models/payment.model.js";
import { Booking } from "../models/booking.model.js";
import { User } from '../models/user.model.js';

export const createPayment = async (req, res) => {
    try {
        const { bookingId, userId, amount } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(400).json({ err: 'No Booking found' });

        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ err: 'User not found' });

        const payment = new Payment({
            booking: bookingId,
            user: userId,
            amount
        });

        if (!payment) return res.status(400).json({ message: err.message });

        booking.isPaid = true;
        await booking.save();
        await payment.save();
        res.status(201).json({ message: 'Payment success', payment });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message : err.message })
    }
}

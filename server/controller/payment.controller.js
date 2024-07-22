import { Payment } from "../models/payment.model.js";
import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

// Creating payment
export const createPayment = async (req, res) => {
    try {
        const { bookingId, amount, userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ message: 'Invalid Booking ID' });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const booking = await Booking.findById(bookingId);
        const user = await User.findById(userId);

        if (!booking) {
            return res.status(400).json({ message: 'No Booking found' });
        }
        if (!user) {
            return res.status(400).json({ message: 'No User found' });
        }

        const payment = new Payment({
            booking: bookingId,
            user: userId,
            amount
        });

        booking.isPaid = true;
        const car = await Car.findById(booking.car);
        if (!car) return res.status(400).json({ message: 'No Car found' });
        car.isAvailable = false;

        await booking.save();
        await payment.save();
        await car.save();

        res.status(201).json({ message: 'Payment success', payment });
    } catch (err) {
        console.error('Error creating payment:', err);
        return res.status(500).json({ message: err.message });
    }
}

export const getUserPaymentDetail = async (req, res) => {
    try {
        const userId = req.params.id;
         if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }
        
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: 'User not found' });

        const payment = await Payment.find({ user: userId })
            .populate('user', 'email');
            if (!payment) return res.status(404).json({ message: 'No payment found' });
            
        console.log(payment);
        res.status(200).json({ message: 'User payment: ', payment });
    } catch (err) {
        console.log("Error");
        return res.status(500).json({ message: err.message });
    }
}
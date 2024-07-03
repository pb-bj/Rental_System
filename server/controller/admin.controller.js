import { Booking } from "../models/booking.model.js";

export const confirmBookingApproval = async (req, res) => {
    try {
        const bookingId= req.params.id;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(400).json({ message: 'Approval for booking failed' });

        booking.status = 'approved';
        await booking.save();
        
        res.status(200).json({ message: 'Booking approved' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

export const cancelBookingByAdmin = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { reasons } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(400).json({ message: 'booking cancellation failed' });

        booking.status = 'cancelled';
        booking.isCancelled = true;
        booking.cancellationReason = reasons;
        booking.cancelledBy = 'admin';
        booking.refundAmount = booking.isPaid ? booking.totalPrice : 0;

        await booking.save();
        res.status(200).json({ message: 'Booking cancelled by admin sucessfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
import { Booking } from "../models/booking.model";

export const bookingDetails = async (req, res) => {
    try {
        const bookings = await Booking.create()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}
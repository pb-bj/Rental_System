import { Booking } from "../models/booking.model";

export const bookingDetails = async (req, res) => {
    try {
        const { userId, carId, phone, address, license, tripStartDate, tripEndDate, pickupLocation } = req.body;

        // const id = await User.findById({ userId })
        const bookings = await Booking.create({
            phone,
            address,
            license,
            tripStartDate,
            tripEndDate,
            pickupLocation
        });

        if (!bookings) return res.status(400).json({ error: 'Booking failed' });

        res.status(201).json({ message: 'Booking successful', data: bookings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}
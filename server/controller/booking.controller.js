import { Booking } from "../models/booking.model.js";
import mongoose from "mongoose";

export const bookingDetails = async (req, res) => {
    try {
        const { license, address, tripStartDate, tripEndDate, carIds } = req.body;
          const user = req.user._id;

        // checking for valid carId
         const validCarIds = carIds.every(carId => mongoose.Types.ObjectId.isValid(carId));
            if (!validCarIds) {
                return res.status(400).json({ message: 'Invalid car ID(s) provided' });
        }

        const booking = new Booking({
            user,
            license,
            address,
            tripStartDate,
            tripEndDate,
            cars: carIds
        });
        
        await booking.save({ populate : 'car' });
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// single user booking details
export const singleUserBookingDetails = async (req, res) => {
    try {   
        const userId = req.user._id;
        if ( !req.user || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid User id' });
        }

        const userBookings = await Booking.find({ user: userId })
            .populate('user', 'fullname, email')
            .populate('cars')

        if (userBookings.length == 0) {
            return res.status(400).json({ error: 'Booking empty' });
        }

        res.status(200).json({ bookings:  userBookings });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message : error.message})
    }
}

// all users booking
export const allBookingDetails = async (req, res) => {
    try {
        
        const bookings = await Booking.find()
            .populate('user', 'fullname, email')
            .populate('cars')
        
        const totalBookingCount = await Booking.countDocuments();

        if (bookings.length == 0 || totalBookingCount == 0 ) return res.status(400).json({ error: 'Booking are empty' });

        res.status(200).json({ bookings, totalBookingCount });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

// for cancellations 
export const bookingCancellation = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user._id;

        if (!bookingId || !userId) return res.status(400).json({ error: 'Invalid ID' });
        
        const booking = await Booking.findOne({ _id: bookingId, user: userId });
            if (!booking || booking.isCancelled) {
                return res.status(400).json({ error: 'Booking not found or already cancelled' });
        }
        
        booking.isCancelled = true;
        await booking.save();
        console.log("Cancelled", booking.isCancelled);

        res.status(200).json({ message: 'Booking Cancelled', booking });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
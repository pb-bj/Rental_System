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
        // const userId = req.user._id;
        const bookingId = req.params.id;
        // console.log('Id', bookingId)
         
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({ error: 'Invalid booking ID' });
        }

        const userBookings = await Booking.findById(bookingId)
            .populate('user', 'fullname, email')
            .populate('cars')
        // console.log('Booking hai: ', userBookings);

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
        
        if (bookings.length == 0) return res.status(400).json({ error: 'Booking are empty' });

        res.status(200).json({ bookings });
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

// for admin
export const allBookingCount = async (req, res) => {
    try {
        const totalBookingCount = await Booking.countDocuments();
        if (!totalBookingCount || totalBookingCount.length == 0) {
            return res.status(400).json({ message: 'No booking yet or empty booking' });
        }

        res.status(200).json({ bookingCount : totalBookingCount })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

export const userBookingCount = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('user-id', userId)

        const totalBookingCount = await Booking.countDocuments({ user: userId });
        console.log('user-booking', totalBookingCount)
        
        if (!totalBookingCount || totalBookingCount.length == 0) {
            return res.status(400).json({ message: 'No booking yet' });
        }

        res.status(200).json({ bookingCount : totalBookingCount })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
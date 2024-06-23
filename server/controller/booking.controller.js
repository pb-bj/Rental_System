import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";
import mongoose from "mongoose";

export const bookingDetails = async (req, res) => {
    try {
        const { license, address, tripStartDate, tripEndDate, location, carId, totalPrice } = req.body;
        const user = req.user._id;

        // Checking for valid carId
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car id provided' });
        }

        // checking for existing driver license 
        const checkExisitingLicenseNumber = await Car.findOne({ user, license, isCancelled: false })
        if (checkExisitingLicenseNumber) return res.status(400).json({ message: 'Driver license already exist' });

        
        // Checking the price from frontend to backend
        const totalTripDays = Math.ceil((new Date(tripEndDate) - new Date(tripStartDate)) / (1000 * 60 * 60 * 24)) + 1;
        const car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (!car.isAvailable) {
            return res.status(400).json({ message: 'Either booked or not available' })
        }
        
        const actualCalculatedPrice = car.price * totalTripDays;
        console.log('Car price total', actualCalculatedPrice);

        if (totalPrice !== actualCalculatedPrice) {
            return res.status(400).json({ priceMismatch: true, actualCalculatedPrice });
        }

        const booking = new Booking({
            user,
            license,
            address,
            tripStartDate,
            tripEndDate,
            location,
            car: carId,
            totalPrice: actualCalculatedPrice,
        });

        await booking.save();

        car.isAvailable = false;
        await car.save();
        
        res.status(201).json({ priceMismatch: false, message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Error when booking', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// single user booking details
export const singleUserBookingDetails = async (req, res) => {
    try {   
        const userId = req.user._id;
        const userBookings = await Booking.find({ user: userId })
            .populate('user', 'fullname, email')
            .populate('car')

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
            .populate('car')
        
        if (bookings.length == 0) return res.status(400).json({ error: 'Booking are empty' });

        res.status(200).json({ bookings });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
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

//for user
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

        const car = await Car.findById( booking.car ) // from the booking car Id 
            car.isAvailable = true;
            car.save();

        res.status(200).json({ message: 'Booking Cancelled', booking  });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
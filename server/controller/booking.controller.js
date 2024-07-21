import { Booking } from "../models/booking.model.js";
import { Car } from "../models/car.model.js";
import mongoose from "mongoose";

export const bookingDetails = async (req, res) => {
    try {
        const { tripStartDate, tripEndDate, location, carId, totalPrice, dob, gender } = req.body;
        const user = req.user._id;

        if (!req.file) {
            return res.status(400).json({ error: 'Please provide the image of Driving license' })
        }

         // Check if the user already has an active booking
        const activeBooking = await Booking.findOne({ user, isCancelled: false, isApproved: true });
        if (activeBooking) {
            return res.status(400).json({ message: 'User already has an active booking' });
        }

        // Checking for valid carId
        if (!mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(400).json({ message: 'Invalid car id provided' });
        }

        // Checking the price from frontend to backend
        const totalTripDays = Math.ceil((new Date(tripEndDate) - new Date(tripStartDate)) / (1000 * 60 * 60 * 24)) + 1;
        const car = await Car.findById(carId);
        console.log('Total Trip Days', totalTripDays);
        console.log('Price:', totalPrice);

        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        if (!car.isAvailable) {
            return res.status(400).json({ message: 'Either booked or not available' })
        }
        
        const actualCalculatedPrice = car.price * totalTripDays;

        const userPrice = Number(totalPrice).toFixed(2);
        const calculatedPrice = actualCalculatedPrice.toFixed(2);

        console.log('Fixed Price from User:', userPrice);
        console.log('Fixed Actual Calculated Price:', calculatedPrice);

        if (userPrice !== calculatedPrice) {
            return res.status(400).json({ priceMismatch: true, actualCalculatedPrice });
        }

        const booking = new Booking({
            user,
            tripStartDate,
            tripEndDate,
            location,
            dob,
            gender,
            image : req.file?.path,
            car: carId,
            totalPrice: actualCalculatedPrice,
           
        });
        if (!booking) return res.status(400).json({ error: 'Failed to book' });
        console.log(booking)
        await booking.save();

        // car.isAvailable = false;
        // await car.save();
        
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

        const activeBookingDetails = bookings.filter((booking) => !booking.isCancelled);
        const cancelledBookingDetails = bookings.filter((booking) => booking.isCancelled);

        res.status(200).json({ bookings, activeBookingDetails, cancelledBookingDetails});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

// for admin
export const allBookingCount = async (req, res) => {
    try {
        const totalBookingCount = await Booking.countDocuments();
        const totalCancelledBookingCount = await Booking.countDocuments({ isCancelled: true });
        const totalActiveBookingCount = await Booking.countDocuments({ isCancelled: false });

        if (!totalBookingCount || totalBookingCount.length == 0) {
            return res.status(400).json({ message: 'No booking yet or empty booking' });
        }

        res.status(200).json({ bookingCount : totalBookingCount, totalActiveBookingCount, totalCancelledBookingCount })
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
        const { reasonForCancellation } = req.body;

        if (!bookingId || !userId) return res.status(400).json({ error: 'Invalid ID' });

        const booking = await Booking.findOne({ _id: bookingId, user: userId });
            if (!booking || booking.isCancelled) {
                return res.status(400).json({ error: 'Booking not found or already cancelled' });
        }
        
        booking.status = 'cancelled';
        booking.cancellationReason = reasonForCancellation;
        booking.cancelledBy = 'user';

        // for refund calculation
        const refundAmount = booking.totalPrice; 
        booking.refundAmount = refundAmount;

        await booking.save();
        console.log("Cancelled", booking.isCancelled);

        const car = await Car.findById(booking.car) // from the booking car Id 
        if (car) {
            car.isAvailable = true;
            car.save();
        }

        res.status(200).json({ message: 'Booking Cancelled', booking, refundAmount  });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}

//for admin revenue amount
// export const totalRevenue = async (req, res) => {
//     try {
//         const bookings = await Booking.find({ isCancelled: false });
    
//         // const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
//           const totalRevenue = bookings.reduce((acc, booking) => {
//             if (!booking.isCancelled) {
//                 return acc + booking.totalPrice;
//             } else {
//                 return acc - booking.refundAmount;
//             }
//         }, 0);
//         console.log("Total Revenue Amount: ", totalRevenue);
//         console.log('Refunded amount', totalRevenue);
//         res.status(200).json({ totalRevenue });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ message: err.message });
//     }
// }

export const totalRevenue = async (req, res) => {
    try {
        const bookings = await Booking.find({});

        const totalRevenue = bookings.reduce((acc, booking) => {
            return booking.isCancelled ? acc - booking.refundAmount : acc + booking.totalPrice;
        }, 0);

        // console.log("Total Revenue Amount: ", totalRevenue);
        res.status(200).json({ totalRevenue });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}

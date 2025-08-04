import express from 'express';
import {
	allBookingCount,
	allBookingDetails,
	bookingCancellation,
	bookingDetails,
	checkAvailability,
	getAllAdminCancelledBookings,
	getAllCancelledBookings,
	singleUserBookingDetails,
	totalRevenue,
	userBookingCount,
} from '../controller/booking.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isAdmin, isUser } from '../middleware/authorize.middleware.js';
import { upload } from '../utils/fileUpload.js';
import { bookingRules, validationFunction } from '../validation/index.js';

const router = express.Router();

router.post('/car-booking', isAuthenticated, isUser, upload.single('image'), bookingRules, validationFunction, bookingDetails);

router.get('/car-booking/user', isAuthenticated, singleUserBookingDetails);
router.get('/car-booking/admin/all', isAuthenticated, isAdmin, allBookingDetails);

// booking cancellation
router.post('/car-booking/cancellation/:id', isAuthenticated, bookingCancellation);
router.get('/car-booking/get-all-cancelled-bookings', isAuthenticated, isAdmin, getAllCancelledBookings);
router.get('/car-booking/get-all-cancelled-bookings-by-admin', isAuthenticated, getAllAdminCancelledBookings);

// booking count
router.get('/car-booking/all-booking-count', isAuthenticated, isAdmin, allBookingCount);
router.get('/car-booking/user-booking-count', isAuthenticated, isUser, userBookingCount);

// for check availability of the same date
router.post('/car-booking/check-availability', isAuthenticated, checkAvailability);

// for total revenue
router.get('/car-booking/revenue', isAuthenticated, isAdmin, totalRevenue);

export default router;

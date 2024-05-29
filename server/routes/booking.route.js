import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isAdmin, isUser } from '../middleware/authorize.middleware.js';
import { allBookingDetails, bookingCancellation, bookingDetails, singleUserBookingDetails, allBookingCount, userBookingCount } from '../controller/booking.controller.js';
import { bookingRules, validationFunction } from '../validation/index.js';
const router = express.Router();

router.post('/car-booking', isAuthenticated, isUser, bookingRules, validationFunction, bookingDetails);

router.get('/car-booking/user/:id', isAuthenticated, isUser, singleUserBookingDetails);
router.get('/car-booking/admin/all', isAuthenticated, isAdmin, allBookingDetails);

router.delete('/car-booking/cancellation/:id', isAuthenticated, isUser, bookingCancellation);

router.get('/car-booking/all-booking-count', isAuthenticated, isAdmin, allBookingCount);
router.get('/car-booking/user-booking-count', isAuthenticated, isUser, userBookingCount );

export default router;  
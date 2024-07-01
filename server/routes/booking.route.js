import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isAdmin, isUser } from '../middleware/authorize.middleware.js';
import { allBookingDetails, bookingCancellation, bookingDetails, singleUserBookingDetails, allBookingCount, userBookingCount, totalRevenue } from '../controller/booking.controller.js';
import { bookingRules, validationFunction } from '../validation/index.js';
import { upload } from '../utils/fileUpload.js';
const router = express.Router();

router.post('/car-booking', isAuthenticated, isUser, upload.single('image'), bookingRules, validationFunction, bookingDetails);

router.get('/car-booking/user', isAuthenticated, singleUserBookingDetails);
router.get('/car-booking/admin/all', isAuthenticated, isAdmin, allBookingDetails);

router.post('/car-booking/cancellation/:id', isAuthenticated, isUser, bookingCancellation);

router.get('/car-booking/all-booking-count', isAuthenticated, isAdmin, allBookingCount);
router.get('/car-booking/user-booking-count', isAuthenticated, isUser, userBookingCount);

// for total revenue 
router.get('/car-booking/revenue', isAuthenticated, isAdmin, totalRevenue);

export default router;  
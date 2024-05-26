import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isAdmin, isUser } from '../middleware/authorize.middleware.js';
import { allBookingDetails, bookingCancellation, bookingDetails, singleUserBookingDetails } from '../controller/booking.controller.js';
import { bookingRules, validationFunction } from '../validation/index.js';
const router = express.Router();

router.post('/car-booking', isAuthenticated, isUser, bookingRules, validationFunction, bookingDetails);
router.get('/car-booking/user', isAuthenticated, singleUserBookingDetails);
router.get('/car-booking/admin/all', isAuthenticated, isAdmin, allBookingDetails);
router.delete('/car-booking/cancellation/:id', isAuthenticated, isUser, bookingCancellation);

export default router;  
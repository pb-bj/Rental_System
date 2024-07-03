import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/authorize.middleware.js';
import { cancelBookingByAdmin, confirmBookingApproval } from '../controller/admin.controller.js';

const router = express.Router();

router.post('/admin/booking-approval/:id', isAuthenticated, isAdmin, confirmBookingApproval);
router.patch('/admin/booking-cancellation/:id ', isAuthenticated, isAdmin, cancelBookingByAdmin);

export default router;
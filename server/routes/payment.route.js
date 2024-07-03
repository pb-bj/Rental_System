import express from 'express';
import { createPayment } from '../controller/payment.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isUser } from '../middleware/authorize.middleware.js';

const router = express.Router();

router.post('/payment-process', isAuthenticated, isUser, createPayment);
export default router;
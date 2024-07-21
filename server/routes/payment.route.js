import express from 'express';
import { createPayment, getUserPaymentDetail } from '../controller/payment.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isUser } from '../middleware/authorize.middleware.js';
import { paymentRules, validationFunction } from '../validation/index.js';

const router = express.Router();

router.post('/payment-process', isAuthenticated, isUser, paymentRules, validationFunction, createPayment);
router.get('/user-payment-detail/:id', isAuthenticated, isUser, getUserPaymentDetail);
export default router;
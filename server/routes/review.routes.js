import express from 'express';
import { createReview, getReviews } from '../controller/review.controller.js';
import { isAuthenticated  } from '../middleware/auth.middleware.js';
import { isUser } from '../middleware/authorize.middleware.js';
const router = express.Router();

router.post('/reviews', isAuthenticated, isUser, createReview);
router.get('/reviews/:carId', isAuthenticated, isUser, getReviews);

export default router;

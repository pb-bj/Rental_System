import { Router } from 'express';
import { userDetails } from '../controller/userInfo.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/user-info/:id', isAuthenticated, userDetails);

export default router;
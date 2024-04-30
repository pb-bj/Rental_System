import { Router } from 'express';
import { userDetails, loggedCustomerCount } from '../controller/userInfo.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/authorize.middleware.js';

const router = Router();

router.get('/user-info/:id', isAuthenticated, userDetails);
router.get('/user-count', isAuthenticated, isAdmin, loggedCustomerCount);

export default router;
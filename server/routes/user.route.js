import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controller/user.controller.js';
import { validationFunction, registerRules, loginRules } from '../validation/index.js';

const router = Router();

router.post('/register', registerRules, validationFunction, registerUser);
router.post('/login', loginRules, validationFunction, loginUser);
router.post('/logout', logoutUser);

export default router;
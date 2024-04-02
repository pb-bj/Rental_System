import { Router } from 'express';
import { registerUser, loginUser } from '../controller/user.controller.js';
import { validationFunction, registerRules, loginRules } from '../validation/index.js';

const router = Router();

router.post('/register', registerRules, validationFunction, registerUser);
router.post('/login', loginRules, validationFunction, loginUser);

export default router;
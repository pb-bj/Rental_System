const router = require('express').Router();
const { registerUser, loginUser } = require('../controller/authController');
const { validationFunction, registerRules, loginRules } = require('../validation');

router.post('/register', registerRules , validationFunction, registerUser);
router.post('/login',  loginRules , validationFunction, loginUser);

module.exports = router;
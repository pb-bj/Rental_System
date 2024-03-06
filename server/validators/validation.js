const { body } = require('express-validator');

exports.registrationRules = [
    body('fullname').notEmpty().withMessage('Fullname is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone').notEmpty().withMessage('Phone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

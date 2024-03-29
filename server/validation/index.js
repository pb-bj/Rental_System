const { validationResult, check } = require('express-validator');

exports.carRules = [
  check('brand', ).notEmpty().withMessage('Brand is required'),
  check('model').notEmpty().withMessage('Model is required'),
  check('plateNo').notEmpty().withMessage('Plate number is required'),
  check('seats').notEmpty().withMessage('Number of seats is required').isNumeric().withMessage('Seats must be a number'),
  check('carTypes').notEmpty().withMessage('Car type is required'),
  check('mileage').notEmpty().withMessage('Mileage is required').isNumeric().withMessage('Mileage must be a number'),
  check('features').notEmpty().withMessage('Features is required'),
  check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
];

exports.registerRules = [
  check('fullname').trim().isLength({ min: 1 }).withMessage('Full name is required.').escape(),
  check('email').isEmail().withMessage('Please provide a valid email address.'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.').matches(/\d/).withMessage('Password must contain a number.'),
];

exports.loginRules = [
  check('email').isEmail().withMessage('Please provide a valid email address.'),
  check('password').exists().withMessage('Password is required.')
];



exports.validationFunction = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        next()
    }
    else {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
};

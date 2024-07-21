import { validationResult, check } from 'express-validator';

export const carRules = [
  check('brand',).notEmpty().withMessage('Brand is required'),
  check('model').notEmpty().withMessage('Model is required'),
  check('plateNo').notEmpty().withMessage('Plate number is required'),
  check('seats').notEmpty().withMessage('Number of seats is required').isNumeric().withMessage('Seats must be a number'),
  check('carTypes').notEmpty().withMessage('Car type is required'),
  check('mileage').notEmpty().withMessage('Mileage is required').isNumeric().withMessage('Mileage must be a number'),
  check('features').notEmpty().withMessage('Features is required'),
  check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
];

export const registerRules = [
  check('fullname').notEmpty().withMessage('Full name is required.').escape(),
  check('email').isEmail().withMessage('Please provide a valid email address.'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.').matches(/\d/).withMessage('Password must contain a number.'),
];

export const loginRules = [
  check('email').isEmail().withMessage('Please provide a valid email address.'),
  check('password').exists().withMessage('Password is required.')
];

export const bookingRules = [
  check('bookingDate')
    .optional({ nullable: true })
    .isISO8601()
    .withMessage('Booking date must be a valid date in ISO 8601 format')
    .toDate(),

  check('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Invalid date format. Date of birth must be in ISO 8601 format (YYYY-MM-DD)'),
  
   check('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['male', 'female']).withMessage('Invalid gender. Must be one of: male or female'),

  check('tripStartDate')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Trip start date is required')
    .isISO8601()
    .withMessage('Trip start date must be a valid date in ISO 8601 format')
    .toDate(),

  check('tripEndDate')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Trip end date is required')
    .isISO8601()
    .withMessage('Trip end date must be a valid date in ISO 8601 format')
    .toDate(),

  check('totalPrice')
    .optional({ nullable: true })
    .isNumeric()
    .withMessage('Total price must be a number'),

  check('location')
    .optional({ nullable: true })
    .isString()
    .withMessage('Location must be a string'),

  check('cancellationReason')
    .optional({ nullable: true })
    .isString()
    .withMessage('Cancellation reason must be a string')
];

export const paymentRules = [
  check('amount')
    .notEmpty().withMessage('Amount is required.')
    .isNumeric().withMessage('Amount must be a number.')
    .isFloat({ min: 0.01 }).withMessage('Amount must be greater than zero.')
];

export const validationFunction = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  }
  else {
    return res.status(400).json({ error: errors.array()[0].msg })
  }
};

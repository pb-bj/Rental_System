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
  
   check('license')
    .matches(/^\d{2}-\d{2}-\d{8}$/)
    .withMessage('License must be in the format xx-xx-xxxxxxxx and contain only numbers and hyphens.'),
   
  check('address')
    .exists({ checkNull: true })
    .withMessage('Address is required')
    .isString()
    .withMessage('Address must be a string'),
  
  check('tripStartDate')
    .isISO8601()
    .withMessage('tripStartDate must be a valid date in ISO 8601 format.')
    .toDate(),

  check('tripEndDate')
    .isISO8601()
    .withMessage('tripEndDate must be a valid date in ISO 8601 format.')
    .toDate(), 
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

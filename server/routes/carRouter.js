const express = require('express');
const router = express.Router();

const { createNewCarDetails, getAllCars } = require('../controller/carController');

router.post('/create-car', createNewCarDetails);
router.get('/get-all-cars', getAllCars);

module.exports = router;

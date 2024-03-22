const express = require('express');
const router = express.Router();

// const { createNewCarDetails, getAllCars, updateCarDetails, deleteCarDetails/, getSingleCarDetail } = require('../controller/carController');
const { createNewCarDetails, getAllCars, updateCarDetails, deleteCarDetails, getSingleCarDetail } = require('../controller/carController');
const upload = require('../utils/fileUpload');
const { validationFunction, carRules } = require('../validation');

router.post('/create-car', upload.single('image'), carRules, validationFunction ,createNewCarDetails);
router.get('/get-all-cars', getAllCars);
router.get('/get-car/:id', getSingleCarDetail);
router.put('/update-car/:id', upload.single('image'), updateCarDetails);
router.delete('/delete-car/:id', deleteCarDetails);

module.exports = router;

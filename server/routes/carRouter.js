const express = require('express');
const router = express.Router();

const { createNewCarDetails, getAllCars } = require('../controller/carController');
const upload = require('../utils/fileUpload');

router.post('/create-car', upload.single('image'), createNewCarDetails);
router.get('/get-all-cars', getAllCars);

module.exports = router;

import express from 'express';
import { createNewCarDetails, getAllCars, updateCarDetails, deleteCarDetails, getSingleCarDetail } from '../controller/car.controller.js';
import { upload } from '../utils/fileUpload.js';
import { validationFunction, carRules } from '../validation/index.js';
// import { isAuthenticated } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/create-car', upload.single('image'), carRules, validationFunction, createNewCarDetails);
router.get('/get-all-cars', getAllCars);
router.get('/get-car/:id', getSingleCarDetail);
router.put('/update-car/:id', upload.single('image'), updateCarDetails);
router.delete('/delete-car/:id', deleteCarDetails);

export default router;

import { Review } from '../models/review.model.js';
import { Car } from '../models/car.model.js';

export const createReview = async (req, res) => {
    try {
        const { carId, rating, comment } = req.body;
        const userId = req.user._id;

        // Check if the car exists
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const review = new Review({
            user: userId,
            car: carId,
            rating,
            comment
        });

        await review.save();

        res.status(201).json({ message: 'Review added successfully', review });
    } catch (error) {
        console.error('Error adding review', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getReviews = async (req, res) => {
    try {
        const carId = req.params.carId;

        const reviews = await Review.find({ car: carId }).populate('user', 'fullname');

        res.status(200).json({ reviews });
    } catch (error) {
        console.error('Error fetching reviews', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

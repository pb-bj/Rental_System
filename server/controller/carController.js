const Car = require('../models/carSchema');

exports.createNewCarDetails = async (req, res) => {
    try {
        const { brand, model, plateNo, seats, carTypes, mileage, features, price, image } = req.body;

        if (!brand || !model || !plateNo || !seats || !carTypes || !mileage || !features || !price || !image) {
            return res.status(400).json({ error: "Missing required fields in the request body" });
        }

        const newCar = new Car({
            brand: brand,
            model: model,
            plateNo: plateNo,
            seats: seats,
            carTypes: carTypes,
            mileage: mileage,
            features: features,
            price: price,
            image: image, 
        });

        const savedCar = await newCar.save();
        res.status(201).json({ success : "Car detail created ", data : savedCar });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: "Failed to create new car", message : error.message });
    }
};


exports.getAllCars = async (req, res) => {
    try {
        const result = await Car.find();
            res.status(200).json({ success : "fetched all cars successfull ", data : result });
    } catch(err) {
        console.error(error.stack)
        res.status(500).json({ error : "Failed to get cars", message : error.message});
    }
}
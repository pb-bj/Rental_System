import { Car } from "../models/car.model.js";

export const createNewCarDetails = async (req, res) => {
    console.log(req.file)
    try {
        const { brand, model, plateNo, seats, carTypes, mileage, features, price } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: 'Please provide the image of car' })
        }

        // check for exisitng cars
        let exisitngCars = await Car.findOne({ plateNo });
        if (exisitngCars) {
            return res.status(400).json({ error: 'Car Already Exist' });
        }

        // creating a new cars
        let addNewCars = await Car.create({
            brand,
            model,
            plateNo,
            seats,
            carTypes,
            mileage,
            features,
            price,
            image: req.file?.path
        });
        if (!addNewCars) {
            return res.status(400).json({ error: 'Failed to add new car details' })
        }
        res.status(201).json({ message: 'New car added Successfully', data: addNewCars });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// read 
export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        if (!cars) {
            return res.status(400).json({ error: 'Something went wrong' });
        }
        res.send(cars);
    } catch (error) {
        res.status(500).json({ error: "Failed to get cars", message: error.message });
    }
}

// update
export const updateCarDetails = async (req, res) => {
    try {
        const { brand, model, plateNo, seats, carTypes, mileage, features, price } = req.body;
        let updateCars = await Car.findByIdAndUpdate(req.params.id, {
            brand,
            model,
            plateNo,
            seats,
            carTypes,
            mileage,
            features,
            price
        }, { new: true });

        if (req.file) {
            updateCars.image = req.file.path;
            await updateCars.save();
        }

        if (!updateCars) {
            return res.status(400).json({ error: 'Failed to update car details' });
        }
        res.json({ message: 'Updated Successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// delete
export const deleteCarDetails = async (req, res) => {
    try {
        let deleteCarDetails = await Car.findByIdAndDelete(req.params.id);
        if (!deleteCarDetails) {
            res.status(400).json({ error: 'Failed to delete car details' })
        } else {
            res.send({ message: 'Car details deleted successfully' })
        }
    } catch (error) {
        res.status(500).json({ errror: 'Internal Server Error' });
    }
}

// single vehicle
export const getSingleCarDetail = async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(400).json({ error: 'Failed to provide car detail' });
        }
        res.send(car)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

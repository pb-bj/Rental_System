const CarModel = require('../models/CarModel');

exports.createNewCarDetails = async (req, res) => {
    console.log(req.file)
    try {
        const { brand, model, plateNo, seats, carTypes, mileage, features, price } = req.body;
        if( !req.file ) {
            return res.status(400).json({ error : 'Please provide the image of car' })
        }

        // check for exisitng cars
        let exisitngCars = await CarModel.findOne({ plateNo });
            if(exisitngCars) {
                return res.status(400).json({ error : 'Car Already Exist' });
            }

        // creating a new cars
        let addNewCars = await CarModel.create({
            brand,
            model,
            plateNo,
            seats,
            carTypes,
            mileage,
            features,
            price,
            image : req.file?.path
        });
        if(!addNewCars) {
            return res.status(400).json({ error : 'Failed to add new car details' })
        }
        res.status(201).json({ message : 'New car added Successfully', data : addNewCars });
    } catch (error) {
        res.status(500).json({ error : 'Internal Server Error' });
    }
};

// read 
exports.getAllCars = async (req, res) => {
    try {
        const cars= await CarModel.find();
            if(!cars) {
                return res.status(400).json({ error : 'Something went wrong' });
            }  
            res.send(cars);
    } catch(error) {
        res.status(500).json({ error : "Failed to get cars", message : error.message});
    }
}

// update
exports.updateCarDetails = async (req, res) => {
    try {
        let updateCars = await CarModel.findByIdAndUpdate( req.params.id, req.body);

        if(!updateCars) {
            return res.status(404).json({ error : 'Failed to update car details' });
        } 
        res.send(updateCars)
    } catch(error) {
        res.status(400).json({ error : 'Internal Server Error' });
    }
};

// delete
exports.deleteCarDetails = async (req, res) => {
    try {
        let deleteCarDetails = await CarModel.findByIdAndDelete(req.params.id);
            if(!deleteCarDetails) {
                res.status(400).json({ error : 'Failed to delete car details' })
            } else {
                res.send({ message : 'Car details deleted successfully' })
            }
    } catch(error) {
        res.status(500).json({ errror : 'Internal Server Error' });
    }
}

// single vehicle
exports.getSingleCarDetail = async (req, res) => {
    try {
        let car = await CarModel.findById( req.params.id );
            if(!car) {
                return res.status(400).json({ error : 'Failed to provide car detail' });
            }   
            res.send(car)
    } catch (error) {
        res.status(500).json({ error : 'Internal Server Error' });
    }
}

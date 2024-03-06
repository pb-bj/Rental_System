const mongoose = require('mongoose');

const carsSchema = new mongoose.Schema({

})

const Cars = mongoose.model("Cars", carsSchema);
module.exports = Cars;
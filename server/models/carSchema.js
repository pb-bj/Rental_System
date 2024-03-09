const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  plateNo: {
    type: String,
    required: true,
    unique: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  carTypes: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  features: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

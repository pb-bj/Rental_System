import mongoose from "mongoose";

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
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  isAvailable : { type: Boolean, default: true }
}, { timestamps: true });

export const Car = mongoose.model('Car', carSchema);

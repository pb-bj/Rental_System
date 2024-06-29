import mongoose from "mongoose";
import { Car } from "./car.model.js";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    bookingDate: { type: Date, default: Date.now },
    license: { type: String, required: true, unique: true },
    dob: { type: Date, required: true }, 
    gender: { type: String, enum: ['male', 'female'], required: true },
    tripStartDate: { type: Date, required: true },
    tripEndDate: { type: Date, required: true },
    totalTripDays: { type: Number },
    totalPrice: { type: Number },
    location: { type: String },
    isCancelled: { type: Boolean, default: false },
    cancellationReason: { type: String }
}, { timestamps: true });

bookingSchema.pre('save', async function (next) {
  try {

    if (this.isCancelled && !this.isCancelled) {
      return next(new Error('Cancel reason is required'));
    }

    if (!this.isCancelled) {
      const totalTripDays = Math.ceil((this.tripEndDate - this.tripStartDate) / (1000 * 60 * 60 * 24)) + 1;
      const car = await Car.findById(this.car);
  
      if (!car) {
        console.error('Car not found');
        return next(new Error('Car not found'));
      }
  
      this.totalPrice = car.price * totalTripDays;
      this.totalTripDays = totalTripDays;
      
    }
    next();
  } catch (err) {
    next(err);
  }
});

export const Booking = mongoose.model('Booking', bookingSchema);

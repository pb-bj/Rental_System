import mongoose from "mongoose";
import { Car } from "./car.model.js";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    bookingDate: { type: Date, default: Date.now },
    dob: { type: Date, required: true }, 
    gender: { type: String, enum: ['male', 'female'], required: true },
    tripStartDate: { type: Date, required: true },
    tripEndDate: { type: Date, required: true },
    totalTripDays: { type: Number },
    totalPrice: { type: Number },
    location: { type: String },
    image: { type : String },
    isCancelled: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' },
    cancellationReason: { type: String },
    cancelledBy: { type: String, enum: ['admin', 'user'], default: null },
    isPaid : { type : Boolean, default: false },
    refundAmount: { type: Number, default: 0 },
    payment : { type: mongoose.Schema.Types.ObjectId, ref: 'Payment'}
}, { timestamps: true });

bookingSchema.pre('save', async function (next) {
  try {

     if (this.isModified('status') && this.status === 'cancelled' && !this.cancellationReason) {
            return next(new Error('Cancel reason is required'));
        }

    if (this.status !== 'cancelled') {
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

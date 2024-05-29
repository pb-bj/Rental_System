import mongoose from "mongoose";
import { Car } from "./car.model.js";

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }],
    bookingDate : { type: Date, default: Date.now },
    license: { type: String, required: true },
    address: { type: String, required: true },
    tripStartDate: { type: Date, required: true },
    tripEndDate: { type: Date, required: true },
    totalDays: { type: Number },
    totalPrice: { type: Number },
    isCancelled : { type: Boolean, default: false }
}, { timestamps: true });

bookingSchema.pre('save', async function (next) {
  try {
    const totalTripDays = Math.ceil((this.tripEndDate - this.tripStartDate) / (1000 * 60 * 60 * 24));
    console.log('Total Days:', totalTripDays);
    let totalPrice = 0;

    const carPromises = this.cars.map(async (carId) => {
      const car = await Car.findById(carId);
      console.log('Car:', car);
      if (!car) {
        console.error('Car not found');
        return next(new Error('Car not found'));
      }
      return car.price * totalTripDays;
    });

    // Wait for all car prices to be fetched asynchronously
    const carPrices = await Promise.all(carPromises);

    // Calculate total price after all car prices are fetched
    totalPrice = carPrices.reduce((acc, price) => acc + price, 0);

    console.log('Total price:', totalPrice);
    this.totalPrice = totalPrice;
    this.totalDays = totalDays;
    next();
  } catch (err) {
    next(err);
  }
});
export const Booking = mongoose.model('Booking', bookingSchema);
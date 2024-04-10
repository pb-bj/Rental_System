import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    phone: {
        type: Number,
        unique: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    license: {
        type: Number,
        required: true
    },
    tripStartDate: {
        type: Date,
        required: true
    },
    tripEndDate: {
        type: Date,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['eSewa', 'Khalti', 'FonePay'],
        require: true
    },
    m
});

export const Booking = mongoose.model('Booking', bookingSchema);
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected");
})
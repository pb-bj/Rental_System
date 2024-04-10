import mongoose from "mongoose";

// console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connected");
}).catch((err) => console.log(err));
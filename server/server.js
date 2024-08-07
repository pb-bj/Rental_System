import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import './database/connection.js';
import cookieParser from 'cookie-parser';
import carRoute from './routes/car.route.js';
import usersRoute from './routes/user.route.js';
import refreshRoute from './routes/refreshToken.route.js';
import userInfoRoute from './routes/userInfo.route.js';
import bookingRoute from './routes/booking.route.js';
import paymentRoute from './routes/payment.route.js';
import adminRoute from './routes/admin.route.js';

const port = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routers
app.use("/api/auth", usersRoute);
app.use('/api', refreshRoute);
app.use("/api", carRoute);
app.use("/api", userInfoRoute);
app.use("/api", bookingRoute);
app.use("/api", paymentRoute);
app.use("/api", adminRoute);

app.use('/public/uploads', express.static('public/uploads'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
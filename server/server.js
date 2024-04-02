import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import './database/connection.js';
import cookieParser from 'cookie-parser';
import carRoute from './routes/car.route.js';
import usersRoute from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// routers
app.use("/api/auth", usersRoute);
app.use("/api", carRoute);
app.use('/public/uploads', express.static('public/uploads'))


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
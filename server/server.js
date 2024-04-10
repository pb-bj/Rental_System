import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import './database/connection.js';
import cookieParser from 'cookie-parser';
import carRoute from './routes/car.route.js';
import usersRoute from './routes/user.route.js';
import refreshRoute from './routes/refreshToken.route.js';

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
app.use('/public/uploads', express.static('public/uploads'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
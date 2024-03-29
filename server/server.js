const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./database/connection');

const port = process.env.PORT;
const usersRoute = require('./routes/usersRoute');
const carRouter = require('./routes/carRouter');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// routers
app.use("/api/auth", usersRoute);
app.use("/api", carRouter);
app.use('/public/uploads', express.static('public/uploads'))



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
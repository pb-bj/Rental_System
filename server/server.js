const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
require('./database/connection');

const port = process.env.PORT;
const usersRoute = require('./routes/usersRoute');

// middlewares
app.use(bodyParser.json());
app.use(cors())

// routers
app.use("/auth", usersRoute);

app.get('/api', (req, res) => {
    res.send("This is the demo");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
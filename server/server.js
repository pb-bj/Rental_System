const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/api', (req, res) => {
    res.send("This is the demo");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

app.use(express.json());

app.use(cors());
app.use('/', require('./routes/add'));
app.use('/', require('./routes/update'));
app.use('/', require('./routes/delete'));
app.use('/', require('./routes/read'));

mongoose.connect(
    process.env.CONNECT,
    () => console.log("db connected")
)

app.listen(process.env.PORT, () => console.log("server is up!"))
/*
Server.js = the Express js file that links this project to the dabatase




*/
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;

mongoose.connect(uri);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})


//TODO: to add once u have more routes 
const userRouter = require('./routes/user')
const driveDetailsRouter = require('./routes/driverdetails')
const driveRouter = require('./routes/driveRoute')
const rideRouter = require('./routes/ride')

//TODO: add accordingly based on the router variable u declared
app.use('/user', userRouter);
app.use('/driverdetails', driveDetailsRouter);
app.use('/drive', driveRouter);
app.use('/ride', rideRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



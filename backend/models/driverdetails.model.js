const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for users db
const driverSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    nric:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    dateoflicense:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    yearsofdriving:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const DriverDetails = mongoose.model('driverdetails', driverSchema);

module.exports = DriverDetails;
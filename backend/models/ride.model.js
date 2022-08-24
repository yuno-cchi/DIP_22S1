const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for users db
const rideSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    from:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    destination:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    numpassengers:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    price:{
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Rider = mongoose.model('ride', rideSchema);

module.exports = Rider;
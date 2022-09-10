const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for users db
const rideSchema = new Schema({
    routename:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    start:{
        type: Object,
        required: true,
        unique: false,
        trim: true,
        latitude: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 3
        },
        longitude: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 3
        },
    },
    destination:{
        type: Object,
        required: true,
        unique: false,
        trim: true,
        latitude: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 3
        },
        longitude: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 3
        },
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
    },
    stopPoint:{
        type: Object,
        required: true,
        unique: false,
        trim: true,
        latitude: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 3
        },
        longitude: {
            type: String,
            required: true,
            unique: false,
            trim: true,
            minlength: 3
        },
    },
}, {
    timestamps: true,
});

const Rider = mongoose.model('ride', rideSchema);

module.exports = Rider;
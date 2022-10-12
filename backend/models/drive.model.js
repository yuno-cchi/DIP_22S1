const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for users db
const driveSchema = new Schema({
    routeUserID:{ //to store userID/username from session inside
        type: String,
        unique: false,
        trim: true
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
            trim: true
        },
        longitude: {
            type: String,
            required: true,
            unique: false,
            trim: true
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
            trim: true
        },
        longitude: {
            type: String,
            required: true,
            unique: false,
            trim: true
        },
    },
    date:{
        type: String,
        unique: false,
        trim: true
    },
    price:{
        type: String,
        unique: false,
        trim: true
    },
    centroid:{
        type: Object,
        unique: false,
        trim: true,
        latitude: {
            type: String,
            unique: false,
            trim: true
        },
        longitude: {
            type: String,
            unique: false,
            trim: true
        },
    },
    selected: {
        type: Boolean,
        unique: false,
        trim: true
    },
    routeIdPair: [{
        type: String,
        unique: false,
        trim: true,
    }]
}, {
    timestamps: true,
});

const Drive = mongoose.model('drives', driveSchema);

module.exports = Drive;
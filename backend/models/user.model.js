const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//for users db
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true, //only username cannot be duplicate
        trim: true,
        minlength: 3
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
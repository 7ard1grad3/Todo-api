const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('Users',{
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validator: (value) => {
            return validator.isEmail(value);
        },
        message: '{VALUE} is not a valid email'
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
});
module.exports = {User};
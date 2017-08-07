const mongoose = require('mongoose');
const validator = require('validator');
const User = mongoose.model('Users',{
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: function(email) {
                return validator.isEmail(email);
            },
            message: '({VALUE}) is not a valid email format!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
});
module.exports = {User};
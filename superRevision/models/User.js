
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [1, 'Length of username must be greater than 1'],
        maxLength: [12, 'Length of username must be smaller than 12'],
        unique: true,
        required: [true, 'Username is must']
    },
    fullName: {
        type: String,
        minLength: [2, 'Length of full Name must be greater than 2'],
        maxLength: [12, 'Length of full name must be smaller than 12'],
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = new mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

// schema 

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    rating: {
        type: Number,
        min: [0, 'Cannot be smaller than 0'],
        max: [10, 'Cannot be greater than 10']
    }
    ,
    review: {
        type: String
    }
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema);
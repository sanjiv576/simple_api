
const mongoose = require('mongoose');

// create Schema  --> build strcture to store data
const bookSchema = new mongoose.Schema({

    title : {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    }
}, {timestamps: true});  // timestamps --> track when the book is added/updated

// we use model to use database not by Schema
module.exports = mongoose.model('Book', bookSchema);

 // Book --> is collection in Singular but, Mongdb makes plural


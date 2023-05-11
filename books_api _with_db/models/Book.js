
const mongoose = require('mongoose');
const books = require('../data/books');

// Schema for review
const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLength: 10
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,  // here, Object id is taken of user Schema
        ref: 'User'  // here, model is used
    }
});

// conversion of Object type of _id of DB into String type

reviewSchema.set('toJSON', {
    transform: (document, returnedDocument) => {

        // convert object of _id into String type
        returnedDocument.id = document._id.toString();

        // delete unncecessary _id and version from the returned document but these do not delete from database
        delete returnedDocument._id;
        delete returnedDocument.__v;

    }
});

// create Schema  --> build strcture to store data
const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    }, 
    reviews: [reviewSchema],
    coverPhoto: {
        type: String
    }
}, { timestamps: true });  // timestamps --> track when the book is added/updated


// conversion of Object type of _id of DB into String type
bookSchema.set('toJSON', {
    transform: (document, returnedDocument) => {

        // convert object of db into String
        returnedDocument.id = document._id.toString()

        // delete unncecessary _id and version from the returned document but these do not delete from database
        delete returnedDocument._id;
        delete returnedDocument.__v;
    }
});

// we use model to use database not by Schema
module.exports = mongoose.model('Book', bookSchema);

 // Book --> is collection in Singular but, Mongdb makes plural


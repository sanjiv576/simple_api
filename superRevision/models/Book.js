

const mongoose = require('mongoose');

// schema of Review
const review = require('./Review');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        required: true

    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    reviews: [review.reviewSchema]
}, { timestamps: true });

// conversion of Object type of _id of DB into String type
// bookSchema.set('toJSON', {
//     transform: (document, returnedDocument) => {

//         // convert object of db into String
//         returnedDocument.id = document._id.toString()

//         // delete unncecessary _id and version from the returned document but these do not delete from database
//         delete returnedDocument._id;
//         delete returnedDocument.__v;
//     }
// });

module.exports = mongoose.model('Book', bookSchema);
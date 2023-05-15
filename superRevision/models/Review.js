
const mongoose = require('mongoose');
const { userSchema, User } = require('../models/User');

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

// convert Object data type of id into String data type
reviewSchema.set('toJSON', {
    transform: (document, returnDocument) => {
        returnDocument.id = document._id.toString();
        // remove _id and version from return doc not from db
        delete returnDocument._id;
        delete returnDocument.__v;
    }
});
const Review = new mongoose.model('Review', reviewSchema);
module.exports = {
    reviewSchema,
    Review
};
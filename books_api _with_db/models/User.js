
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        minLength: 6,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// convert Object id to String id and also delete password while returning user data
userSchema.set('toJSON',{
    transform: (document, returnedDocument) => {
        // convert object id to String id
        returnedDocument.id = document._id.toString(),

        // delete unnecessary _id and version
        delete returnedDocument._id;
        delete returnedDocument.__v;

        // delete hashed password from the return document not from db
        delete returnedDocument.password;
    }
});

module.exports = new mongoose.model('User', userSchema);
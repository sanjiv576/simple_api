
const express = require('express');

const router = express.Router();

// import db of User
const User = require('../models/User');

// import bcrypt for hashing password
const bcrypt = require('bcryptjs');


router.post('/register', (req, res, next) => {

    // NOte: key should be match with key of the model
    const { username, password, fullName, email } = req.body;

    User.findOne({ username: username })  // second username is above one

        .then(user => {
            // console.log(user);

            // if user === null ==> which means user is already registered with that username
            if (user) return res.status(400).json({ error: "Duplicate username" });

            // now hash the password using bcryptjs library 
            bcrypt.hash(password, 10, (err, hashPassword) => {
                // handle the error, if the error is found
                if (err) return res.status(500).json({ error: err.message });

                // verify email if you need here

                // create the user account
                User.create({ username, password: hashPassword, fullName, email }) // here, hashPassword is supplied in password key
                    .then(user => res.status(201).json(user))
                    .catch(next);
            })
        })
        .catch(next);
})

module.exports = router;

const express = require('express');

const router = express.Router();

// import db of User
const User = require('../models/User');

var userUserId ;

// import bcrypt for hashing password
const bcrypt = require('bcryptjs');

// import jsonwebtoken for token generation
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');
const { verifyUser } = require('../middlewares/auth');


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
});



// for login

router.post('/login', (req, res, next) => {

    // find user by username
    User.findOne({ username: req.body.username })
        .then(user => {

            // if the user is not found or not registered
            if (!user) return res.status(400).json({ error: 'User is not found/registered.' });

            // convert the plain text password into hashed password and compare with stored hash password in the db
            bcrypt.compare(req.body.password, user.password, (err, success) => {

                // if the it is not possible internally
                if (err) return res.status(500).json({ error: err.message });

                // check if the given password is not matching
                if (!success) return res.status(400).json({ error: 'Password does not match.' });


                // now, issue token and verify the token

                // payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    fullName: user.fullName,
                    role: user.role
                }
                console.log(`User id : ${payload.id}`);
                req.id = payload.id;
                // store id for further use to fetch data of that user
                userUserId = payload.id;
                // generate/issue the token with parameters i.e payload, secret message
                jwt.sign(payload,
                    process.env.SECRET,
                    { expiresIn: '60d' },
                    (err, token) => {
                        if (err) return res.status(500).json({ error: err.message });

                        // send the token or anything if the token is generated successfully
                        res.json({ status: 'success', token: token, message: 'Go to Dashboard' });
                    });
            });

        })
        .catch(next);
});

router.get('/reviewAllBooks', (req, res, next) => {

    // aim --> to find the all reviews in those books the user gave
    Book.find()
        .then(books => {
          
            // console.log(`Again user id is ${req.id}`);
            console.log(`Again again user id is ${userUserId}`);

            let userAllReviews = [];
            books.map(book => {
                if (book.reviews != null) {
                    book.reviews.map(manyIds => {
                        if (manyIds != null) {
                            //    console.log(manyIds.user);
                            if (manyIds.user == userUserId) {
                                userAllReviews.push(manyIds.text);
                            }

                        }
                    })
                }
            })
            res.json(userAllReviews);

            // res.end();


        })
        .catch(err => next(err));

});

module.exports = router;
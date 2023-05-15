const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.route('/register')
    .get((req, res, next) => {
       User.find()
       .then(users => res.json(users))
       .catch(next);
    })

    .post((req, res, next) => {
        const { fullName, email, username, password } = req.body;
        // find duplication
        User.findOne({ username: username })
            .then(user => {

                // if exist which means there is already username
                if (user) return res.status(400).json({ error: `Already taken ${username} username` });

                // hash the passowrd
                bcrypt.hash(password, 10, (err, hashedPassword) => {
                    if (err) return res.status(500).json({ error: err.message });

                    // create the account in hashed password
                    User.create({
                        username,
                        email,
                        fullName,
                        password: hashedPassword
                    })
                    .then(user => res.status(201).json(user))
                    .catch(next);
                })
            })
            .catch(err => next(err));
    })

module.exports = router
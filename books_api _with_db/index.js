require('dotenv').config();

// import express library
const express = require('express');

// import different routes
const books_routes = require('./routes/book_routes');

// import user routes

const user_routes = require('./routes/user_routes');

// import custom middleware  --> use this where it is required
const { verifyUser } = require('./middlewares/auth');

// import mongoose database
const mongoose = require('mongoose');
const dbName = '30-b-books'


const port = process.env.PORT;
// connect database
mongoose.connect('mongodb://127.0.0.1:27017/' + dbName)
    .then(() => console.log('Connected successfully to the monogodb database server'))
    .catch((err) => console.log(err));

// create object of express 
const app = express();


// get data from client side
// express.json() --> a middleware --> decode the data come from the browsers and store in req.body
app.use(express.json());

// user request
app.get('/', (req, res) => {
    // console.log(req);
    res.send('<h1>Hello world</h1>');
});

// main routes for users
app.use('/users', user_routes);

// use custom middleware to restrict access only for the books but not users --> for security
// app.use(verifyUser);  // ----> call this middleware even below statements execute e.g unknown path

// to use data come from client and send it to the routes/book_routes.js
app.use('/books', verifyUser, books_routes);  // --> use 'verifUser' middleware for only this 



// Error handling middleware --> takes 4 parameters i.e error, request, response, next
app.use((err, req, res, next) => {
    console.error(err);
    // if invalid data are given
    if (err.name === 'ValidationError') res.status(400);
    // if id is wrong
    else if (err.name === 'CastError') res.status(400);

    console.log(err.message);
    res.json({ error: err.message });
});

// unkown path if the user gives
app.use((req, res) => {
    res.status(404).json({ error: "Path Not Found" });
});

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});

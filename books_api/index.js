require('dotenv').config();

// import express library
const express = require('express');

// import different routes
const books_routes = require('./routes/book_routes');

// import mongoose database
const mongoose = require('mongoose');
const dbName = '30-a-books'


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

// to use data come from client and send it to the routes/book_routes.js
app.use('/books', books_routes);

const port = process.env.PORT;
// connect database
mongoose.connect('mongodb://127.0.0.1:27017/' + dbName)
    .then(() => console.log('Connected successfully to the monogodb database server'))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
});
 
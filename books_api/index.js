require('dotenv').config();

// import express library
const express = require('express');

// import different routes
const books_routes = require('./routes/book_routes');

// create object of express 
const app = express();

// get data from client side
// express.json() --> a middleware --> decode the data come from the browsers and store in req.body
app.use(express.json());

// user request
app.get('/', (req, res)=>{
    // console.log(req);
    res.send('<h1>Hello world</h1>');
});

// to use data come from client and send it to the routes/book_routes.js
app.use('/api/books/', books_routes);

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`Server is running on ${port} port`);
});
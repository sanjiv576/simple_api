require('dotenv').config;
const express = require('express');
const app = express();
const book_routes = require('./routes/book _routes');
const user_routes = require('./routes/user_routes');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const secretMessage = process.env.SECRET;
const dbName = process.env.DBNAME;
const dbPassword = process.env.DBPASSWORD;


// middleware
app.use(express.json());

// 
// const dbUri = 'mongodb+srv://shresthasanjiv576:Qn7gfGyElYlIkzgB@cluster0.3wmu8zm.mongodb.net/sanjivDB?retryWrites=true&w=majority';
const url = `mongodb+srv://shresthasanjiv576:IPpDZkNksDtivBq0@cluster0.yoic0aa.mongodb.net/?retryWrites=true&w=majority`;
const offlineUrl =  `mongodb://127.0.0.1:27017/${dbName}`;


mongoose.connect(offlineUrl)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => console.log(`Error : ${err.message} . Failed to connect database`));


app.use('/books', book_routes);

app.use('/users', user_routes);

// for any error
app.use((err, req, res, next) => {
    console.error(err);
    // if invalid data are given
    if (err.name === 'ValidationError') res.status(400);
    // if id is wrong
    else if (err.name === 'CastError') res.status(400);

    console.log(err.message);
    res.json({ error: err.message });
});
// for unkown path
app.use((req, res) => {
    res.status(405).json({error: 'Path not found'});
})
app.listen(port, () => {
    console.log(`Server is currently running on port ${port}`);
});
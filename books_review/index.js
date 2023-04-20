
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const books_routes = require('./routes/books_routes');

const app = express();
const port = process.env.PORT || 8080;
const dbName = process.env.DBNAME || 'BooksReview';

app.use(express.json());

app.use('/books', books_routes);

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`)
    .then(console.log(`Database is connected as ${dbName}`))
    .catch((err) => {
        console.log(err);
        console.log('Failed to connect database');
    });


app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});



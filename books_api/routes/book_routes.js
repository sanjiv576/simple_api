
const express = require('express');
// import custom books
let books = require('../data/books');

// import model of database
const Book = require('../models/Book');

// express.Router() --> is used to handle different routes moudalizer
const router = express.Router();

// this is main route for /api/books
router.route('/')

    // get all books 
    .get(async (req, res) => {
        // convert JSON code to string for readable to the network
        // res.json(books);

        // get books data from db --> find() is an async function
        // so, use either then or asyn/awiat

        // method 1 - using Promise i.e. then/catch
        // Book.find()
        // .then(books => res.json(books))
        // .catch(err => console.log(err));

        // method 2 - using asyn/await 

        try {
            const books = await Book.find();
            res.json(books);
        }
        catch (error) {
            console.log(error);
        }

    })

    // add a book in the books list

    .post((req, res) => {

        // send 400 status if the user send bad request or invalid data
        if (!req.body.title) {
            return res.status(400).json({ error: 'title is missing' });
        }

        // create id for that book according 
        const book_id = books.length + 1;

        const book = {
            id: book_id,
            title: req.body.title,
            author: req.body.author || 'Anonymous'  // if req.body.author is null, then add 'Anonymous'
        }

        // add book in the books list
        books.push(book);

        // send response with 201 status code ---> sth is created in the server side
        res.status(201).json(book);
    })

    .put((req, res) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })
    .delete((req, res) => {
        res.json({});
    });


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get((req, res) => {
        // convert String bookId into int because data type of id is int in books list 
        const bookId = Number(req.params.book_id);
        const bookDetail = books.find((singleBook) => singleBook.id === bookId);
        res.send(bookDetail);
        // res.json(req.params);
    })

    // update particular book
    .put((req, res) => {
        // convert String id into number id
        const bookId = Number(req.params.book_id);

        // const book = books.find(singleBook => );
        const updated_book = books.map(singleBook => {
            if (singleBook.id === bookId) {
                singleBook.title = req.body.title || singleBook.title;
                singleBook.author = req.body.author || singleBook.author;

            };
            return singleBook;
        });
        // console.log(book);
        res.status(201).json(updated_book);
    })

    // delete particular book
    .delete((req, res) => {
        const newBookList = books.filter(singleBook => {
            if (singleBook.id != req.params.book_id) return singleBook;
        });
        res.json(newBookList);
    })
    .post((req, res) => {
        res.status(405).json({ "error": "POST method is not allowed here" });
    });


// export it to use in other file
module.exports = router;

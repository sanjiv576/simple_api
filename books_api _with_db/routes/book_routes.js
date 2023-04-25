
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
        Book.create(req.body)
            .then(book => res.status(201).json(book))
            .catch((err) => {
                console.log(err);
                res.json({ "error": "Something went wrong" });
            });
    })

    .put((req, res) => {
        res.status(405).json({ "error": "PUT request is not allowed" });
    })
    .delete((req, res) => {
        Book.deleteMany()
            .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
            .catch((err) => console.log(err));
    });


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get((req, res) => {
        Book.findById(req.params.book_id)
            .then(book => res.json(book))
            .catch(err => {
                console.log(err);
                res.json({ "error": "Something went wrong" });
            });
    })

    // update particular book
    .put((req, res) => {
        Book.findByIdAndUpdate(
            req.params.book_id,  // find this id book
            { $set: req.body },  // update the changed data
            { new: true }  // return updated data not old one
        )
            .then(updatedBook => res.status(200).json(updatedBook))
            .catch(err => {
                console.log(err);
                res.json({ "error": "Something went wrong" });
            })
    })

    // delete particular book
    .delete((req, res) => {
        Book.findByIdAndDelete(
            req.params.book_id
        )
            .then(() => res.status(204).end())
            .catch(err => {
                console.log(err);
                res.json({ "error": "Something went wrong" });
            })
    })
    .post((req, res) => {
        res.status(405).json({ "error": "POST method is not allowed here" });
    });


// export it to use in other file
module.exports = router;


const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

router.route('/')

    .get((req, res) => {

        Book.find()
            .then(books => res.status(200).json(books))
            .catch(error => {
                console.log(error);
            });
    })

    // add a book in the database
    .post((req, res) => {

        if (!req.body.title) res.status(400).json({ "error": "title is missing" });

        // get each data from the client
        const bookTitle = req.body.title;
        const bookAuthor = req.body.author;

        // store
        const bookData = new Book({
            title: bookTitle,
            author: bookAuthor,
            rating: Number(req.body.rating) || 0,
            review: req.body.review || 'NA'
        });

        // save

        bookData.save()
            .then(() => {
                res.status(201).json({ "message": "Book added successfully" });
            })
            .catch((err) => {
                console.log(err.message);
                res.status(599).json({ "error": "Something went wrong." });
            });
    })

    .put((req, res) => {
        res.status(405).json({ "error": "PUT method is not allowed" });
    })

    .delete((req, res) => {
        res.status(405).json({ "error": "DELETE method is not allowed" });
    });


// update, delete, get each data by title name
router.route('/:titleName')

    // get data of a book by its title
    .get(async (req, res) => {
        const bookTitle = req.params.titleName;
        if (!bookTitle) res.status(400).json({ "error": "title is missing" });

        // get book data
        try {
            const bookDetail = await Book.find({ title: bookTitle });
            // console.log(bookDetail);
            res.status(200).json(bookDetail);
        }
        catch (error) {
            console.log(error.message);
            res.json({ "error": "Something went wrong" });
        }
    })

    // update a book 
    .put((req, res) => {

        const bookTitle = req.params.titleName;

        if (!bookTitle) res.status(400).json({ "error": "title is missing" });

        const updatedBook = {
            title: req.body.title,
            author: req.body.author,
            rating: req.body.rating,
            review: req.body.review
        };

        Book.updateOne({ title: bookTitle }, updatedBook)
            .then(() => res.status(201).json({ "message": "Updated successfully" }))
            .catch(error => {
                console.log(error);
                res.status(599).json({ "error": "Something went wrong" });
            });

    })

    // delete a by its title
    .delete((req, res) => {
        const bookTitle = req.params.titleName;
        if (!bookTitle) res.status(400).json({ "error": "title is missing" });

        Book.deleteOne({ title: bookTitle })
            .then(() => res.status(200).json({ "message": "Deleted successfully" }))
            .catch(error => res.json({ "error": "Something went wrong" }));
    })
    .post((req, res) => res.status(405).json({ "error": "POST method is not allowed" }));

module.exports = router;
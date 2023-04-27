
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

    .post((req, res, next) => {
        Book.create(req.body)
            .then(book => res.status(201).json(book))
            .catch(next);
    })

    .put((req, res, next) => {
        res.status(405).json({ error: "PUT request is not allowed" });
    })
    .delete((req, res) => {
        Book.deleteMany()
            .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
            .catch(next);
    });


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                // send this error handling if the book is not found
                if (!book) {
                    res.status(404).json({ error: "Book not found" });
                }
                res.json(book);
            })
            .catch(next);
    })

    // update particular book
    .put((req, res, next) => {
        Book.findByIdAndUpdate(
            req.params.book_id,  // find this id book
            { $set: req.body },  // update the changed data
            { new: true }  // return updated data not old one
        )
            .then(updatedBook => res.status(200).json(updatedBook))
            .catch(next)
    })

    // delete particular book
    .delete((req, res, next) => {
        Book.findByIdAndDelete(
            req.params.book_id
        )
            .then((deletedBook) => {
                if (!deletedBook) res.status(404).json({ "erorr": "No found" });
                res.status(202).end();
            })
            .catch(err => {
                console.log(err);
                next(err);
            })
    })
    .post((req, res) => {
        res.status(405).json({ error: "POST method is not allowed here" });
    });

// routes for reviews

router.route('/:book_id/reviews')
    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) res.status(404).json({ error: "Book not found" });
                res.json(book.reviews);
            })
            .catch(next);
    })
    .post((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) res.status(404).json({ error: "Book not found" });

                const review = {
                    text: req.body.text
                }

                book.reviews.push(review);
                // length of total 
                const reviewLength = book.reviews.length;
                book.save()
                    .then((book) => res.status(201).json(book.reviews[reviewLength - 1]))
                    .catch(next);
            })

            .catch(next);
    })

    .delete((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) res.status(400).json({ error: "Book not found" });

                // empty the review list
                book.reviews = [];

                // save it
                book.save()
                    .then(book => res.status(204).end())
                    .catch(next);
            })
            .catch(next);

    })
    .put((req, res) => {
        res.status(405).json({ error: "PUT method is not allowed here" });
    });

router.route('/:book_id/reviews/:review_id')

    .get((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) res.status(400).json({ error: "Book not found" });
                // get review 
                const review = book.reviews.id(req.params.review_id);
                if (!review) res.status(400).json({ error: "Review not found" });

                res.json(review);

            })
            .catch(next);
    })
    .post((req, res) => {
        res.status(405).json({ error: "POST method is not allowed here" });
    })
    .put((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) res.status(400).json({ error: "Book not found" });

                // update review by traversing 
                book.reviews = book.reviews.map(singleReview => {
                    // update the review whose id  matches  , _id is an object so, == is used instead of ===
                    if (singleReview._id == req.params.review_id) {
                        singleReview.text = req.body.text
                    }
                    return singleReview;
                })

                // since, reviews is not a model so it is not used for saving , instead of book which is a model 
                book.save().then(book => {
                    res.json(book.reviews.id(req.params.review_id));
                })
                    .catch(next);
            })
            .catch(next);
    })

    .delete((req, res, next) => {
        Book.findById(req.params.book_id)
            .then(book => {
                if (!book) res.status(400).json({ error: "Book not found" });

                // delete specific review only
                book.reviews = book.reviews.filter(singleReview => {
                    return singleReview._id != req.params.review_id;
                })
                // use save() when you create own algorithm to save without using methods of mongoose
                book.save()
                    .then(book => res.status(204).end())
                    .catch(next);

            })
            .catch(next);
    });



// export it to use in other file
module.exports = router;

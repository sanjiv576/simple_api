
const express = require('express');
// import custom books
let books = require('../data/books');

// import model of database
const Book = require('../models/Book');

// import book controller that handles operations
const bookController = require('../controllers/book_controller');

// import review controller that handles operations for reivews
const reviewController = require('../controllers/review_controller');

// express.Router() --> is used to handle different routes moudalizer
const router = express.Router();

// middleware for admin verification
const {verifyAdmin, verifyManager} = require('../middlewares/auth');

// middleware for manager verification
// const verifyManager = require('../middlewares/auth');

// this is main route for /api/books
router.route('/')

    // get all books 
    .get(bookController.getAllBooks)

    // add a book in the books list
    // added admin verification middleware ---> here, already user is verified
    .post(verifyManager,bookController.createBook)

    .put((req, res, next) => {
        res.status(405).json({ error: "PUT request is not allowed" });
    })
    .delete(verifyManager, bookController.deleteAllBooks);


// path for /api/books/:book_id
router.route('/:book_id')

    // get only specific book
    .get(bookController.getABookById)

    // update particular book
    .put(bookController.updateABookById)

    // delete particular book
    .delete(bookController.deleteABookById)
    .post((req, res) => {
        res.status(405).json({ error: "POST method is not allowed here" });
    });

// routes for reviews

router.route('/:book_id/reviews')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview)

    .delete(reviewController.deleteAllReviews)
    .put((req, res) => {
        res.status(405).json({ error: "PUT method is not allowed here" });
    });

router.route('/:book_id/reviews/:review_id')

    .get(reviewController.getAReviewById)
    .post((req, res) => {
        res.status(405).json({ error: "POST method is not allowed here" });
    })
    .put(reviewController.updateAReviewById)

    .delete(reviewController.deleteAReviewById);



// export it to use in other file
module.exports = router;

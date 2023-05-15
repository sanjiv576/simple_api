
const express = require('express');
const router = express.Router();
const book_controller = require('../controllers/book_controller');
const Book = require('../models/Book');

const review_controller = require('../controllers/review_controller');

router.route('/')
    .get(book_controller.getAllBooks)
    .post(book_controller.createABook)
    .put((req, res) => res.status(405).json({ error: 'PUT method is not allowed' }))
    .delete(book_controller.deleteAllBooks);

router.route('/:bookID')
    .get(book_controller.getABookById)
    .post((req, res) => {
        res.status(405).json({ error: 'POST method is not allowed' })
    })
    .put(book_controller.updateABookById)
    .delete(book_controller.deleteABookById);


router.route('/:bookID/reviews')
    .get(review_controller.getAllReviews)
    .post(review_controller.createReview)
    .put((req, res, next) => res.status(405).json({ error: 'PUT method is not allowed' }))
    .delete(review_controller.deleteAllReviews);

    router.route('/:bookID/reviews/:reviewID')
    .get(review_controller.getAReviewById)
    .put(review_controller.updateAReviewByID)
    .post((req, res, next) => res.status(405).json({ error: 'POST method is not allowed' }))
    .delete(review_controller.deleteAReviewById);
module.exports = router;
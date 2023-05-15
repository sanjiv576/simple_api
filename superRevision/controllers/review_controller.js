
const Book = require('../models/Book');

const getAllReviews = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(targetBook => {
            if (!targetBook) return res.status(404).json({ error: 'Book is not found' });

            // after book found
            res.json(targetBook.reviews);

        })
        .catch(next);
};

const createReview = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(targetBook => {
            if (!targetBook) return res.status(404).json({ error: 'Book is not found' });

            const review = {
                text: req.body.text
            }
            // add review in found book
            targetBook.reviews.push(review);
            const reviewLength = targetBook.reviews.length;

            // save in the db as well
            targetBook.save()
                .then((allBooks) => res.status(201).json(allBooks.reviews[reviewLength - 1]))
                .catch(next);
        })
        .catch(next);

};

const deleteAllReviews = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(targetBook => {
            if (!targetBook) return res.status(404).json({ error: 'Book is not found' });
            // after book found

            // deleting all reviews
            targetBook.reviews = [];
            targetBook.save()
                .then(() => res.status(204).end())
                .catch(next);

        })
        .catch(next);
};

const getAReviewById = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(targetBook => {
            if (!targetBook) return res.status(404).json({ error: 'Book not found' });

            // get review by id
            const review = targetBook.reviews.id(req.params.reviewID);
            if (!review) return res.status(404).json({ error: 'Review not found' });

            res.json(review);

        })
        .catch(next);
};

const updateAReviewByID = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(book => {
            if (!book) res.status(404).json({ error: "Book not found" });

            // update review by traversing 
            book.reviews = book.reviews.map(singleReview => {
                // update the review whose id  matches  , _id is an object so, == is used instead of ===
                if (singleReview !== null) {
                    console.log(singleReview)
                    if (singleReview._id == req.params.reviewID) {
                        singleReview.text = req.body.text
                        console.log('BOok found and updated successfully');
                    }
                    return singleReview;
                }
            })

            // since, reviews is not a model so it is not used for saving , instead of book which is a model 
            book.save().then(book => {
                res.json(book.reviews.id(req.params.reviewID));
            })
                .catch(next);
        })
        .catch(next);
};
const deleteAReviewById = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });

            book.reviews = book.reviews.map(reviewList => {
                //    if(singleReview === null) return;
                if (reviewList !== null) {
                    if (reviewList.id === req.params.reviewID && reviewList !== null) {
                        console.log('Delete successfully only from authorized person');
                    }
                    else {
                        return reviewList;
                    }
                }
            })
            // use save() when you create own algorithm to save without using methods of mongoose
            book.save()
                .then(book => res.status(204).end())
                .catch(next);
        })
        .catch(next);
};


module.exports = {

    createReview,
    deleteAllReviews,
    getAllReviews,
    getAReviewById,
    updateAReviewByID,
    deleteAReviewById
};
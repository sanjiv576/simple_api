
// import Book model
const Book = require('../models/Book');

// controller only for review

// for all books' reviews

const getAllReviews = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(404).json({ error: "Book not found" });
            res.json(book.reviews);
        })
        .catch(next);
};

const createReview = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(404).json({ error: "Book not found" });

            const review = {
                text: req.body.text,
                user: req.user.id // here, user is already verified
            }

            book.reviews.push(review);
            // length of total 
            const reviewLength = book.reviews.length;
            book.save()
                .then((book) => res.status(201).json(book.reviews[reviewLength - 1]))
                .catch(next);
        })

        .catch(next);
};

const deleteAllReviews = (req, res, next) => {
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

};


// for a specific review by id

const getAReviewById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });
            // get review 
            const review = book.reviews.id(req.params.review_id);
            if (!review) res.status(400).json({ error: "Review not found" });

            res.json(review);

        })
        .catch(next);
};

const updateAReviewById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });

            // update review by traversing 
            book.reviews = book.reviews.map(reviewList => {
                // update the review whose id  matches  , _id is an object so, == is used instead of ===
                if(reviewList !== null){
                    if (reviewList.id === req.params.review_id) {

                        // only allowt to that particular user who created review
                        if (reviewList.id === req.user.id) {
                            reviewList.text = req.body.text
                        }
                        else {
                            console.log('You are not valid user to delete update');
                        }
                    }
                }
                return reviewList;
            })

            // since, reviews is not a model so it is not used for saving , instead of book which is a model 
            book.save().then(book => {
                res.json(book.reviews.id(req.params.review_id));
            })
                .catch(next);
        })
        .catch(next);
};

const deleteAReviewById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            if (!book) res.status(400).json({ error: "Book not found" });

            // book.reviews = book.reviews.filter(singleReview => {    
            //     return singleReview.id !== req.params.review_id;
            // })

            // delete specific review only by authorized user

            book.reviews = book.reviews.map(reviewList => {
                //    if(singleReview === null) return;
                if (reviewList !== null) {
                    if (reviewList.id === req.params.review_id && reviewList !== null) {
                        // const index = reviewList.deleteOne({id: req.params.review_id})
                        // .then(() => console.log('Deleted !!'))
                        // .catch(err => console.log(`Error message : ${err.message}`));
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
    getAllReviews,
    createReview,
    deleteAllReviews,
    getAReviewById,
    updateAReviewById,
    deleteAReviewById
}
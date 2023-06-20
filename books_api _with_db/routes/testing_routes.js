const express = require('express');
const { verifyUser } = require('../middlewares/auth');

const router = express.Router();


router.get(verifyUser, ('/reviewAllBooks', (req, res, next) => {

    // aim --> to find the all reviews in those books the user gave
    Book.find()
        .then(books => {
            // res.json(books);
            // res.json(books); 

            // get each book
            // let totalReviews = []
            // books.map(singleBook => {
            //     totalReviews.push(singleBook.reviews);
            // })

            // // let singleBookReviews = [];

            // totalReviews.map(bookReviews => {
            //     console.log(bookReviews);
            //     // singleBookReviews.push(bookReviews);
            // })
            // // res.json(singleBookReviews);
            console.log(`User id is : ${req.user.id}`);
            let userAllReviews = [];
            books.map(book => {
                if (book.reviews != null) {
                    book.reviews.map(manyIds => {
                        if (manyIds != null) {
                            //    console.log(manyIds.user);
                            if (manyIds.user == '6459d70742e23e783855cd1d') {
                                userAllReviews.push(manyIds.text);
                            }

                        }
                    })
                }
            })
            res.json(userAllReviews);

            // res.end();


        })
        .catch(err => next(err));

}));

module.exports = router;
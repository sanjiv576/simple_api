

// import book model
const Book = require('../models/Book')


// controller for only book Schema


// for all books
const getAllBooks = async (req, res) => {
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

};

const createBook = (req, res, next) => {
    Book.create(req.body)
        .then(book => res.status(201).json(book))
        .catch(next);
};

const deleteAllBooks = (req, res, next) => {
    Book.deleteMany()
        .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
        .catch(next);
};


// for a specific book by id only

const getABookById = (req, res, next) => {
    Book.findById(req.params.book_id)
        .then(book => {
            // send this error handling if the book is not found
            if (!book) {
                res.status(404).json({ error: "Book not found" });
            }
            res.json(book);
        })
        .catch(next);
};

const updateABookById = (req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.book_id,  // find this id book
        { $set: req.body },  // update the changed data
        { new: true }  // return updated data not old one
    )
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(next)
};


const deleteABookById = (req, res, next) => {
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
};




// exports all functions

module.exports = {
    getAllBooks,
    createBook,
    deleteAllBooks,

    getABookById,
    deleteABookById,
    updateABookById
};
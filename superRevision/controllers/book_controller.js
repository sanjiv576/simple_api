

const Book = require('../models/Book');


const getAllBooks = (req, res) => {

    Book.find()
        .then(books => res.json(books))
        .catch(err => res.status(400).json({ error: err.message }));
};

const deleteAllBooks = (req, res) => {
    Book.deleteMany()
        .then((books) => res.status(204).json(books))
        .catch(err => {
            console.log(err);
            res.json({ error: err.message });
        })
};

const createABook = (req, res) => {

    Book.create(req.body)
        .then(book => res.status(201).json(book))
        .catch(err => res.json({ error: err.message }));
};


// ------------ Book by ID --------------

const getABookById = (req, res, next) => {
    Book.findById(req.params.bookID)
        .then(targetBook => {
            // if the book does not find
            if (!targetBook) return res.status(400).json({ error: 'Book not found' });

            // send data when the book is found
            return res.json(targetBook);
        })
        .catch(err => {
            next(err);
        });
};

const updateABookById = (req, res, next) => {
    Book.findByIdAndUpdate(
        req.params.bookID,
        { $set: req.body },
        { new: true }
    )
        .then(updatedBook => {
            if (!updatedBook) return res.status(400).json({ error: 'Book id not found' });

            // send updated book
            res.json(updatedBook);
        })
        .catch(next);
};

const deleteABookById = (req, res, next) => {
    Book.findByIdAndDelete(req.params.bookID)
        .then((deleteBook) => {

            if (!deleteBook) res.status(400).json({ error: 'Book id not found' });

            // after valid book found and delete
            res.status(204).end();
        })
        .catch(next);
};


module.exports = {
    getAllBooks,
    deleteAllBooks,
    createABook,
    getABookById,
    deleteABookById,
    updateABookById
}
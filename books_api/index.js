// import express library

const express = require('express');

// import custom books

let books = require('./data/books');

// create object of express 
const app = express();

// get data from client side
// express.json() --> decode the data come from the browsers
app.use(express.json());


// user request
app.get('/', (req, res)=>{
    console.log(req);
    res.send('<h1>Hello world</h1>');
});

// get all books
app.get('/api/books', (req, res) => {
    // convert JSON code to string for readable to the network
    res.json(books);
});

// get only specific book
app.get('/api/books/:bookId', (req, res) =>{
    // convert String bookId into int because data type of id is int in books list 
    const book_id = Number(req.params.bookId);
    const bookDetail = books.find((singleBook) => singleBook.id === book_id);
    res.send(bookDetail);
    // res.json(req.params);
});

// update particular book
app.put('/api/books/:book_id', (req, res) => {
    // convert String id into number id
    const bookId = Number(req.params.book_id);

    // const book = books.find(singleBook => );
    const updated_book = books.map(singleBook => {
        if(singleBook.id === bookId) {
            singleBook.title = req.body.title;
            singleBook.author = req.body.author;
            
        };
        return singleBook;
    });
    // console.log(book);
    res.status(201).json(updated_book);
});

// delete particular book
app.delete('/api/books/:bookId', (req, res) =>{
    const newBookList = books.filter(singleBook =>{
        if(singleBook.id != req.params.bookId) return singleBook;
    });
    res.json(newBookList);
});

// add a book in the books list

app.post('/api/books/', (req, res) => {

    // send 400 status if the user send bad request or invalid data
    if(!req.body.title){
        return res.status(400).json({error: 'title is missing'});
    }
 
    // create id for that book according 
    const book_id = books.length + 1;

    const book = {
        id : book_id,
        title : req.body.title,
        author : req.body.author || 'Anonymous'  // if req.body.author is null, then add 'Anonymous'
    }

    // add book in the books list
    books.push(book);
    
    // send response with 201 status code ---> sth is created in the server side
    res.status(201).json(book);
});

const port = 3000;
app.listen(port, () =>{
    console.log(`Server is running on ${port} port`);
});
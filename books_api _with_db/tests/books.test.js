

const supertest = require('supertest');
const app = require('../app');
const Book = require('../models/Book');
const { default: mongoose } = require('mongoose');
const User = require('../models/User');

const api = supertest(app);

// globlalize to get response
let token = ''
// clearing out Book databse
beforeAll(async () => {

    // delete User 
    await User.deleteMany({})

    // delete Book databse
    await Book.deleteMany();

    // initialize/ create one book
    await Book.create({
        title: "War and Peace",
        author: "Leo Tolstoy"
    })


    // create user before getting books
    await api.post('/users/register')
        .send({
            username: "testUser",
            password: "test123",
            fullName: "Test User",
            email: "test@gmail.com"
        })


    // login user before getting books

    const res = await api.post('/users/login')
        .send({
            password: "test123",
            username: "testUser"
        })
    // console.log(res.body);
    token = res.body.token;
});



// tear down
afterAll(async () => await mongoose.connection.close())


test('logged in user can get all books', async () => {
    const res = await api.get('/books')
        // sending token
        .set('authorization', `bearer ${token}`)
        .expect(200)

        // test book containing war is there or not
        expect(res.body[0].title).toMatch(/War/)

});

// test('normal user cannot post book')
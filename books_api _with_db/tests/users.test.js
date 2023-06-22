
// Step 3:test
const supertest = require('supertest');
const app = require('../app');
const { default: mongoose } = require('mongoose');

const User = require('../models/User');
// for sending HTTP requests like GET, POST, PUT, DELETE
const api = supertest(app);

// clean the database before testing --> setup process 
beforeAll(async () => await User.deleteMany({}));

// Method -1 using asyn await 
test('user registration', async () => {
    // Note: no need to give base url
    const res = await api.post('/users/register')
        .send({
            username: "testUser",
            password: "test123",
            fullName: "Test User",
            email: "test@gmail.com"
        })
        .expect(201)

    // console.log(res.body)
    // ensuret that user already registered or not
    expect(res.body.username).toBe('testUser')
});

// Method 2 using promises
test('registration of duplicate username', () => {
    return api.post('/users/register')
        .send({
            username: "testUser",
            password: "test123",
            fullName: "Test User",
            email: "test@gmail.com"
        }).expect(400)
        .then((res) => {
            // console.log(res);
            expect(res.body.error).toMatch(/Duplicate/);
        })
})


test('user login', async () => {
    const res = await api.post('/users/login')
        .send({
            username: "testUser",
            password: "test123"
        }).expect(200)
    expect(res.body.token).toBeDefined();
})

test('user password incorrect', async () => {
    const res = await api.post('/users/login')
        .send({
            username: "testUser",
            password: "test111"
        })
    // console.log(res.body)
    expect(res.body.error).toMatch(/Password does not match/);
})



// closing mongoose connection or free space  after testing Test suite --> tear down process
afterAll(async () => await mongoose.connection.close())
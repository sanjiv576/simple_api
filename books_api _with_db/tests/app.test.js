const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

test('of root path', async () => {
  const res =  await api.get('/')
  expect(res.statusCode).toBe(200)
  expect(res.text).toMatch(/Hello/)
})

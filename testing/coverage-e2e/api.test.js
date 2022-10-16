const request = require('supertest')
const { describe, it } = require('mocha')
const app = require('./api')
const assert = require('assert')
describe('API Suite test', () => {
  describe('./contact', () => {
    it('Should request the contact page and return HTTP stats 200', async () => {
      const response = await request(app).get('/contact').expect(200)
      assert.deepStrictEqual(response.text, 'Contact us Page')
    })
  })
  describe('/hello', () => {
    it('Should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app).get('/hi').expect(200)
      assert.deepStrictEqual(response.text, 'Hellor World!!')
    })
  })
  describe('/login', () => {
    it('Should login succesfully on the login route and returh HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'thaka', password: '123' })
        .expect(200)
      assert.deepStrictEqual(response.text, 'Logging has Succeded!!')
    })
    it('Should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'thaka', password: '1243' })
        .expect(401)
      assert.deepStrictEqual(response.text, 'Logging failed')
    })
  })
})

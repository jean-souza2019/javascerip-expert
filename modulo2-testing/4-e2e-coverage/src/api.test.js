const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('API Suite test', () => {
  let app

  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })

  after(done => app.close(done))

  describe('/contact:get', () => {
    it('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200)

      assert.strictEqual(response.text, 'contact us page')
    })
  })

  describe('/login:post', () => {
    it('should request the login route and return HTTP Status 200', async () => {
      const response = await supertest(app).post('/login').send({ username: 'jeanmarcos', password: '123' }).expect(200)

      assert.strictEqual(response.text, 'login successfull')
    })

    it('should request the login route and return HTTP Status 401', async () => {
      const response = await supertest(app).post('/login').send({ username: 'jeanmarcosss', password: '123' }).expect(401)

      assert.ok(response.unauthorized)
      assert.strictEqual(response.text, 'loggin failed')
    })
  })

  describe('/abc:get', () => {
    it('should request the login route and return HTTP Status 404', async () => {
      const response = await supertest(app).get('/abc').expect(404)

      assert.ok(response.notFound)
      assert.strictEqual(response.text, 'not found')
    })
  })

})
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')
const testData = {
  username: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /login', () => {

  beforeEach(done => {
    User
      .create(testData)
      .then(() => done())
  })

  afterEach(done => {
    User
      .deleteOne({})
      .then(() => done())
  })

  it('should return a 401 response with bad data', done => {
    api
      .post('/api/login')
      .send({ email: 'bad@bad.bad', password: 'bad' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with good data', done => {
    api
      .post('/api/login')
      .send({ email: 'test@test.test', password: 'test'})
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return a valid token', done => {
    api
      .post('/api/login')
      .send({ email: 'test@test.test', password: 'test'})
      .end((err, res) => {
        expect(res.body.token).to.exist

        jwt.verify(res.body.token, secret, (err, payload) => {
          expect(err).to.not.exist
          expect(payload).to.contain.keys([
            'iat',
            'exp',
            'sub'
          ])
        })
        done()
      })
  })

})
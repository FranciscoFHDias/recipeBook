const User = require('../../models/User')
const testData = {
  username: 'test',
  email: 'test@test.test',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /register', () => {

  afterEach(done => {
    User
      .deleteOne({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api
      .post('/api/register')
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api
      .post('/api/register')
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return a message', done => {
    api
      .post('/api/register')
      .send(testData)
      .end((err, res) => {
        expect(res.body.message).to.eq('Registration successful')
        done()
      })
  })

})

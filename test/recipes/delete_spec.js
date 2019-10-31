const Recipe = require('../../models/Recipe')
const User = require('../../models/User')
const recipeData = require('../../db/data/recipeData')
const userData = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

describe('DELETE /recipes/:id', () => {

  let recipe = null
  let token = null

  beforeEach(done => {
    Recipe.create(recipeData)
      .then(recipes => {
        recipe = recipes[0]
        return User.create(userData)
      })
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '167h' })
        done()
      })
  })

  afterEach(done => {
    Recipe.deleteOne({})
      .then(() => User.deleteOne({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/recipes/${recipe._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should actually delete the data', done => {
    api.delete(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end(() => {
        Recipe.findById(recipe._id)
          .then(recipe => {
            expect(recipe).to.not.exist
            done()
          })
      })
  })
})
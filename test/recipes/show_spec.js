const Recipe = require('../../models/Recipe')
const recipeData = require('../../db/data/recipeData')

describe('GET /recipes/:id', () => {

  let recipe = null

  beforeEach(done => {
    Recipe
      .create(recipeData)
      .then(recipes => {
        recipe = recipes[0]
        done()
      })
  })

  afterEach(done => {
    Recipe
      .deleteOne({})
      .then(() => done())
  })

  it('should return a 200 response with a token', done => {
    api
      .get(`/api/recipes/${recipe._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api
      .get(`/api/recipes/${recipe._id}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api
      .get(`/api/recipes/${recipe._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'description',
          'ingredients',
          'preparationTime',
          'cookingTime',
          'method',
          'image'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api
      .get(`/api/recipes/${recipe._id}`)
      .end((err, res) => {
        expect(res.body._id).to.be.a('string')
        expect(res.body.name).to.be.a('string')
        expect(res.body.description).to.be.a('string')
        expect(res.body.ingredients).to.be.a('array')
        expect(res.body.preparationTime).to.be.a('number')
        expect(res.body.cookingTime).to.be.a('number')
        expect(res.body.method).to.be.a('array')
        expect(res.body.image).to.be.a('string')
        done()
      })
  })
})

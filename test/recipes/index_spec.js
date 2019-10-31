/* global api, describe, it, expect, beforeEach, afterEach */
const Recipe = require('../../models/Recipe')
const recipeData = require('../../db/data/recipeData')

describe('GET /recipes', () => {

  beforeEach(done => {
    Recipe.create(recipeData)
      .then(() => done())
  })

  afterEach(done => {
    Recipe.deleteMany({})
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/recipes')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/recipes')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/recipes')
      .end((err, res) => {
        res.body.forEach(recipe => {
          expect(recipe).to.be.an('object')
        })
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get('/api/recipes')
      .end((err, res) => {
        res.body.forEach(recipe => {
          expect(recipe).to.contains.keys([
            '_id',
            'name',
            'description',
            'ingredients',
            'preparationTime',
            'cookingTime',
            'method',
            'image'
          ])
        })
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get('/api/recipes')
      .end((err, res) => {
        res.body.forEach(recipe => {
          expect(recipe._id).to.be.a('string')
          expect(recipe.name).to.be.a('string')
          expect(recipe.description).to.be.a('string')
          expect(recipe.ingredients).to.be.a('array')
          expect(recipe.preparationTime).to.be.a('number')
          expect(recipe.cookingTime).to.be.a('number')
          expect(recipe.method).to.be.a('array')
          expect(recipe.image).to.be.a('string')
        })
        done()
      })
  })
})
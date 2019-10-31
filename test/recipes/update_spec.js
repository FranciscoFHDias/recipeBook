const Recipe = require('../../models/Recipe')
const User = require('../../models/User')
const recipeData = require('../../db/data/recipeData')
const userData = require('../../db/data/userData')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testData = {
  name: 'Cod puttanesca with spinach & spaghetti',
  description: 'Tuck into a healthy seafood pasta dish in under half an hour. We\'ve combined spaghetti with low-fat, high-protein white fish and an easy puttanesca sauce',
  ingredients: ['100g wholemeal spaghetti', '1 large onion sliced', '1 tbsp rapeseed oil', '1 red chilli, deseeded and sliced', '2 garlic cloves, chopped', '200g cherry tomatoes, halved', '1 tsp cider vinegar', '2 tsp capers', '5 Kalamata olives, halved', '1/2 tsp smoked paprika', '2 skinless cod', 'fillet or loins', '160g spinach leaves', 'small handful chopped parsleyto serve'],
  preparationTime: 10,
  cookingTime: 17,
  dietary: ['vegetarian'],
  image: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/05/440-400-cod-puttanesca-with-spinach-spaghetti.jpg?itok=Igh0DB_n',
  method: ['Boil the spaghetti for 10 mins until al dente, adding the spinach for the last 2 mins. Meanwhile, fry the onion in the oil in a large non-stick frying pan with a lid until tender and turning golden. Stir in the chilli and garlic, then add the tomatoes.', 'Add the vinegar, capers, olives and paprika with a ladleful of the pasta water. Put the cod fillets on top, then cover the pan and cook for 5-7 mins until the fish just flakes. Drain the pasta and wilted spinach and pile on to plates, then top with the fish and sauce. Sprinkle over some parsley to serve.']
}

describe('PUT /recipes/:id', () => {

  let recipe = null
  let token = null

  beforeEach(done => {
    Recipe
      .create(recipeData)
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
    Recipe
      .deleteOne({})
      .then(() => User.deleteOne({}))
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api
      .put(`/api/recipes/${recipe._id}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 200 response with a token', done => {
    api
      .put(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api
      .put(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api
      .put(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'description',
          'ingredients',
          'preparationTime',
          'cookingTime',
          'method',
          'dietary',
          'image'
        ])
        done()
      })
  })

  it('should return the correct data', done => {
    api
      .put(`/api/recipes/${recipe._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(testData)
      .end((err, res) => {
        expect(res.body.name).to.eq(testData.name)
        expect(res.body.description).to.eq(testData.description)
        expect(res.body.ingredients).to.deep.eq(testData.ingredients)
        expect(res.body.preparationTime).to.eq(testData.preparationTime)
        expect(res.body.cookingTime).to.eq(testData.cookingTime)
        expect(res.body.method).to.deep.eq(testData.method)
        expect(res.body.dietary).to.deep.eq(testData.dietary)
        expect(res.body.image).to.eq(testData.image)
        done()
      })
  })
})
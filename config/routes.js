const router = require('express').Router()
const recipesController = require('../controllers/recipes')
const usersController = require('../controllers/users')
const authController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

router
  .route('/recipes')
  .get(recipesController.index)
  .post(secureRoute, recipesController.create)

router
  .route('/recipes/:id')
  .get(recipesController.show)
  .put(secureRoute, recipesController.update)
  .delete(secureRoute, recipesController.delete)

router
  .get('/profiles', usersController.usersIndex)

router
  .route('/profiles/:id')
  .get(secureRoute, usersController.userShow)
  .put(secureRoute, usersController.userUpdate)
  .delete(secureRoute, usersController.userDelete)

router
  .post('/register', authController.register)

router
  .post('/login', authController.login)

module.exports = router

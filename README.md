# recipeBook

[Launch Recipe Book](https://recipebooknanafran.herokuapp.com/)

<a href="https://recipebooknanafran.herokuapp.com/" target="_blank" ><img width="1391" alt="Recipe Book screenshot" src="https://user-images.githubusercontent.com/49660544/68070536-badcc480-fd67-11e9-8cad-19dd27440cb1.png"></a>

### Installation

* Clone or download the repo
* Run `yarn init` in the CLI
* Run `mongo`, `yarn seed`, `yarn serve:backend` and `yarn serve:frontend` in the CLI

## Overview
Recipe Book is your best cooking buddy. A virtual space where you can find, save and find your favourite recipes.

## Project functionality

* **A full-stack application** with own backend and front-end
* **Express API** to serve data from a MongoDB
* **Front-end to consume API** built with React
* **Deployed online** so it's publicly accessible.
* **Has automated tests** for RESTful resource on the back-end.

## Project Execution

### Technologies Used
* HTML5
* SCSS
* JavaScript (ES6)
* Git
* GitHub
* React and React extensions
* Webpack
* Bulma
* Node.js
* Babel
* Insomnia
* MongoDB
* Express
* Heroku
* Mongoose

### App features

> **Available Features:**
  - View all recipes
  - Create recipe
  - Delete recipe
  - Login
  - Register
  
 > **Future Features:**
  - Update recipe
  - View all users
  - Show user account
  - Update user account
  - Delete user account
  - Recipes likes and comments
  - User favourites
  
### Backend

**Technology used** - MongoDB, Express and Mongoose.

**Models** - I started by creating the models for both recipe and user.

```js
const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a name' },
  description: { type: String, required: 'Please provide a brief description' },
  ingredients: { type: [String], required: 'Please provide ingredients list' },
  preparationTime: { type: Number, required: 'Please provide preparation time' },
  cookingTime: { type: Number, required: 'Please provide preparation time' },
  dietary: { type: [String] },
  method: { type: [String] , required: 'Please provide cooking method.'},
  image: { type: String, required: 'Please provide cooking method.' }
})

module.exports = mongoose.model('Recipe', recipeSchema)
```

```js
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, {
  toJSON: {
    transform(doc, json) {
      delete json.password
      delete json.__v
      return json
    }
  }
})

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.pre('validate', function checkPasswords(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()
})

userSchema.methods.validatePassword = function validatePassword(plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

module.exports = mongoose.model('User', userSchema)
```

**Controllers** - The focus then moved to the different controllers.

Example:
```js
const Recipe = require('../models/Recipe')

function indexRoute(req, res, next) {
  Recipe
    .find(req.query)
    .then(recipes => res.json(recipes))
    .catch(next)
}

function showRoute(req, res, next) {
  Recipe
    .findById(req.params.id)
    .then(recipe => {
      if(!recipe) return res.sendStatus(404)
      return res.json(recipe)
    })
    .catch(next)
}
```

**RESTFul API Routes**

```js
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
```
### Front-End

**Technology used** - React, React-Select and Bulma.

**Styling** - I choose a minimalist and clean design to make the user experience accessible to most people. This approach freed up each page to display a large amount of text used when relaying a recipe to someone.

## Wins and Blockers
> **Wins**

> **Blockers**

## Future Content/Features
* Update recipe
* View all users
* Show user account
* Update user account
* Delete user account
* Recipes likes and comments
* User favourites

## What I learnt
* Refreshed my understanding of the functionality of Express, Mongoose, CRUD functionality and different between embedded and referenced data,
* Refreshed JS, single page app with React and the use of Bulma.

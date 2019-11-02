# recipeBook

[Launch Recipe Book](https://recipebooknanafran.herokuapp.com/)

[<img width="1391" alt="Recipe Book screenshot" src="https://user-images.githubusercontent.com/49660544/68070536-badcc480-fd67-11e9-8cad-19dd27440cb1.png">](https://recipebooknanafran.herokuapp.com/)

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
  - Update user information
  - Recipes likes and comments
  - User favourites
  
### Backend

**Technology used** - MongoDB, Express and Mongoose.

**Models**
Started by creating the models for both recipe and user.

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

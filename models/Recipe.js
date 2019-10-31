const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: 'Please provide a name' },
  description: { type: String, required: 'Please provide a brief description' },
  ingredients: { type: [String], required: 'Please provide ingredients list' },
  preparationTime: { type: Number, required: 'Please provide preparation time' },
  cookingTime: { type: Number, required: 'Please provide preparation time' },
  dietery: { type: [String] },
  method: { type: [String] , required: 'Please provide cooking method.'},
  image: { type: String, required: 'Please provide cooking method.' }
})

module.exports = mongoose.model('Recipe', recipeSchema)


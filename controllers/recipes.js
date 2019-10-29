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

function createRoute(req, res, next) {
  req.body.user = req.currentUser._id
  const recipe = new Recipe(req.body)
  recipe
    .save()
    .then(recipe => res.status(201).json(recipe))
    .catch(next)
}

function updateRoute(req, res, next) {
  console.log(req.body)
  Recipe
    .findById(req.params.id)
    .then(recipe => {
      if(!recipe) return res.sendStatus(404)
      return recipe.set(req.body)
    })
    .then(recipe => recipe.save())
    .then(recipe => res.json(recipe))
    .catch(next)
}

function deleteRoute(req, res, next) {
  Recipe
    .findById(req.params.id)
    .then(recipe => {
      if(!recipe) return res.sendStatus(404)
      return recipe.remove()
        .then(() => res.sendStatus(204))
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
}
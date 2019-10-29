const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function registerRoute(req, res, next) {
  User
    .create(req.body)
    .then(user => res.json({ message: 'Registration successful', user }))
    .catch(next)
}

function loginRoute(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.sendStatus(401)
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '167h' })
      res.json({ message: `Welcome back ${user.username}!`, token, user })
    })
    .catch(next)
}

module.exports = {
  register: registerRoute,
  login: loginRoute
}
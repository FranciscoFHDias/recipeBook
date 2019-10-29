const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')
const User = require('../models/User')

function secureRoute(req, res, next) {
  if(!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return res.sendStatus(401)
  }

  const token = req.headers.authorization.replace('Bearer ', '')
  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.sendStatus(401)
    User
      .findById(payload.sub)
      .then(user => {
        if(!user) return res.sendStatus(401)
        req.currentUser = user
        next()
      })
  })

}

module.exports = secureRoute

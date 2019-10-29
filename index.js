const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'Please choose another {PATH}'
})
const bodyParser = require('body-parser')
const errorHandler = require('./lib/errorHandler')
const routes = require('./config/routes')
const { port, dbURI } = require('./config/environment')

const app = express()
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.json)
app.use('/api', routes)
app.use(errorHandler)
app.listen(port, () => console.log(`Let's get cooking on ${port}!!!`))

module.exports = app
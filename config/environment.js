const port = process.env.PORT || 4000
const env = process.env.NODE_ENV || 'development'
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/recipeBook-db-${env}`
const secret = process.env.SECRET || 'Tgs5aG_^GH@lKmnN=++/dgyhhebded'
const filestackKey = 'AgpvNEP8WTweMRrNXxu7Mz'

module.exports = { port, env, dbURI, secret, filestackKey }
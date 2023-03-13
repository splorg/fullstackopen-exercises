require('dotenv').config()

const PORT = process.env.PORT
// const DATABASE_URI = process.env.DATABASE_URI

const DATABASE_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DATABASE_URI
  : process.env.DATABASE_URI

module.exports = {
  DATABASE_URI,
  PORT
}
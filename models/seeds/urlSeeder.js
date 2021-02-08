// Connect to database
const db = require('../../config/mongoose')

// Require models
const Url = require('../url')

// Success
db.once('open', () => {
  Url.create({
    originUrl: 'https://www.google.com',
    path: 'HVb2b',
  })
    .then(() => {
      console.log('insert data done...')
      return db.close()
    })
    .then(() => console.log('database connection close'))
})

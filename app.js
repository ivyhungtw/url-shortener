// Require related packages
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = 3000

// Set up middlewares

// Template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// static files
app.use(express.static('public'))

// Direct request to routes/index.js
app.use(routes)

// Start and listen on the Express server
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)

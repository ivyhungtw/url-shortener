// Require related packages
const express = require('express')

const routes = require('./routes')

const app = express()
const PORT = 3000

// Set up middlewares

// Direct request to routes/index.js
app.use(routes)

// Start and listen on the Express server
app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
)

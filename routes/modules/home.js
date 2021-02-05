// Require Express and Express modules
const express = require('express')
const router = express.Router()

// Set up routes
router.get('/', (req, res) => {
  res.send('Hi')
})

// Export
module.exports = router

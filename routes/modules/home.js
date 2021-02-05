// Require Express and Express modules
const express = require('express')
const router = express.Router()

// Require models
const Url = require('../../models/url')

// Define variables
const basicUrl = 'http://localhost:3000/'

// Set up routes
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originUrl = req.body.originUrl
  const randomPath = Math.floor(Math.random() * 10)
  const shortenUrl = basicUrl + randomPath
  console.log(shortenUrl)
  Url.create({
    originUrl,
    shortenUrl,
  }).then(() => res.render('index', { shortenUrl }))
})

// Export
module.exports = router

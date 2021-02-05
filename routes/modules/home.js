// Require Express and Express modules
const express = require('express')
const router = express.Router()

// Require models
const Url = require('../../models/url')

// Define variables
const basicUrl = 'http://localhost:3000/'

// Create functions
function generatePath() {
  let path = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 5; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length)
    path += characters[randomNumber]
  }
  return path
}

// Set up routes
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originUrl = req.body.originUrl
  const randomPath = generatePath()
  const shortenUrl = basicUrl + randomPath

  Url.create({
    originUrl,
    shortenUrl,
  }).then(() => res.render('index', { shortenUrl }))
})

router.get('/:path', (req, res) => {
  const path = req.params.path
  const shortenUrl = basicUrl + path

  Url.find({ shortenUrl })
    .then(url => {
      const originUrl = url[0].originUrl
      res.redirect(originUrl)
    })
    .catch(error => console.log(error))
})

// Export
module.exports = router

// Require Express and Express modules
const express = require('express')
const router = express.Router()

// Require models
const Url = require('../../models/url')

// Define variables
const production = 'https://fathomless-stream-96837.herokuapp.com/ '
const development = 'http://localhost:3000/'
const basicUrl = process.env.NODE_ENV ? production : development

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
  let randomPath = generatePath()
  let shortenUrl = basicUrl + randomPath
  let duplicatedMsg

  Url.exists({ shortenUrl })
    .then(result => {
      if (result) {
        duplicatedMsg = 'Please try again!'
        shortenUrl = ''
      } else {
        Url.create({
          originUrl,
          shortenUrl,
        })
      }
    })
    .then(() => res.render('index', { shortenUrl, duplicatedMsg }))
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

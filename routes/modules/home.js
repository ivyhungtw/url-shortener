// Require Express and Express modules
const express = require('express')
const router = express.Router()

// Require models
const Url = require('../../models/url')

// Define variables
const production = 'https://fathomless-stream-96837.herokuapp.com/'
const development = 'http://localhost:3000/'
const baseUrl = process.env.NODE_ENV ? production : development
let originUrl
let shortenUrl

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

function checkDuplicates(path, res) {
  Url.exists({ path })
    .then(result => {
      if (result) {
        return checkDuplicates(generatePath())
      } else {
        Url.create({
          originUrl,
          path,
        })
        shortenUrl = baseUrl + path
        return shortenUrl
      }
    })
    .then(() => res.render('index', { shortenUrl }))
}

// Set up routes
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  originUrl = req.body.originUrl
  let randomPath = generatePath()

  checkDuplicates(randomPath, res)
})

router.get('/:path', (req, res) => {
  const path = req.params.path
  const shortenUrl = baseUrl + path

  Url.find({ shortenUrl })
    .then(url => {
      const originUrl = url[0].originUrl
      res.redirect(originUrl)
    })
    .catch(error => console.log(error))
})

// Export
module.exports = router

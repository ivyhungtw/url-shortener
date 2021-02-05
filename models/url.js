// Require mongoose
const mongoose = require('mongoose')

// Define Schema
const Schema = mongoose.Schema
const urlSchema = new Schema({
  originUrl: {
    type: String,
    required: true,
  },
  shortenUrl: {
    type: String,
    required: true,
  },
})

// Create and export a model
module.exports = mongoose.model('Url', urlSchema)

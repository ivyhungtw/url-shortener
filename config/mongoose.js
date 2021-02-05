// Require mongoose
const mongoose = require('mongoose')

// Define variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/url-list'

// Connect to database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Get connection status
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

// Export db
module.exports = db

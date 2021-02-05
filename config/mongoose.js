// Require mongoose
const mongoose = require('mongoose')

// Connect to database
mongoose.connect('mongodb://localhost/url-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Get connection status
const db = mongoose.connection
db.on('error', () => console.log('mongodb error!'))
db.once('open', () => console.log('mongodb connected!'))

// Export db
module.exports = db

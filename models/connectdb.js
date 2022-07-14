// require dotenv to load .env file and get enviromental variable DATABASE_URI 
const dotenv = require('dotenv').config()
// run mongoose
const mongoose = require('mongoose')

// connect mongoose to mongodb database/room
mongoose.connect(process.env.DATABASE_URI, 
    { useNewUrlParser: true,
    useUnifiedTopology: true
     })

    //  check weather you are succesfully mongoose is connected to mongodb database
const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', process.env.DATABASE_URI)
})

db.on('error', err => {
  console.error('connection error:', err)
})


module.exports = mongoose




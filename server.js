// require express 
const express = require('express')
// run liquid templating lanugage
const app = require('liquid-express-views')(express())
// request logger
const morgan = require('morgan')
// load .env file to get enviromental variables
const dotenv = require('dotenv').config()


// MIDDLEWARE
// use this to run static pages from public folder without any aditional routes
app.use(express.static('public'))
// body parser 
app.use(express.urlencoded({extended: false}))

app.use(morgan('tiny'));

// ROUTERS  
app.get('/', function (req, res) {
  res.send('Hello World')
})

const port = process.env.PORT 
app.listen(port, () => {
    console.log(`the server is running on port ${port}.`)
})
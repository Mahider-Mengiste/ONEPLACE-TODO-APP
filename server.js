// require express 
const express = require('express')
const app = express()
// load .env file to get enviromental variables
const dotenv = require('dotenv').config()

const port = process.env.PORT 

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port, () => {
    console.log(`the server is running on port ${port}.`)
})
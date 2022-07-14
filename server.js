// require express 
const express = require('express')
// run liquid templating lanugage
const app = require('liquid-express-views')(express())
// request logger
const morgan = require('morgan')
// load .env file to get enviromental variables
const dotenv = require('dotenv').config()
const connectdb = require('./models/connectdb');
const todoRoutes = require('./controller/todo_routes')


// MIDDLEWARE
// use this to run static pages from public folder without any aditional routes
app.use(express.static('public'))
// body parser 
app.use(express.urlencoded({extended: false}))
app.use(morgan('tiny'));
app.use('/todos', todoRoutes)

// ROUTERS  
app.get('/', function (req, res) {
  res.send('Hello this is the first route that is going to be read when express runs then it will go to /todos/list')
})

const port = process.env.PORT 
app.listen(port, () => {
    console.log(`the server is running on port ${port}.`)
})
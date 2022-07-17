// import dependencies
const express = require('express')
// run liquid templating lanugage
const app = require('liquid-express-views')(express())
// request logger
const morgan = require('morgan')
// load .env file to get enviromental variables
const dotenv = require('dotenv').config()
const connectdb = require('./models/connectdb');
const methodOverride = require('method-override')
const todoRoutes = require('./controller/todo_routes')
const userRoutes = require('./controller/user_routes')


// MIDDLEWARE
// logs out request 
app.use(morgan('tiny'))
// overrides post and get with update and delete
app.use(methodOverride('_method'))
// body parser
app.use(express.urlencoded({extended: false}))
// this serves static page on the client side
app.use(express.static('public'))
// session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')


// ROUTES
app.use('/todos', todoRoutes)
app.use('/users', userRoutes)

// middleware to set up sessions

// localhost:3000/ 
app.get('/', function (req, res) {
  // res.send('Hello this is the first route that is going to be read when express runs then it will go to ROUTES')
  res.redirect('/todos')
})

const port = process.env.PORT 
app.listen(port, () => {
    console.log(`the server is running on port ${port}.`)
})
const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
// import Todo model form models directory
const Todo = require('../models/todo')

// GET - route to display a form to the client side
    // this will allow users to pass in a request
// localhost:3000/todos/new
router.get('/new', (req, res) => {
    res.render('todos/new')
})

// POST - route to create a document in the database
// localhost:3000/todos/
router.post('/', (req,res) => {
    // go to the database and post the values that came inside the body to the collection
    Todo.create(req.body)
    // then assign the promised return as todos and console log it to see if is successfuly created
    .then(todos => {
        console.log(todos)
        res.redirect('/todos')
    })
    .catch(err => console.error(err))
    .catch(console.error)
})


// GET - route to display an update form
// localhost:3000/todos/:id/edit
router.get('/:id/edit', (req, res) => {
     // get an id from the req
    const todoID = req.params.id
    Todo.findById(todoID)
      // then return the promised data by passing it as todo
        .then(todo => {
            // render the promised data by passing it inside show.liquid
            res.render('todos/edit', {todo})
        })
        .catch(err => {
            res.json(err)
        })

})

// PUT - route to update changes inside a document




// GET -  route to display all of the todolists
// localhost:3000/todos/
// HOME ROUTE
router .get('/', (req, res) => {
// find all todo lists
Todo.find({})
// then pass the promised data inside then as todos
.then(todos => {
    // then render it by passing the promised data into index.liquid file
    res.render('todos/index', {todos})
})
.catch(err => {
    res.json(err)
})
})

// localhost:3000/todos/:id 
// GET - route shows a specific document
router.get('/:id', (req, res) => {
    // get an id from the req
    const todoID = req.params.id
    // find a document with that specfic id 
    Todo.findById(todoID)
    // then return the promised data by passing it as todos
    .then(todo => {
        // render the promised data by passing it inside show.liquid 
        res.render('todos/show', {todo})
    })
    .catch(err => {
        res.json(err)
    })
})


// GET - route to insert inital items to the database that is used for testing
// localhost://todos/list
router.get('/list', (req, res) => {
    // arbitary starting data 
    const startLists = [
        {list: "go to gym at 6:00 pm"},
        {list: "call Tom"},
        {list: "meet with Sara"},
        {list: "dont forget to invite Alex"},
        {list: "take a walk"},
    ]

    // first we have to delete if we have any lists
    // then insert a new list
        // then if the promised data is returned succesfully we will send a json response to view 
        // if not then catch the error
    Todo.deleteMany({})
        // insert data
        .then(() => {
            Todo.create(startLists)
            // return this data as json to view
            .then(data => {
            res.json(data)
            })
        .catch(err => console.error(err))
        .catch(console.error)
        })
})



module.exports = router
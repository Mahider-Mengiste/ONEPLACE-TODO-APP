// Import Dependencies
const { append } = require('express/lib/response')
const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

// GET - route 
// localhost:3000/todos/new
router.get('/new', (req, res) => {
    // render new.liquid file to show the form
    res.render('todos/new')
})

// POST - route
// localhost:3000/todos/
router.post('/', (req,res) => {
    // go to the database and post the values that came inside the body to the collection
    Todo.create(req.body)
    // then assign the promised data as todos 
        .then(todos => {
            // redirect to the home page
            res.redirect('/todos')
        })
        .catch(err => console.error(err))
        .catch(console.error)
})

// GET - route 
// localhost:3000/todos/:id/edit
router.get('/:id/edit', (req, res) => {
     // get an id from the request
    const todoID = req.params.id
    // find to do by an ID
    Todo.findById(todoID)
        // then return the promised data by passing it as todo
        .then(todo => {
            // render the promised data by displaying it on show.liquid page
            res.render('todos/edit', {todo})
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - route 
// localhost:3000/todos/:id
router.put('/:id', (req, res) => {
    // obtain the id from the request and store it as todoID
    const todoID = req.params.id
    // find the todo by id and update it
    Todo.findByIdAndUpdate(todoID, req.body, {new: true})
        .then(todo => {
            // redirect to the show route
            res.redirect(`/todos/${todo._id}`)
        })
        .catch(err => console.error(err))
        .catch(console.error)
})

// DELETE - route
router.delete('/:id', (req, res) => {
    // obtain the id from the request and store it as deleteID
    const deleteID = req.params.id
    // find the to by its id and delete it
    Todo.findOneAndDelete(deleteID, req.body)
        .then(todo => {
            // redirect to the show route
            console.log(todo)
            res.redirect('/todos')
        })
        .catch(err => console.error(err))
        .catch(console.error)
})

// GET -  route 
// localhost:3000/todos/
// index page
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
// GET - route shows a specific document/show page
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

module.exports = router
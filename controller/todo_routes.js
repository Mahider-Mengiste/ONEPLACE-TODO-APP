
const express = require('express')
const router = express.Router()
// import Todo model form models directory
const Todo = require('../models/todo')

// GET INDEX ROUTE- display all of my  todolist
// localhost:3000/todos/
// home route
router .get('/', (req, res) => {
// find all todo lists
Todo.find({})
// then view a json response with all of the documents
.then(todos => {
    res.render('todos/index', {todos})
})
.catch(err => {
    res.json(err)
})
})


// localhost:3000/todos/:id 
// GET SHOW ROUTE - shows a specific document
router .get('/:id', (req, res) => {
    // get an id from the req
    const todoID = req.params.id
    // find a document with a specfic id 
    Todo.findById(todoID)
    // then send back a json response with that document
    .then(todo => {
        res.json(todo)
    })
    .catch(err => {
        res.json(err)
    })
})


// list route
// insert as items to the daatabase.
// localhost:/todos/list
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
    Fruit.deleteMany({})
        // insert data
        .then(() => {
            Fruit.create(startFruits)
            // return this data as json to view
            .then(data => {
            res.json(data)
            })
        .catch(err => console.error(err))
        .catch(console.error)
        })
})



module.exports = router
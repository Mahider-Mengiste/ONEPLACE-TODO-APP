// Import Dependencies
const Todo = require('../models/todo')
const express = require('express')
const router = express.Router()

// POST - route
// localhost:3000/comments/:todoId 
router.post('/:todoId', (req, res) => {
    console.log(req.body)
    // obtain todoId from the request
    const todoId = req.params.todoId
    // obtain userId from the request and store it inside author object
    req.body.author = req.body.userId
    // find todoId from the database

    Todo.findById(todoId)
        // store the promised returned data as todo and pass it to .then function 
        .then(todo => {
            console.log("Promise chain: todo", todo)
            // then push comment to the database that has todo Id 
            todo.comments.push(req.body)
            // else save the comment to the document
            return todo.save()
        })
        .then(todo => {
            // then redirect to the show liquid
            res.redirect(`/todos/${todo._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE - route
// localhost:3000/comments/delete/:todoId/:commId
router.delete('/delete/:todoId/:commId', (req, res) => {
    // obtain todo Id from the request
    const todoId = req.params.todoId
    // obtain user Id from the request and store it inside commId variable
    const commId = req.params.commId
    // find the todo by it's ID
    Todo.findById(todoId) 
    // store the promised returned data as todo and pass it to .then function 
        .then(todo => {
            // pass comment id to todo and store it in comment
            const comment = todo.comments.id(commId)
            // remove comment
            comment.remove()
            // else save the todo by it ID
            return todo.save()
        })
        .then(todo => {
            // then redirect to the show liquid
            res.redirect(`/todos/${todoId}`)
        })
        .catch(err => {
            res.send(err)
        })
    
})

module.exports = router
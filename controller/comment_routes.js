// import dependencies
const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

// POST - Creation
// localhost:3000/comments/:todoId 
router.post('/:todoId', (req, res) => {
    const todoId = req.params.todoId
    req.body.author = req.body.userId

    Todo.findById(todoId)
        // take that fruit and add the comment
        .then(todo => {
            // then push the comment to the data base
            todo.comments.push(req.body)

            // else return and call .save() on the doc.
            return todo.save()
        })
        .then(todo => {
            console.log(todo)
            res.redirect(`/todos/${todo._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE - route
// localhost:3000/comments/delete/:todoId/:commId
router.delete('/delete/:todoId/:commId', (req, res) => {
    const todoId = req.params.todoId
    const commId = req.params.commId

    // find the todo by it's ID
    Todo.findById(todoId) 
    // find this comment by it's ID
        .then(todo => {
            const comment = todo.comments.id(commId)
            comment.remove()
            return todo.save()
        })
        .then(todo => {
            res.redirect(`/todos/${todoId}`)
        })
        .catch(err => {
            res.send(err)
        })
    
})

module.exports = router
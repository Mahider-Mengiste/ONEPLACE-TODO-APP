// Import Dependencies
const mongoose = require('./connectdb')

// access schema and model from mongoose object 
const Schema = mongoose.Schema;

// rules for the model
const todoSchema = new Schema (
    {
        list: String
        // need to add: comments:[] with comment schema inside array
        // this will make comments a sub document of todo 
        // and i only want to do it this way if i am only ever going to see coments in the context of the todo (it is hard to query them separatly)
        // if i do want to come up in other places, i do want them to be their own  document
        // with a one to many relationship, with todo:use reference id
    },
    {
        timestamp: true
    } 
)   

//  create schema
const Todo= mongoose.model(' todoSchema', todoSchema)

module.exports = Todo
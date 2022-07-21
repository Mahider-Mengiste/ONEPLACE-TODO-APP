// Import Dependencies
const mongoose = require('./connectdb')
const commentSchema = require('./comment')

// access schema and model from mongoose object 
const Schema = mongoose.Schema;

// rules for the model
const todoSchema = new Schema (
    {
        list: String, 
        owner: {
			type: Schema.Types.ObjectId, 
			ref: 'User', 
		},
		comments: [commentSchema]
    },
    {
        timestamp: true
    } 
)   

//  create schema
const Todo= mongoose.model(' todoSchema', todoSchema)

module.exports = Todo
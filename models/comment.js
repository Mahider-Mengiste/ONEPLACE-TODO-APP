// Import Dependencies
const mongoose = require('./connection')
const commentSchema = require('./comment')

// construct Schema and model from mongoose
const { Schema, model } = mongoose

// create a schema
const todoSchema = new Schema (
	{
		name: String,
		color: String,
		readyToEat: Boolean,
		owner: {
			type: Schema.Types.ObjectId, 
			ref: 'User', 
		},
		// a todolist can have many comments
		comments: [commentSchema] 
	},

	{
		timestamps: true,
	}
)

// create a model
const Todo = model('Todo', todoSchema)

module.exports = Todo
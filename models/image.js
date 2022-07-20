// Import Dependencies
const mongoose = require('./connectdb')

// access schema and model from mongoose object 
const Schema = mongoose.Schema;

// create schema
const imageSchema = new Schema ({
    image: {
        type: String,
        required: true,
        unique: true,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
})   

// create model
const Image= mongoose.model('imageSchema', imageSchema)

module.exports = Image
// Import Dependencies
const mongoose = require('./connectdb')

// this will destruct schema from mongoose
const Schema = mongoose.Schema;
    
// create schema
const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true,
    },
})

// create model
const User = mongoose.model('userSchema', userSchema)

module.exports = User 
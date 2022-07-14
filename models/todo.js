    // this will call mongoose that is already connected to mongodb database
    const mongoose = require('./connectdb')
    // store todo items inside mongodb

    // access schema and model from mongoose object 
    const Schema = mongoose.Schema;

    // rules for the model
    const todoSchema = new Schema (
        {
            list: String
        },
        {
            timestamp: true
        }
    
        
    )   
        // 
        //  priniting press/actual constructor that populates document
    const Todo= mongoose.model(' todoSchema', todoSchema)

    module.exports = Todo
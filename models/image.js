    // this will call mongoose that is already connected to mongodb database
    const mongoose = require('./connectdb')

    // access schema and model from mongoose object 
    const Schema = mongoose.Schema;

    // rules for the model
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
        //  priniting press/actual constructor that populates document
    const Image= mongoose.model('imageSchema', imageSchema)

    module.exports = Image
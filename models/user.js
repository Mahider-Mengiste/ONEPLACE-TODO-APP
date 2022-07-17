// require mongoose
// this will give us access to mongoose properies/methods
const mongoose = require('./connectdb')
    // this will destruct schema from mongoose
    const Schema = mongoose.Schema;
    
    // this will give userSchema a rule for the model
    const userSchema = new Schema ({
        username: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        phone: {
            type: String,
            required: true,
            unique: true
        }
    })


    //model constructor will populate documents/objects with the schema created above
    const User = mongoose.model('userSchema', userSchema)

// this will export user model
module.exports = User 
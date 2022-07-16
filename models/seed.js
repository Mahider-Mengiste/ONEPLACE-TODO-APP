const mongoose = require('./connectdb')
const Todo = require('./todo')
// store bd conntection inside a variable

const db = mongoose.connection

// when the file is opened it will fire the call back function
db.on('open', () => {
     // arbitary starting data 
    const startLists = [
        {list: "go to gym at 6:00 pm"},
        {list: "call Tom"},
        {list: "meet with Sara"},
        {list: "dont forget to invite Alex"},
        {list: "take a walk"},
    ]

      // first we have to delete if we have any lists
        Todo.remove({})
        // then if the data is deleted successfully 
        .then(deletedtodos => {
            console.log(deletedtodos)
            // create the startLists
            Todo.create(startLists)
                // if the startLists is created successfuly
                .then(data => {
                    console.log('new lists:', data)
                    // close database
                    db.close()
                })
                // else catch error
                .catch(error => {
                    console.log('error:', error)
                })
        })
        // if not then catch the error
        .catch(error => {
            console.log('error:', error)
            db.close()
        })
})
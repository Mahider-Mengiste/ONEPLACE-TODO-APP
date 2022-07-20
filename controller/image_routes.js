// Import Dependencies
const { append } = require('express/lib/response')
const Image = require('../models/image')
const express = require('express')
const multer = require('multer')
const router = express.Router()

// GET - route
// localhost:3000/images/add
router.get('/add', (req, res) => {
    res.render('images/add')
})

// store the image that is uploaded form the client side to /uploads directory
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {

    cb(null, file.fieldname + '-' + Date.now() + '_' + file.originalname)
    },
});

// multer middleware
const upload = multer({ 
    storage: storage,
}).single("image")

// POST - route 
// localhost:3000/users/add
router.post('/add',upload, (req, res) => {
    // store the newly uploaded file inside image
    const image = new Image({
    image: req.file.filename,
    });
    // save the image inside the database
    image.save((err) => {
        if(err){
            res.json({message: err.message, type: 'danger'})
        } else {
            req.session.message = {
                message: 'Image added succesfully'
            }
            res.redirect('/images/add');
        }
    });
}) 

module.exports = router
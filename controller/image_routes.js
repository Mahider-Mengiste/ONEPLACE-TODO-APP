// import dependencies
const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
// import Image model form models directory
const Image = require('../models/image')
const multer = require('multer')


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

const upload = multer({ 
    storage: storage,
}).single("image")


// POST - route to post the images to the database
// localhost:3000/users/add
router.post('/add',upload, (req, res) => {
    const image = new Image({
    image: req.file.filename,
    });
    image.save((err) => {
        if(err){
            res.json({message: err.message, type: 'danger'})
        } else {
            req.session.message = {
                type: 'success',
                message: 'Image added succesfully'
            }
            res.redirect('/images/add');
            // res.redirect('/');
        }
    });
}) 



// export router
module.exports = router
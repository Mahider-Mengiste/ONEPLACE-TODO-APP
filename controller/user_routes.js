// import dependencies
    const express = require('express')
    const { append } = require('express/lib/response')
    const User = require('../models/user')
    const bcrypt = require('bcryptjs')
    // Create a router
    const router = express.Router()

// list our our routes
    // two sign up routes
    // one GET to show the form
    // localhost:3000/users/signup
        router.get('/signup', (req, res) => {
            res.render('users/signup')
        })
        // one POST to make the db request
        // localhost:3000/users/signup
        router.post('/signup', async (req, res) => {
            console.log('request body before hashing', req.body)
            // when we use async func, inside that we can wait for certain things before progressing
                // if password is not hashed then we can not move forward
            // password is encrpted first
            // encrypting password takes time, we have to wait we move on. 
            req.body.password = await bcrypt.hash(
                req.body.password,
                await bcrypt.genSalt(10)
            )
            // now that our password is hashed, we can create a user
            console.log('request body after hashing', req.body)
            User.create(req.body)
            // if created successfully, we'll redirect to the login page 
                .then(user => {
                    console.log('new user', user)
                    res.redirect('/users/login')
                })
            // if created was unsuccessful, send the error
                .catch(error => {
                    console.log(error)
                    res.json(error)
                })
        })

    // two login routes
        // one GET to show the form
        router.get('/login', (req, res) => {
            res.render('users/login')
        })
        // one POST to login and create the session
        router.post('/users/login', (req, res) => {
            
        })

    // logout route
        // can be a GET that calls destroy on our session
        // we can add an 'are you sure' page if there is time

// export our router
    module.exports =  router
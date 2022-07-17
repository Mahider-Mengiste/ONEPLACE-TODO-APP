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
        router.post('/login', async (req, res) => {
        // destructure username and password from body object 
        const { username, password } = req.body
        console.log('this is the session', req.session)
        //  find user
        User.findOne({ username })
        // store the promised data username as user and pass it to then
            .then(async (user) => { 
                // if user exists, compare and see if the password is right
                if (user) {
                    const result = await bcrypt.compare(password, user.password)
                    if (result) {
                        //    if the compare value comes as truthy, then we will store it in the session
                        req.session.username = username
                        req.session.loggedIn = true
                        req.session.userId = user._id
                        console.log('this is the session after login', req.session)
                        res.redirect('/todos')
                    } else {
                        // else if it is not correct send an error message
                        res.json({ error: 'username or password incorrect' })
                    }
                } else {
                    // send error if user doesn't exist
                    res.json({ error: 'user does not exist' })
                }
            })
            .catch(error => {
                console.log(error)
                res.json(error)
            })
    })

    // logout route
    // can be a GET that calls destroy on our session
    // we can add an 'are you sure' page if there is time
    router.get('/logout', (req, res) => {
    // destroy the session and redirect to login page for users to log in again 
    req.session.destroy(ret => {
        console.log('this is returned from req.session.destroy', ret)
        console.log('session has been destroyed')
        console.log(req.session)
        res.redirect('/users/login')
    })
})

// export our router
    module.exports =  router
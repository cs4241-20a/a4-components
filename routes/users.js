const express = require('express')
const User = require('../models/User')
const passport = require('passport')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { name, password } = req.body

    const isDuplicate = await User.find({ name: name })
    
    if(isDuplicate.length > 0) return res.send({msg: 'Error: Name is already taken'})
    else {
        const newUser = new User({name, password})

        newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.send({ msg: `Eroor: ${err}` }))
    }

})

// router.post('/signin', (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect: '/'
//     })(req, res, next)
// })

router.post('/signin', passport.authenticate('local'), (req, res) => {
    const username = req.user.name
    res.send({ message: `User ${username} has signed in.` })
})

router.get('/users', (req, res) => {
    User.find()
    .then(users => res.send(users))
    .catch(e => console.log(e))
})



router.get('/login/github', passport.authenticate('github'))

// user will be redirect to this route after OAuth succeed
router.get('/login/github/callback', (req, res, next) => {
    passport.authenticate('github', { 
        failureRedirect: '/users/signin',
        successRedirect: '/home'
    })(req, res, next)
})

module.exports = router
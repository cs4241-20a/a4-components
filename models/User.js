const mongoose = require('mongoose')
const Book = require('./Book')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
})


  // Middleware allows us to register some functions to run before or after an event occurs
  userSchema.pre('save', async function (next) { 
    // keyword this gives us access to the current user
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
}) 

// on removing the user, also remove their boks records
userSchema.pre('remove', async function(next) {
    const user = this
    await Book.deleteMany({ owner: user._id })

    next()
})

const User = mongoose.model('users', userSchema)

module.exports = User
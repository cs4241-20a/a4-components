const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')

require('dotenv').config()

const app = express()
const port = process.env.PORT ||  5000

app.use(cors())
app.use(express.json())

const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Passport config
require('./config/passportLocal.js')(passport)
require('./config/passportGithub')(passport)

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    })
)

app.use(passport.initialize())
app.use(passport.session())

const bookRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.use('/', bookRouter)
app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
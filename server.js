require( 'dotenv' ).config()
const bodyParser = require('body-parser');    // 1. middleware for JSON parsing
const GitHubStrategy = require('passport-github').Strategy;
const timeout = require('connect-timeout')
const { request } = require('express');
const express = require('express')
const passport = require('passport');
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const ObjectID = require('mongodb').ObjectID
const PORT = process.env.PORT


const app = express()

app.set('trust proxy', 1)




const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://project4:${process.env.DBPASSWORD}@cluster0.gmbny.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null;
client.connect(err => {
    collection = client.db("datatest").collection("test");
});


// passport.use(new GitHubStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "https://cs4518-assignment3.herokuapp.com/auth/github/callback"
//     // callbackURL: "http://127.0.0.1:3000/auth/github/callback"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         User.findOrCreate({ githubId: profile.id }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
//   });
  
//   passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
//   });

// MIDDLEWARE ---------------------------------------------------------

// Bodyparser - this is used throughout the server for parsing information coming from the client

// now bringing logging near you!
// writing out to the local dir
var logStream = fs.createWriteStream(path.join(__dirname, 'website.log'), { flags: 'a' })

app.use(morgan('combined', { stream: logStream }))


// for checking connection to the server
app.use((req, res, next) => {
    if (collection !== null) {
        next()
    } else {
        res.status(503).send()
    }
})

// serving up delicious static files
app.use(express.static("public"));

// setting timeouts for requests to prevent long stalls 
app.use(timeout('7s'));

app.get('/auth/github',
    passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function (req, res) {
        console.log("Successful authentication, redirect home.")
        // res.redirect('/');
        window.location = "/index"
    });


// Init session
app.use(passport.initialize());
app.use(passport.session());


let currentUser = null


app.use(function (req, res, next) {
    console.log("Incoming request for " + req.url)
    next()
})

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/login.html");
});

app.get("/index", (request, response ) => {
    // passport.authenticate( 'github', { failureRedirect: '/'}),
    // function(request, response) {
    //     response.redirect('/index')
    response.sendFile(__dirname + "/views/index.html");
});

app.get("/listings", (request, response) => {
    collection
        .find({ lister: currentUser }).toArray()
        .then(dbresponse => {
            console.log("Loading user listings...")
            listings[currentUser] = dbresponse
        })
    response.json(listings[currentUser])

});

app.post("/logout", (request, response) => response)

app.post("/login", bodyParser.json(), (request, response) => {
    collection

        .find({ id: 1 }).toArray()

    incomingLogin = request.body


    var loginAttempt = { login: "bad" }
    collection
        .findOne({ username: incomingLogin.username }, { "_id": 1 })
        .then(dbresponse => {
            // console.log( dbresponse )
            if (dbresponse === null) {
                collection.insertOne(incomingLogin)
                console.log("adding user with username: " + incomingLogin.username)
                currentUser = incomingLogin.username
                loginAttempt.login = "good"
                listings[currentUser] = []
                response.json(loginAttempt)
            } else {
                if (dbresponse.password === incomingLogin.password) {
                    console.log("all good")
                    currentUser = incomingLogin.username
                    loginAttempt.login = "good"

                    // now let's track down their listings too
                    collection.find({ lister: currentUser }).toArray()
                        .then(dbresponse => {
                            console.log("Loading user listings...")
                            listings[currentUser] = dbresponse
                            response.json(loginAttempt)
                        })

                } else {
                    console.log("no")
                    loginAttempt.login = "bad"
                    response.json(loginAttempt)
                }
            }
        })
        // passport.authenticate('github')
    // console.log( stats )
})

app.post("/submit", bodyParser.json(), (request, response) => {
    // console.log(request.body )
    incomingData = request.body
    incomingData.lister = currentUser
    listingsLength = listings[currentUser].length
    // console.log( listingsLength )
    // console.log( listings[currentUser])
    if (listingsLength === 0) {
        incomingData.id = 1
        // listings[currentUser].push( incomingData )
    } else if (parseInt( listings[currentUser][listingsLength - 1].id ) === listingsLength ){
        // the last ID and length matches!
        
        incomingData.id = listings[currentUser].length + 1
        // console.log( "the last ID and length matches!" + incomingData.id )
        // listings[currentUser].push( incomingData )
    } else {
        for (var i = 0; i < listingsLength; i++) {
            console.log(listings[currentUser][i] )
            if ( parseInt( listings[currentUser][i].id ) !== i + 1) {
                incomingData.id = i + 1
                // console.log( "sliding in extra data" + incomingData.id )
                // listings[currentUser].splice( i, 0, incomingData )
                break
            }
        }
    }
    collection
        .insertOne(incomingData)
        .then(dbresponse => {
            listings[currentUser].push(incomingData)
        })
    collection
        .find({ lister: currentUser }).toArray()
        .then(dbresponse => {
            console.log("Loading user listings...")
            listings[currentUser] = dbresponse
        })
    response.json(listings[currentUser])
    //   console.log( stats )
})

app.post("/update", bodyParser.json(), (request, response) => {

    updatedListing = request.body
    updatedListing.lister = currentUser
    collection
        .findOne({ id: parseInt(request.body.id), lister: currentUser })
        .then(dbresponse => {
            dbID = dbresponse._id
            collection
                .deleteOne({ _id: ObjectID(dbID) })

        })
    collection
        .insertOne(updatedListing)

    collection
        .find({ lister: currentUser }).toArray()
        .then(dbresponse => {
            console.log("Loading user listings...")

            listings[currentUser] = dbresponse
        })
    response.json(listings[currentUser])

})

app.post("/delete", bodyParser.json(), (request, response) => {

    let dbID = null
    collection
        .findOne({ id: parseInt(request.body.id), lister: currentUser })
        .then(dbresponse => {
            dbID = dbresponse._id

            collection
                .deleteOne({ _id: ObjectID(dbID) })

        })
    collection
        .find({ lister: currentUser }).toArray()
        .then(dbresponse => {
            console.log("Loading user listings...")

            listings[currentUser] = dbresponse
        })


    response.json(listings[currentUser])

})

const listings = {}



app.listen(PORT)
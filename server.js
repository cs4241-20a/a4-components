// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local")
var passportLocalMongodb = require("passport-local-mongoose");
var User = require("./models/user");
const uri = `mongodb+srv://ssyeda:${process.env.DBPASSWORD}@cluster0.59cif.mongodb.net/datatest?retryWrites=true&w=majority`;


mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri, {useNewUrlParser: true}); 



// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("build"));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/login.html");
});

//Showing login form 
app.get("/login", function (req, res) { 
    res.sendFile(__dirname + "/views/index.html"); 
}); 

app.get("/user", (req, res) => {
  if(collection !== null){
     collection.find({}).toAray
    .then(result => res.json(result))
     }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

const client = new MongoClient(uri, { useUnifiedTopology: true });
var resultsArray = [];
let collection = null
let userID = null

client.connect(err => {
  collection = client.db("datatest").collection("test");  
});

  
//Handling user login 
app.post("/login", bodyParser.json, function (req, res) { 
    var username = req.body.username 
    var password = req.body.password 
    
    collection.countDocuments({username: {$in: [username]}})
      .then((result) => {
        if(result > 0){
          collection.find({name: {$in: [username]}}, {limit: 1}).toArray((err, result2) => {
            if(password !== result2[0].password){
              res.json({message: "wrong pw"})
              return
            }else {
              userID = result2[0]._id
              res.json({message: "user exists"})
              return
            }
          })
        }else{
          collection.insertOne({username:username, password:password})
            .then(dpresponse => {userID = dpresponse.ops[0]._id})
          res.json({message: "new user"})
          return
        }
      
    })
//     User.register(new User({ username: username }), 
//             password, function (err, user) { 
//         if (err) { 
//             console.log(err); 
//             return res.sendFile(__dirname + "/views/index.html");
//         } 
  
//         passport.authenticate("local")( 
//             req, res, function () { 
//             res.sendFile(__dirname + "/views/index.html"); 
//         }); 
//     }); 
//     res.redirect("/login")
})

// function isLoggedIn(req, res, next) { 
//     if (req.isAuthenticated()) return next(); 
//     res.redirect("/login"); 
// } 

app.post("/add", bodyParser.json(), function(req, res) {
  resultsArray.push(req.body)
  res.json(resultsArray)
})

app.post('/delete', bodyParser.json(), function(req, res){
    collection
    .deleteOne({ _id:mongodb.ObjectID( req.body.id ) })
    .then( result => {
      res.json( result )
      resultsArray.pop()
      console.log(resultsArray)
    })
})

app.post( '/modify', bodyParser.json, function(req,res){
  collection
    .updateOne(
      { _id:mongodb.ObjectID( req.body.id ) },
      { $set:{ dream: req.body.dream } }
    ).then( result => res.json( result ) )
})

client.close();


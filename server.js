// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

// import from npm
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const GithubStrategy = require("passport-github").Strategy;
const cookieSession = require("cookie-session");
const favicon = require("serve-favicon")
const mongodb = require("mongodb");
const helmet = require("helmet");
const cors = require('cors')
const path = require('path')
require('dotenv').config();

// set up mongodb
const MongoClient = mongodb.MongoClient;
const uri =
  "mongodb+srv://dbUser:dbUserPassword@a3-recipe-book.xyl2m.mongodb.net/recipes?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let collection = null;

client.connect(err => {
  collection = client.db("recipebook").collection("recipes");
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// app.use( helmet({
//     contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'", "https:"],
//       objectSrc: ["'none'"],
//       upgradeInsecureRequests: [],
//     },},
//   }))

// Set up cookie session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["randomstringhere"]
  })
);
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// Strategy config for Github OAuth
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "https://carlypereira-a4-components.glitch.me/auth/github/"
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile); // passes the profile data to serializeUser
    }
  )
);

// Used to stuff a piece of information into a cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.user = "";
    next();
  }
}

// passport.authenticate middleware is used here to authenticate the request
app.get(
  "/auth/",
  passport.authenticate("github", {
    scope: ["profile"] // Used to specify the required data
  }));

// The middleware receives the data from github and runs the function on Strategy config
app.get("/auth/github/", passport.authenticate("github"), (req, res) => {
  res.redirect("/");
});

// Logout route
app.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get("/api/isLoggedIn", isUserAuthenticated, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ loggedIn: req.user != ""}));
})

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "public/src/main.html");
});

// Secret route
app.get("/main", isUserAuthenticated, (req, res) => {
  console.log(req.user);
  res.sendFile(__dirname + "public/public/main.html");
});

app.get("/api/recipes", (req, res) => {
  if (collection !== null) {
    // get array and pass to res.json
    collection
      .find({ user: req.user.id })
      .toArray()
      .then(result => res.json(result));
    console.log("Returning some json...")
  } else {
    res.json({Error: "No Collection"})
  }
});


app.post("/api/add", bodyParser.json(), (request, response) => {
  collection
    .insertOne(Object.assign({}, request.body, { user: request.user.id }))
    .then(dbresponse => {
      console.log(dbresponse);
      response.json(dbresponse.ops[0]);
    });
});

app.post("/api/update", bodyParser.json(), (req, res) => {
  console.log(req.body);
  collection
    .updateOne(
      { _id: mongodb.ObjectID(req.body.id), user: req.user.id },
      {
        $set: {
          name: req.body.name,
          type: req.body.type,
          time: req.body.time,
          ingredients: req.body.ingredients,
          directions: req.body.directions
        }
      }
    )
    .then(result => res.json(result));
});

app.post("/api/delete", bodyParser.json(), (request, response) => {
  collection
    .deleteOne({
      _id: mongodb.ObjectID(request.body.id),
      user: request.user.id
    })
    .then(result => response.json(result));
});

// listen for requests :)
const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

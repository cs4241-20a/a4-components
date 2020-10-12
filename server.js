const express  = require( 'express' ),
      app      = express(),
      bp       = require( 'body-parser')

const todos = [
  { name:'buy groceries', completed:"yes", numScoops:10, id:0 }
]

//changes 2
/* PASSPORT ADDITIONS */
const passport = require('passport');

// /*compression additions */
var compression = require('compression')
// compress all responses
app.use(compression())
// /*end of compression additions */

// /*morgan additions */
// app.use(require('morgan')('combined'));
// /* end of morgan additions */

app.listen(process.env.PORT || 5000)

const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: "cbec862a05635fb23d9d",
    clientSecret: "63089da72d4340bd55a34dbaa1843829759ca66a",
    callbackURL: "https://a4-ahjicha.herokuapp.com/return"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
      return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});


app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.get('/auth/github',
passport.authenticate('github'));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', 
(req, res) => res.sendFile('/public/auth.html', { root : __dirname, user: req.user}),
require('connect-ensure-login').ensureLoggedIn(),
);

app.get('/home', 
(req, res) => res.sendFile('/public/index.html', { root : __dirname, user: req.user}),
require('connect-ensure-login').ensureLoggedIn(),
);

  app.get('/auth/github',
  passport.authenticate('github'));

let userID;
app.get('/error', (req, res) => res.send("error logging in"));

app.get('/return',
  passport.authenticate('github', { failureRedirect: '/error' }),
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    userID = req.user.id
    // console.log("user ID:", userID);
    res.redirect('/home');
  });

/* END OF PASSPORT ADDITIONS */


//changes 1
// const listener = app.listen(process.env.PORT ||3000 , () => {
//   console.log("Your app is listening on port " + listener.address().port);
// });

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

DBPASSWORD = "9PYnye8sGzxBISC4"
// const uri = `mongodb+srv://test-user:${process.env.DBPASSWORD}@cluster0.ys3tz.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const uri = `mongodb+srv://test-user:9PYnye8sGzxBISC4@cluster0.ys3tz.mongodb.net/datatest?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection = null;
client.connect(err => {
  collection = client.db("datatest").collection("test");
});

//end of changes 1

app.use( bp.json() )
app.use( express.static( 'public' ) )

/* get all dreams on initial load */
// app.get("/dreams", (request, response) => {
//   collection.find({ user: userID }).toArray((err, docs) => {
//     if (err) {
//       // if an error happens
//       response.send("Error in GET req.");
//     } else if (docs.length == 0){
//         response.send("new user");
//     } else {
//       // if all works
//       console.log(docs);
//       response.send(JSON.stringify(docs)); // send back all users found with the matching username
//     }
//   });
// });

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})


app.post( '/changeName', function( req,res ) {
  const idx = todos.findIndex( v => v.id == req.body.id )
  todos[ idx ].name = req.body.name
  
  res.sendStatus( 200 )

})
app.post( '/delete', function( req,res ) {
  const idx = todos.findIndex( v => v.id === req.body.id )
  todos.splice(idx, 1)
  res.json( todos )
})

// app.post("/delete", bodyparser.json(), function(req, res) {
//   console.log("body: ", req.body);
//   collection
//     .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
//     .then(result => res.json(result));
// });

// app.listen(process.env.PORT || 5000)

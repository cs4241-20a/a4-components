const express  = require( 'express' ),
      app      = express(),
      bp       = require( 'body-parser')

const todos = [
  { name:'buy groceries', completed:"yes", numScoops:10, id:0 }
]



const listener = app.listen(process.env.PORT ||3000 , () => {
  console.log("Your app is listening on port " + listener.address().port);
});

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



app.use( bp.json() )
app.use( express.static( 'public' ) )

/* get all dreams on initial load */
app.get("/dreams", (request, response) => {
  collection.find({ user: userID }).toArray((err, docs) => {
    if (err) {
      // if an error happens
      response.send("Error in GET req.");
    } else if (docs.length == 0){
        response.send("new user");
    } else {
      // if all works
      console.log(docs);
      response.send(JSON.stringify(docs)); // send back all users found with the matching username
    }
  });
});

// app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})


app.post( '/changeName', function( req,res ) {
  const idx = todos.findIndex( v => v.id == req.body.id )
  todos[ idx ].name = req.body.name
  
  res.sendStatus( 200 )

})
// app.post( '/delete', function( req,res ) {
//   const idx = todos.findIndex( v => v.id === req.body.id )
//   todos.splice(idx, 1)
//   res.json( todos )
// })

app.post("/delete", bodyparser.json(), function(req, res) {
  console.log("body: ", req.body);
  collection
    .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
    .then(result => res.json(result));
});

// app.listen(process.env.PORT || 5000)

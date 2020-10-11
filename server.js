const express  = require( 'express' ),
      app      = express(),
      bp       = require( 'body-parser')

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://user123:${process.env.DBPASSWORD}@cluster0.i7qnb.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null;
client.connect(err => {
  collection = client.db("datatest").collection("test");
  console.log(collection);
});

const todos = []

app.use( bp.json() )
app.use( express.static( 'public' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

app.post( '/change', function( req,res ) {
  const idx = todos.findIndex( v => v.name === req.body.name )
  todos[ idx ].completed = req.body.completed
  
  res.sendStatus( 200 )
})

app.post('/delete', bp.json(), function(req, res) {
  console.log("delete-body:", req.body);
  collection
    .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
    .then(result => res.json(result));
  
   res.sendStatus( 200 )
});


/*app.post("/login", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});*/

app.post('/update', bp.json(), (req, res) => {
  collection
    .updateOne(
      { _id: mongodb.ObjectID(req.body.id) },
      { $set: { task: req.body.task } }
    )
    .then(result => res.json(result));
});



app.listen( 3000 )
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
app.use(cors());

let verUser = null;

app.use(express.static('public'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://KaiserNex:sYs1CXaPs6hgsupu@a3-cluster.enhbv.mongodb.net/datatest?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null
let loginCollection = null

client.connect(err => {
  collection = client.db("datatest").collection("test")
  loginCollection = client.db("datatest").collection("Accounts")
});

app.get("/pop",bodyparser.json(), (req,res) =>{
	console.log('tried to poop and it got stuck');
  collection.find({user: verUser}).toArray(function(err, result){
    if(err) throw err;
    console.log(result);
    res.json(result);
  })
})


app.post("/add", bodyparser.json(), (req, res) => {
  collection.insertOne({user: verUser,dream: req.body.dream})
  .then( dbresponse => {
    console.log( dbresponse )
    res.json( dbresponse.ops[0])
  })
})

app.post( '/delete', bodyparser.json(), function( req, res ) {
  collection
    .deleteOne({_id:mongodb.ObjectID( req.body.id ) })
    .then( result => res.json( result ) )
})

app.post("/edit", bodyparser.json(), (req, res) =>{
  console.log(req.body.old)
  collection
    .updateOne({dream:req.body.old}, {$set: {dream:req.body.new}})
  res.json({stuff: "test"});
})

app.post('/login', bodyparser.json(),(req, res) =>{
  console.log("Heyo")
  console.log(req.body.uname)
  loginCollection.find({uname: req.body.uname}).toArray(function(err, result){
    if (err) throw err;
    if(result.length == 0){
      loginCollection.insertOne({uname: req.body.uname, psw: req.body.psw})
      .then( dbresponse => {
        console.log( dbresponse.ops[0].uname )
        verUser = req.body.uname;
        res.json({newu: true,login: true})
      })
    }
    else{
      console.log(req.body.psw)
      console.log(result[0].psw)
      if(req.body.psw == result[0].psw) {
        verUser = req.body.uname;
        res.json({newu:false,login: true})
      }
      else{
        res.json({login: false})
      }
    }
  })
})
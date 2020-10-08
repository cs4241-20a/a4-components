require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const uri = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.pq9gz.mongodb.net/<dbname>?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true })
let collection = null;
let cardCollection = null;
client.connect(err => {
    collection = client.db("data").collection("test") 
    cardCollection = client.db("data").collection("cardtest")
})

app.use( (req,res,next) => {
    if( collection !== null ) {
      next()
    }else{
      res.status( 503 ).send()
    }
})

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.post("/login", bodyParser.json(), (req, res)=> {
    collection.findOne({username:req.body.username, password:req.body.password}, (err, result)=> {
        if(err) throw err
        if(result==null) res.send({status:"failed"})
        else res.send({username: result.username, status:"success"})
    })
})
app.post("/addcard", bodyParser.json(), (req, res)=> {
    cardCollection.insertOne(req.body).then(r=>{
        res.send(r.ops[0])
    })
})
app.post("/signup", bodyParser.json(), (req, res)=> {
    collection.findOne({username:req.body.username}, (err, result)=> {
        if(err) throw err
        if(result==null)collection.insertOne(req.body).then(dbresponse=>res.send({username:req.body.username, status:'success'}))
        else res.send({status:'failure'})
    })    
})
app.post('/load', bodyParser.json(), (req,res)=>{
    cardCollection.find({username:req.body.username}).toArray((err,results)=> {
        res.send(results)
    })
})

app.post('/editcard', bodyParser.json(), (req,res)=> {
    cardCollection.updateOne({_id:mongodb.ObjectID(req.body.id)},{$set:{name:req.body.name, manacost:req.body.manacost, type:req.body.type, abilities:req.body.abilities, flavortext:req.body.flavortext, rarity:req.body.rarity}})
    .then(()=>cardCollection.find({username:req.body.username}).toArray((err,results)=> {
        res.send(results)
    }))
})
app.post('/deletecard', bodyParser.json(), (req,res)=> {
    cardCollection.deleteOne({_id:mongodb.ObjectID(req.body.id)})
    .then(()=>cardCollection.find({username:req.body.username}).toArray((err,results)=> {
        res.send(results)
    }))
})

app.get('*', (req, res)=>{
    res.status(200).sendFile(path.join(__dirname, "..", "build", "index.html"))
})

app.listen(3000, () => {
    console.log('server started on port 3000')
})
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bp = require('body-parser')

app.use(express.static(path.join(__dirname, 'build')))
app.use(bp.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://dbUser:llsLiz12@cluster0.yeato.mongodb.net/<dbname>?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let collection = null;
client.connect(err => {
    collection = client.db("datatest").collection("test");
});

//2nd table
let userCollection = null;
client.connect(err => {
  userCollection = client.db("datatest").collection("users");
});

let username = null //SHOULD BE NULL. CHANGE LATER
//Gets items in list for specific user
app.get("/items", bp.json(), function (req, res) {
    console.log("Getting for:", username)
    var query = { username: username }
    collection.find(query).toArray()
        .then(result => res.json(result))
})

//Add
app.post("/addItem", bp.json(), function (req, res) {
    let json = { dream: req.body.dream, username: username }
    console.log("Adding: ", json);
    collection.insertOne(json).then(dbresponse => {
        res.json(dbresponse.ops[0]);
    });
});

//Delete
app.post("/delete", bp.json(), function (req, res) {
    console.log("Removing: ", req.body)
    collection
        .deleteOne({ _id: mongodb.ObjectID(req.body.id) })
        .then(result => res.json(result));
});

//Edit
app.post("/edit", bp.json(), function (req, res) {
    console.log("Editing: ", req.body)
    collection
        .updateOne(
            { _id: mongodb.ObjectID(req.body.id) },
            { $set: { dream: req.body.dream, username: username } }
        )
        .then(result => res.json(result))
})

//Logs a user in
app.post("/login", bp.json(), function (req, res) {
    console.log("Logging in:", req.body)
    username = req.body.username
    var query = { username: username, password: req.body.password }
    console.log("Finding user:", query)
    userCollection.find(query).toArray()
        .then(result => res.json(result))
});

//logs a user out. Should be used in ItemList.js
app.post("/logout", bp.json(), function (req, res) {
    console.log("Logging out:", req.body)
    username = null
    console.log("Logged out:", username)
});

//creates an account
app.post("/create", bp.json(), function (req, res) {
    let json = { username: req.body.username, password: req.body.password }
    console.log("Creating account: ", req.body)
    username = req.body.username
    console.log("Logged in:", username)
    userCollection.insertOne(json).then(dbresponse => {
        res.json(dbresponse.ops[0]);
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});
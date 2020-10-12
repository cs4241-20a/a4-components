//server script
require("dotenv").config();
const express = require("express"),
  bp = require("body-parser"),
  compression = require("compression"),
  mongodb = require("mongodb"),
  app = express(); //start app


app.use(bp.json());
app.use( express.static( 'public' ) )
app.use(compression())


//----------MONGO----------
let connection = null;
let UserData = null;
let dataCollection = null;

const uri =
  "mongodb+srv://" +
  process.env.USER +
  ":" +
  process.env.PASS +
  "@" +
  process.env.HOST +
  "/UserData" +
  process.env.DB;

const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect().then(__connection => {
  // store reference to collection
  connection = __connection;
  UserData = connection.db("UserData");
  dataCollection = connection.db("UserData").collection("data");
});

app.use((req, res, next) => {
  if (connection !== null) {
    next();
  } else {
    res.status(503).send();
    console.log("503"); //no database
  }
});

//----------MONGO----------

//----------POST METHODS----------
app.post("/add", (req, res) => {
  let fromClient = req.body;
  fromClient.username = req.session.login;
  dataCollection
    .find({ username: fromClient.username })
    .toArray()
    .then(arr => {
      if (arr.some(row => row.route === req.body.route)) {
        console.log("sending not adding :/");
      } else {
        dataCollection.insertOne(fromClient).then(result => {
          console.log(result.ops[0]);
          dataCollection
            .find({ username: fromClient.username })
            .toArray()
            .then(r => res.json(r)); //send table
        });
      }
    });
});

app.post("/update", (req, res) => {
  let fromClient = req.body;
  fromClient.username = req.session.login;
  dataCollection
    .find({ username: fromClient.username })
    .toArray()
    .then(arr => {
      if (!arr.some(row => row.route === req.body.route)) {
        console.log("nothing to delete :/");
      } else {
        dataCollection
          .updateMany(
            {
              //going to delete something
              _id: mongodb.ObjectID(
                arr.find(record => record.route === req.body.route)._id //find the first record in array and get id
              )
            },
            {
              $set: {
                //set multiple fields
                time: req.body.time,
                distance: req.body.distance,
                fitness: req.body.fitness
              }
            }
          )
          .then(result => {
            dataCollection
              .find({ username: fromClient.username })
              .toArray()
              .then(r => res.json(r)); //send updated table
          });
      }
    });
});

app.post("/delete", (req, res) => {
  let fromClient = req.body;
  fromClient.username = req.session.login;
  dataCollection
    .find({ username: fromClient.username })
    .toArray()
    .then(arr => {
      if (!arr.some(row => row.route === req.body.route)) {
        console.log("nothing to delete :/");
      } else {
        dataCollection
          .deleteOne({
            //going to delete something
            _id: mongodb.ObjectID(
              arr.find(record => record.route === req.body.route)._id //find the first record in array and get id
            )
          })
          .then(result => {
            dataCollection
              .find({ username: fromClient.username })
              .toArray()
              .then(r => res.json(r)); //send table
          });
      }
    });
});

app.post("/load", (req, res) => sendTable(req, res));

const sendTable = function(req, res) {
  let fromClient = req.body;
  fromClient.username = req.session.login;
  dataCollection
    .find({ username: fromClient.username })
    .toArray()
    .then(r => res.json(r)); //send table
};


const listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

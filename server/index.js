const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const responsetime = require('response-time')
const morgan = require('morgan')
const path = require('path')
const favicon = require('serve-favicon')
const mime = require('mime')


const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const { ssl_op_ephemeral_rsa } = require("constants")
const uri = `mongodb+srv://rfdolan:${process.env.MONGOPASSWORD}@cluster0.jpq6i.mongodb.net/${process.env.DBNAME}?retrywrites=true&w=majority`;
const client = new MongoClient( uri, {usenewurlparser: true, useunifiedtopology: true})

let collection = null
let currentuser = "ray"
let isgithubuser = false

client.connect()
  .then( () => {
    // will only create collection if it doesn't exist
    return client.db( 'webware' ).collection( 'creatures' )
  })
  .then( __collection => {
    // store reference to collection
    collection = __collection
    // blank query returns all documents
    return //collection.find({ }).toarray()
  })
  .then(/* console.log */)


// automatically deliver all files in the public folder
app.use( express.static('public/images'))
app.use( express.static('public/js'))
app.use( express.static('public/css'))

// get json when appropriate
app.use( bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

/*
app.use( responsetime())

app.use(morgan('combined'))
*/


app.use( express.static( 'build'))

app.use( (req, res, next) => {
    if( collection !== null) {
        next()
    } else {
        res.status( 503 ).send()
    }
})

/*
// get request for login / starting screen
app.get('/', (req, res) => {
    if(currentuser !== "") {
        console.log("user:",currentuser)
        res.sendfile(path.join(__dirname,'public/index.html'));
    } else {
        res.sendfile(path.join(__dirname,'public/login.html'))
    }
});

// if the user is not logged in, send a 403 and lock them out of accessing the page
app.get('/index.html', function (req, res){
  if(currentuser === ""){
    res.sendfile(path.join(__dirname,'public/login.html'));
  }
  else {
    res.sendfile(path.join(__dirname,'public/index.html'))
  }
})

// get request to check if a user is logged in
// send a 500 if not so that the user is sent back to the login screen
app.get('/loggedin', function (req, res){
  if(currentuser == ""){
    res.sendstatus(500)
  }
  else{
    res.sendstatus(200)
  }
})
*/

// get everything
app.get( '/appdata', (req, res) =>{
    // get stuff from db
    if(collection !== null ) {
        //console.log("getting all")
        getall().then(result => (res.json(result)))
    }
})

app.post( '/add',  async function( req, res ) {
    let posteddata = req.body

    posteddata.userName = currentuser

    posteddata.num = parseInt(posteddata.num)
    posteddata.ac = parseInt(posteddata.ac)
    posteddata.hp = parseInt(posteddata.hp)

    const currcreatures = await collection.find({userName: currentuser}).toArray()
    let ordernum= determineorder(currcreatures, posteddata)

    posteddata.order = ordernum;

    editallhigher(currcreatures, ordernum)

    await collection.insertOne(posteddata )
    const allcreatures = await getall()
    //console.log(allcreatures)
    res.json(allcreatures)
    return res.end()
  })

  async function getall() {
    const allcreatures = await collection.find({userName: currentuser}).toArray()
    //console.log("Gotten creatures from getall:",allcreatures)
    return allcreatures.sort(compare)
  }



app.post( '/remove', async function(req, res)  {
    await collection.deleteOne({ _id: mongodb.ObjectID( req.body._id ) })
    await closegap(req.body.order)
    // Do this twice because it gets the old data for some reason aaaaa
    await getall()
    const allcreatures = await getall()
    res.json(allcreatures)
    return res.end()

})

const closegap = async (ordernum) =>{
    //console.log("Calling in closegap")
    const currcreatures = await getall()
    //console.log("creatures:",currcreatures)
    currcreatures.forEach(async (creature) =>{
        if(creature.order >= ordernum) {
            await collection.updateOne(
                { _id: mongodb.ObjectID( creature._id)},
                { $set:{ order:creature.order-1}}
        )}
    })

   // console.log("End of closegap function, currcreatures:",currcreatures)
}

app.post( '/move', async function(req, res) {
    let posteddata = req.body
    let target = await collection.find({userName: currentuser, _id: mongodb.ObjectID( posteddata.id)}).toArray()
    let other = await collection.find({userName:currentuser, order:parseInt(posteddata.order)-parseInt(posteddata.movedir)}).toArray()

    target = target[0]
    other=other[0]
    console.log("target:", target)
    console.log("other:", other)
    if(other !== undefined && target !== undefined){
        console.log("not null")
        if(target.num === other.num) {
            console.log("same init")
            await collection.updateOne(
                { _id: mongodb.ObjectID(posteddata.id)},
                { $set:{order: parseInt(other.order)}}
            )
            await collection.updateOne(
                { _id:  mongodb.ObjectID(other._id)},
                { $set:{order: parseInt(target.order)}}
            )
        }
    }
    //await getall()

    await getall().then(result => res.json(result))

})

app.post( '/login',  async function(req, res)  {
    if(currentuser !== "") {
        res.sendstatus(200)
        return res.end()
    }
    let userdata = req.body
    let username = userdata.username
    let password = userdata.password

    usercollection = await client.db('webware').collection('users')
    const user = await usercollection.find({username}).toArray()
    // user does not exist, create them
    if(user.length === 0) {
        await usercollection.insertOne(userdata)
        currentuser = username
        res.sendstatus(200)
    // user exists, check password
    } else {
        if(user[0].password === password) {
            currentuser = username
            res.sendstatus(200)
        } else {
            currentuser = ""
            res.sendstatus(500)
        }
    }
})

function determineorder (currcreatures, toadd) {
    let currplacement = 0;
    currcreatures.forEach((creature) => {
        /*
        console.log("creature:",creature)
        console.log("toadd:",toadd)
        
        if(parseInt(creature.num) < parseInt(toadd.num))
            console.log('reality is strange')
            */
        if(parseInt(creature.num) < parseInt(toadd.num) && parseInt(creature.order) >= parseInt(currplacement)) {
            currplacement = creature.order + 1
        }
    })
    return currplacement
}

async function editallhigher(currcreatures, ordernum) {
    currcreatures.forEach((creature) =>{
        if(creature.order >= ordernum) {
            collection.updateOne(
                { _id: mongodb.ObjectID( creature._id)},
                { $set:{ order:creature.order+1}}
        )
        }
    })

}

// helper to sort array of creatures
function compare(a,b) {
    if(a.order > b.order) return 1;
    if(b.order > a.order) return -1;

    return 0;
}




const listener = app.listen( process.env.PORT, ()=> {
  console.log( 'your app is listening on port ' + listener.address().port )
})
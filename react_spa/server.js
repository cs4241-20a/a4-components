const express  = require( 'express' ),
    app      = express(),
    mongodb  = require( 'mongodb' ),
    bp       = require( 'body-parser')


var data = [
    "Patrick Star Freshman 4 2020 B-",
    "Spongebob Squarepants Junior 45 2019 F",
    "Sandy Cheeks Sophmore 0 2021 A+",
    "Plankton Lawrence Senior 4 2020 B+",
    "Eugene Krabs Senior 1 2020 C",
    "Pearl Krabs Freshman 0 2023 A-",
    "Squidward Tentacles Junior 2 2021 C-"
];

const login = [];

function update(){
    try{
        collection.updateOne({_id: mongodb.ObjectId('5f7281b84146de20dcfa8b91')},
            {$set: {data: data}});
    }
    catch(e){
        console.log(e);
    }

}

//start the server up

app.use( bp.json() )
app.use( express.static( 'build' ) )

const MongoClient = mongodb.MongoClient;
const uri = "mongodb+srv://rorysully:jiSdvf4Kq5TCxANa@cluster0.btzeq.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    collection = client.db("PuffsBoatingSchool").collection("UserData");


    collection.findOne({_id: mongodb.ObjectId('5f7281b84146de20dcfa8b91')}).then(response => {
        data = response.data;
    });

});

// send the default array of dreams to the webpage
app.get("/dreams", (request, response) => {
    // express helps us take JS objects and send them as JSON
    response.json(data);
});

app.post("/add", bp.json(), (request, responce) => {
    data.push( request.body.dream );
    update();
    responce.json(request.body);
});

app.post("/login", bp.json(), (request, responce) => {
    var returnVal = [...login];
    console.log(login.length)
    if(login.length == 0){
        var res = request.body.dream.split(" ");
        var newRes = request.body.dream.split(" ");
        login.push(res);
        newRes.push("New User");
        returnVal.push(newRes);
    }
    console.log(returnVal);
    responce.json(returnVal);
});

app.delete("/remove", (request, responce) => {
    for(var i = 0; i < data.length; i++){
        var res = data[i].split(" ");
        if(res[0] + " " + res[1] == request.body.dream){
            if (i > -1) {
                data.splice(i, 1);
            }
        }
    }
    update();
    responce.json(data);
});

app.post("/modify", bp.json(), (request, responce) => {
    var result = request.body.dream.split(" : ");
    var i;
    for(i = 0; i < data.length; i++){
        var res = data[i].split(" ");
        console.log(res[0] + " " + res[1]);
        console.log(res);
        if(res[0] + " " + res[1] == result[0]){
            if (i > -1) {
                console.log("HERE");
                data.splice(i, 1);
                data.splice(i, 0, result[1]);
            }
        }
    }
    update()
    responce.json(data);
});


app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/change', function( req,res ) {
    const idx = todos.findIndex( v => v.name === req.body.name )
    todos[ idx ].completed = req.body.completed

    res.sendStatus( 200 )
})

app.listen( 8080 )
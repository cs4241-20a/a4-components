const express  = require( 'express' ),
      app      = express(),
      bp       = require( 'body-parser')

const todos = [
  { name:'buy groceries', completed:"yes", numScoops:10, id:0 }
]

app.use( bp.json() )
app.use( express.static( 'public' ) )

app.get( '/read', ( req, res ) => res.json( todos ) )

app.post( '/add', ( req,res ) => {
  todos.push( req.body )
  res.json( todos )
})

// app.post( '/change', function( req,res ) {
//   const idx = todos.findIndex( v => v.id === req.body.id )
//   todos[ idx ].completed = req.body.completed
//   todos[ idx ].numScoops = req.body.numScoops
  
//   res.sendStatus( 200 )

// })

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

app.listen( 3000 )
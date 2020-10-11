const express = require("express");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const responseTime = require("response-time");
const timeout = require("connect-timeout");

const app = express();

let todos = [];

app.use(express.static("build"));
app.use(responseTime());
app.use(timeout("1000s"));
morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

app.get("/read", (request, response) => {
  response.json( todos )
});

app.post("/delete", bodyParser.json(), (request, response) => {
todos.filter((todo) =>{
    return todo.name !== request.body.name
  })
  response.json(todos)
});

app.post("/update", bodyParser.json(), (request, response) => {
  const idx = todos.findIndex( v => v.name === request.body.name )
  todos[ idx ].completed = request.body.completed;
});

app.post("/add", bodyParser.json(), (request, response) => {
  todos.push( request.body )
  response.json(todos);
});

const port = process.env.PORT || 8080;
app.listen(port);

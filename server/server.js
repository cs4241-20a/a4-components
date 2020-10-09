const express = require("express");
const app = express(); // create express app
const path = require("path");
const serveStatic = require("serve-static");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const header = { "Content-Type": "application/json" };

app.set("trust proxy", 1);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  session({
    secret: "bionicle",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    },
  })
);

let login = [
  {
    username: "test",
    password: "abcd",
    email: "test@test.com",
    id: "1",
  },
];

const userReg = (username, password, email) => {
  let id = (Math.random() * 100).toFixed(0);
  const newUser = {
    username: username,
    password: password,
    email: email,
    id: id,
  };
  login.push(newUser);
  return newUser;
};

const userLogin = (username, password) => {
  let user = login.find(
    (user) => user.username === username && user.password === password
  );
  return !!user ? user : { error: "notfound" };
};

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("serialize");
  console.log(user);
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  console.log("deserialize");
  let user = login.find((user) => user.id === userId);
  console.log(user);
  done(null, user);
});

passport.use(
  "local-register",
  new LocalStrategy({ passReqToCallback: true, session: true }, function (
    req,
    username,
    password,
    done
  ) {
    console.log("Register", username, password);
    let user = userReg(username, password, req.body.email);
    console.log(user);
    done(null, user);
  })
);

passport.use(
  "local-login",
  new LocalStrategy({ session: true }, function (username, password, done) {
    console.log("Login", username, password);
    let user = userLogin(username, password);
    if (!!user) {
      done(null, user);
    } else {
      done(
        {
          error: "Bad Login",
        },
        null
      );
    }
  })
);

app.post("/login", function (req, res, next) {
  console.log("LOGIN");
  passport.authenticate(
    "local-login",
    {
      session: true,
    },
    function (err, user, info) {
      console.log("passport");
      if (err) {
        res.writeHead(500, { header });
        res.end(
          JSON.stringify({
            errorMessage: "There was an issue with the server",
            error: err.systemError,
            errorCode: 500,
          })
        );
      } else {
        req.login(user, function (err) {
          if (err) {
            console.log(err);
            res.writeHead(500);
            res.end(
              JSON.stringify({
                errorMessage: "Session Issue",
                error: err,
                errorCode: 500,
              })
            );
          }
          else {
            res.end(JSON.stringify({ Success: "YeetLogin" }));
          }
        });
      }
    }
  )(req, res, next);
});

app.use(
  serveStatic(path.join(__dirname, "..", "build"), {
    index: "index.html",
    extensions: ["html"],
  })
);

app.get("*", (req,res) => {
  res.sendFile(path.join(__dirname, '..', 'build/index.html'))
})
// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
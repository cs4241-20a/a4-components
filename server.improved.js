const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcrypt");
const GitHubStrategy = require("passport-github").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const compression = require("compression");
const morgan = require("morgan");
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");

const mongoURI = process.env.A3_MONGO_URL;
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.A3_SECRET || "testdevlol",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(compression());
app.use(morgan("combined"));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  //console.log(req.body);
  next();
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.A3_GITHUB_ID,
      clientSecret: process.env.A3_GITHUB_SECRET,
      callbackURL: process.env.A3_GITHUB_CALLBACK,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const client = new MongoClient(mongoURI, mongoConfig);

      await client.connect();
      const collection = client.db("test").collection("users");

      const docs = await collection
        .find({ username: profile.username, github: true })
        .toArray();

      const user = {
        username: profile.username,
        password: null,
        github: true,
      };

      console.log("Processing", user);

      if (docs.length == 0) {
        await collection.insertMany([user]);
      }

      const users = await collection
        .find({ username: profile.username, github: true })
        .toArray();

      await client.close();
      cb(null, users[0]);
    }
  )
);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const client = new MongoClient(mongoURI, mongoConfig);

    await client.connect();
    const collection = client.db("test").collection("users");

    const docs = await collection.find({ username, github: false }).toArray();

    if (docs.length == 0) {
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          const user = {
            username,
            password: hash,
            github: false,
          };
          await collection.insertMany([user]);
          await client.close();
          done(null, user);
        });
      });
    } else {
      await client.close();
      bcrypt.compare(password, docs[0].password, function (err, result) {
        if (result) {
          done(null, docs[0]);
        } else {
          done(null, false);
        }
      });
    }
  })
);

app.get("/auth/github", passport.authenticate("github"));

app.get(
  "/callback/github",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (req, res) {
    console.log(req.user);
    res.redirect("/");
  }
);

app.post("/login", passport.authenticate("local"), function (req, res) {
  req.login(req.user, () => {
    delete req.user.password;
    return res.json(req.user);
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  return res.send();
});

app.post("/submit", async (req, res) => {
  if (!req.user) {
    return res.json({ success: false, needsAuth: true });
  }

  const object = req.body;

  object.user = req.user._id;

  let color = "#333";
  if (typeof object.task != "undefined") {
    if (object.task.length > 10) {
      color = "#3498db";
    }
    if (object.task.length > 20) {
      color = "#d35400";
    }
    if (object.task.length > 30) {
      color = "#27ae60";
    }
    if (object.task.length > 40) {
      color = "#8e44ad";
    }
    if (object.task.length > 50) {
      color = "#c0392b";
    }

    object.color = color;
  }

  if (req.headers["x-forwarded-for"]) {
    object.ip = req.headers["x-forwarded-for"].split(",")[0];
  } else {
    object.ip = "N/A";
  }

  const client = new MongoClient(mongoURI, mongoConfig);

  await client.connect();
  const collection = client.db("test").collection("tickets");

  if (object.delete) {
    await collection.deleteOne({ _id: new mongo.ObjectID(object.id) });
  } else if (object.id) {
    await collection.updateOne(
      { _id: new mongo.ObjectID(object.id) },
      { $set: { ...object, _id: new mongo.ObjectID(object.id) } }
    );
  } else {
    await collection.insertMany([object]);
  }

  const docs = await collection.find({ user: req.user._id }).toArray();

  // perform actions on the collection object
  await client.close();

  return res.json(docs);
});

app.get("/api/getData", async (req, res) => {
  if (!req.user) {
    return res.send("NEEDS LOGIN");
  }

  const client = new MongoClient(mongoURI, mongoConfig);

  await client.connect();
  const collection = client.db("test").collection("tickets");

  const docs = await collection.find({ user: req.user._id }).toArray();

  // perform actions on the collection object
  await client.close();

  return res.json(docs);
});

app.get("/api/getUser", async (req, res) => {
  if (req.user) delete req.user.password;
  return res.json(req.user || {});
});

app.get("/", (_, response) => {
  response.sendFile(__dirname + "/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

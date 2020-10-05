const express = require("express");
const app = express(); // create express app
const path = require("path");
const serveStatic = require("serve-static");

app.set("trust proxy", 1);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
//  });

app.use(
  serveStatic(path.join(__dirname, "..", "build"), {
    index: "index.html",
    extensions: ["html"]
  })
)

app.use(
  serveStatic(path.join(__dirname, "public/statics"), {
    index: "index.html",
    extensions: ["html"]
  })
)

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});
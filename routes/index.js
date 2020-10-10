const express = require('express')
const path = require('path')
const router = express.Router()

router.get("/favicon.ico", (req, res) => {
  res.status("200").sendFile(path(__dirname + "/favicon.ico")) 
})


module.exports = router
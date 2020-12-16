var express = require("express")
var router = express.Router()
const pool = require("../db")
const bcrypt = require("bcrypt")

router.post('/', (req, res) => {
    req.session.loggedin = false
    res.sendStatus(200)
})

module.exports = router
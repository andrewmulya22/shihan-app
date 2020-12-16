var express = require("express")
var router = express.Router()
const bcrypt = require("bcrypt")
const pool = require("../db")

router.get('/', async(req, res) => {
    if (req.session.loggedin != true) res.render('home')
    else res.redirect('/user')
})

router.get('/login', (req, res) => {
    if (req.session.loggedin != true) res.render('Login')
    else res.redirect('/user')
})

router.post('/auth', async(req, res) => {
    let name = req.body.uname
    let pasw = req.body.psw
    let query = "SELECT VERIFIED, PASSWORD FROM TEACHER WHERE USERNAME = '" + name + "'";
    let result = await mysqlget(query)
    if (result.length == 1) {
        let bool = await compareHash(pasw, result[0].PASSWORD)
        if (bool == true) {
            req.session.loggedin = true;
            req.session.username = name;
            if (result[0].VERIFIED == "YES") {
                req.session.verified = true
                res.send("success")
            } else {
                req.session.verified = false;
                res.send("verify")
            }
        } else {
            res.send("failed")
        }
    } else {
        res.send("failed")
    }
})

function compareHash(pasw, hashPassword) {
    return new Promise(resolve => {
        bcrypt.compare(pasw, hashPassword, function(err, result) {
            resolve(result)
        });
    })
}

function mysqlget(query) {
    return new Promise(resolve => {
        pool.query(query, (err, res) => {
            try {
                resolve(res)
            } catch {}
        })
    })
}

module.exports = router

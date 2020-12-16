var express = require("express")
var router = express.Router()
const bcrypt = require("bcrypt")
const pool = require("../db")

router.get('/', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'SELECT * FROM TEACHER WHERE USERNAME = "' + req.session.username + '"'
    let query2 = 'SELECT SUM(EARNED_POINT) AS POIN FROM POST WHERE USERNAME = "' + req.session.username + '"'
    let result = await mysqlget(query)
    let result2 = await mysqlget(query2)
    res.render('Account', { result: result[0], result2: result2[0] })
})

router.post('/:change', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query
    if (req.params.change == "password") {
        let password = await hashPassword(req.body.data)
        query = 'UPDATE TEACHER SET ' + req.params.change + ' = "' + password + '" WHERE USERNAME = "' + req.session.username + '"'
    } else {
        query = 'UPDATE TEACHER SET ' + req.params.change + ' = "' + req.body.data + '" WHERE USERNAME = "' + req.session.username + '"'
    }
    pool.query(query, (err, respond) => {
        if (err) console.log(err)
        else res.send("success")
    })
})

function mysqlget(query) {
    return new Promise(resolve => {
        pool.query(query, (err, res) => {
            try {
                resolve(res)
            } catch {}
        })
    })
}

function hashPassword(password) {
    return new Promise(resolve => {
        bcrypt.hash(password, 10, function(err, hash) {
            resolve(hash)
        });
    })
}

module.exports = router
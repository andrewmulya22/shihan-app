var express = require("express")
var router = express.Router()
const pool = require("../db")

router.get('/:username', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    let query = 'SELECT VERIFIED, EMAIL FROM TEACHER WHERE USERNAME = "' + req.params.username + '"'
    let result = await mysqlget(query)
    if (result[0].VERIFIED == "YES") {
        req.session.verified = true
        res.redirect('/user')
    }
    res.render('Verify', { email: result[0].EMAIL })
})

router.post('/', async(req, res) => {
    let query = 'SELECT * FROM TEACHER WHERE EMAIL = "' + req.body.email + '" AND VERIFCODE = ' + req.body.code
    let result = await mysqlget(query)
    if (result.length > 0) {
        let query2 = 'UPDATE TEACHER SET VERIFIED = "YES" WHERE EMAIL= "' + req.body.email + '"'
        pool.query(query2)
        req.session.verified = true
        res.send("success")
    } else {
        res.send("failed")
    }
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

module.exports = router

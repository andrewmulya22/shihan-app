var express = require("express")
var router = express.Router()
const pool = require("../db")

router.get('/:namamatkul', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'SELECT MAPEL.NAMA_MAPEL, USERNAME, LINK_MAPEL FROM LANGGANAN INNER JOIN MAPEL ON LANGGANAN.NAMA_MAPEL=MAPEL.NAMA_MAPEL WHERE USERNAME="' + req.session.username + '"'
    let query2 = 'SELECT NAMA_MAPEL, DESKRIPSI FROM MAPEL WHERE NAMA_MAPEL = "' + req.params.namamatkul + '"'
    let query3 = 'SELECT NAMA_TOPIK FROM TOPIK WHERE NAMA_MAPEL = "' + req.params.namamatkul + '"'
    let query4 = 'SELECT * FROM LANGGANAN WHERE USERNAME = "' + req.session.username + '" AND NAMA_MAPEL = "' + req.params.namamatkul + '"'
    let result = await mysqlget(query)
    let result2 = await mysqlget(query2)
    let result3 = await mysqlget(query3)
    let result4 = await mysqlget(query4)
    let subscribed
    if (result4.length > 0) subscribed = true
    else subscribed = false
    res.render('Matkul', { result: result, result2: result2[0], result3: result3, subscribed })
})

router.post('/subscribe/:namamatkul', async(req, res) => {
    let query = 'SELECT * FROM LANGGANAN WHERE USERNAME = "' + req.session.username + '" AND NAMA_MAPEL = "' + req.params.namamatkul + '"'
    let result = await mysqlget(query)
    let query2
    if (result.length > 0) query2 = 'DELETE FROM LANGGANAN WHERE USERNAME = "' + req.session.username + '" AND NAMA_MAPEL = "' + req.params.namamatkul + '"'
    else query2 = 'INSERT INTO LANGGANAN (NAMA_MAPEL, USERNAME) VALUES ("' + req.params.namamatkul + '", "' + req.session.username + '")'
    pool.query(query2)
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
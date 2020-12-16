var express = require("express")
var router = express.Router()
const pool = require("../db")

router.get('/', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'SELECT MAPEL.NAMA_MAPEL, USERNAME, LINK_MAPEL FROM LANGGANAN INNER JOIN MAPEL ON LANGGANAN.NAMA_MAPEL=MAPEL.NAMA_MAPEL WHERE USERNAME="' + req.session.username + '"'
    let query2 = 'SELECT * FROM POST WHERE USERNAME="' + req.session.username + '"'
    let result = await mysqlget(query)
    let result2 = await mysqlget(query2)
    let length = result.length
    let length2 = result2.length
    res.render('Mainpg', { result, result2, length, length2 })
})

router.post('/', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'INSERT INTO POST (JUDUL, DESKRIPSI, USERNAME, NAMA_TOPIK, NAMA_MAPEL, EARNED_POINT) VALUES ("' + req.body.postText + '", "' + req.body.postDesc + '", "' + req.session.username + '", "' + req.body.topic + '", "' + req.body.matkul + '", 50)'
    pool.query(query)
    res.send("success")
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
var express = require("express")
var router = express.Router()
const pool = require("../db")

router.get('/:id', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'SELECT MAPEL.NAMA_MAPEL, USERNAME, LINK_MAPEL FROM LANGGANAN INNER JOIN MAPEL ON LANGGANAN.NAMA_MAPEL=MAPEL.NAMA_MAPEL WHERE USERNAME="' + req.session.username + '"'
    let query2 = 'SELECT JUDUL, DESKRIPSI, NAMA_TOPIK, NAMA_MAPEL, NAMA FROM POST INNER JOIN TEACHER ON POST.USERNAME = TEACHER.USERNAME WHERE POST.ID = ' + req.params.id
    let query3 = 'SELECT KOMENTAR, NAMA FROM KOMENTAR INNER JOIN TEACHER ON KOMENTAR.USERNAME = TEACHER.USERNAME WHERE ID_POST = ' + req.params.id
    let result = await mysqlget(query)
    let result2 = await mysqlget(query2)
    let result3 = await mysqlget(query3)
    res.render('Post', { postid: req.params.id, result, result2: result2[0], result3 })
})

router.post('/komentar', async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'INSERT INTO KOMENTAR (ID_POST, KOMENTAR, USERNAME) VALUES (' + req.body.postid + ', "' + req.body.komentar + '", "' + req.session.username + '")'
    pool.query(query)
    res.send("OK")
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
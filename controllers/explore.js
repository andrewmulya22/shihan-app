var express = require("express")
var router = express.Router()
const pool = require("../db")

router.get(['/', '/:searchKey', '/:searchKey/:mapel/:topic'], async(req, res) => {
    if (req.session.loggedin != true) return res.redirect('/login')
    else if (req.session.verified == false) return res.redirect('/verify/' + req.session.username)
    let query = 'SELECT NAMA_MAPEL, LINK_MAPEL FROM MAPEL'
    let query2
    if (req.params.searchKey != null) {
        query2 = 'SELECT * FROM POST WHERE JUDUL LIKE "%' + req.params.searchKey + '%"'
    } else query2 = 'SELECT * FROM POST'
    let result = await mysqlget(query)
    let result2 = await mysqlget(query2)
    let length = result.length
    let length2 = result2.length
    res.render('Explore', { result, result2, length, length2 })
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
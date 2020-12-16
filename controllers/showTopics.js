var express = require("express")
var router = express.Router()
const pool = require("../db")

router.post('/', async(req, res) => {
    let topic = req.body.topic
    let query = "SELECT * FROM TOPIK WHERE NAMA_MAPEL = '" + topic + "'"
    let result = await mysqlget(query)
    if (result.length > 0) {
        res.send(result)
    } else res.send("Null")
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
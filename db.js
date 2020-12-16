const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b30806d94c061f',
    password: 'a65d272a',
    database: 'heroku_af9caaf069edf81',
    charset: 'utf8'
})

module.exports = pool

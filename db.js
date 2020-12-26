const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    user: '',
    password: '',
    database: '',
    charset: 'utf8'
})

module.exports = pool

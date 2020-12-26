const mysql = require('mysql')

const pool = mysql.createPool({
    host: '***REMOVED***',
    user: '',
    password: '',
    database: '',
    charset: 'utf8'
})

module.exports = pool

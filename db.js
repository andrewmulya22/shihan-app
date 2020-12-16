const mysql = require('mysql')

const pool = mysql.createPool({
    host: '***REMOVED***',
    user: '***REMOVED***',
    password: '***REMOVED***',
    database: '***REMOVED***?reconnect=true',
    charset: 'utf8'
})

module.exports = pool
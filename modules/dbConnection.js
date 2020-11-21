const mysql = require('mysql')

require('dotenv').config()

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'hashpass'
})

dbConnection.connect((err,) => {
    if (err) {
        console.log('Error connecting', err);
        return
    }
    console.log('connected as id ' + dbConnection.threadId);
})
module.exports = {
    connect: dbConnection
}
//insert required libraries
require('dotenv').config({ path: __dirname + '/./../../.env' })

const connection = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "employeeDB"
}

module.exports.connection = connection;


//insert required libraries
require('dotenv').config()

const connection = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Duc.Ha.93",
    database: "employeeDB",
}

module.exports.connection = connection;
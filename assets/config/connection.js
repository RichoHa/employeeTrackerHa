//insert required libraries
require('dotenv').config();
const mysql = require('mysql2/promise');

async function connection() {
    try {
        const connection = await mysql.createConnection({
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: "Duc.Ha.93",
            database: "employeeDB",
        })
        console.log(`MySQL connection success on id: ${connection.threadId}`)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.connection = connection;
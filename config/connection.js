//insert required libraries
require('dotenv').config();
const inquirer = require("inquirer");
const cTable = require("console.table");


async function connecttoDB() {
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        process.env.DB_USER,
        process.env.DB_PASS,
        database: "employeeDB",
    })
    const [first_name, last_name, title, department, salary, manager] = await connection.execute('SELECT * FROM `employee`');
}

connecttoDB();
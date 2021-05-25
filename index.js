//insert required libraries
const inquirer = require("inquirer");
const cTable = require("console.table");


async function connecttoDB() {
    const mysql = require('mysql2/promise');

    const connection = await mysql.createConnection({
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password: "Duc.Ha.93",
        database: "employeeDB",
    })
    const [first_name, last_name, title, department, salary, manager] = await connection.execute('SELECT * FROM `employee`');
}

connecttoDB();
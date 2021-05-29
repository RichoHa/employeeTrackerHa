// //insert required libraries
// require('dotenv').config();
// const inquirer = require("inquirer");
// const cTable = require("console.table");


// async function connecttoDB() {
//     const mysql = require('mysql2/promise');

//     const connection = await mysql.createConnection({
//         host: "127.0.0.1",
//         port: 3306,
//         process.env.DB_USER,
//         process.env.DB_PASS,
//         database: "employeeDB",
//     })
//     const [first_name, last_name, title, department, salary, manager] = await connection.execute('SELECT * FROM `employee`');
// }

// connecttoDB();

const inquirer = require("inquirer");
let addFile = require(`./assets/js/add.js`)
// console.log(addFunction);
// console.log(addFunction.module);
// console.log(typeof addFunction.module);

let roleArray = [
    { "id": "1", "title": "Mechanical Engineer", "salary": "100000", "department_id": "Engineering" },
    { "id": "2", "title": "Pharmacy ass", "salary": "10000", "department_id": "Pharmacy" },
]

let employeeArray = [
    { "id": "1", "first_name": "John", "last_name": "Ha", "role_id": "Mechanical Engineer", "manager_id": "Richard Ha" },
    { "id": "2", "first_name": "Kimmy", "last_name": "Tran", "role_id": "Pharmacy ass", "manager_id": "Richo Ha" },
    { "id": "3", "first_name": "Daniel", "last_name": "Ha", "role_id": "Mechanical Engineer", "manager_id": "Richo Ha" }
]

let departmentArray = [
    { "id": "1", "name": "Engineering" },
    { "id": "2", "name": "Pharmacy" }
]

function code(roleArray, employeeArray, departmentArray) {
    addFile.add(roleArray, employeeArray, departmentArray);

}

code(roleArray, employeeArray, departmentArray)
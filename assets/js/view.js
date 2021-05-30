const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const connectionFile = require(`../config/connection.js`)

//Questions Regarding adding departments, roles and employees.
async function view() {
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'viewItem',
            message: 'Please pick what to view',
            choices: ['Departments', 'Roles', 'Employees', 'Salary of Department'],
        }
    ]);

    if (response.viewItem === "Departments") {
        const connection = await mysql.createConnection(connectionFile.connection);
        const department = await connection.query('SELECT department_name FROM department')
        console.table(department[0]);
        connection.end();

    } else if (response.viewItem === "Roles") {
        const connection = await mysql.createConnection(connectionFile.connection);
        const roles = await connection.query(
            `SELECT title, salary, department_name 
            FROM role
            join department on role.department_id = department.id`)
        console.table(roles[0]);
        connection.end();

    } else if (response.viewItem === "Employees") {
        const connection = await mysql.createConnection(connectionFile.connection);
        const employees = await connection.query(
            `SELECT first_name, last_name, title, department_name, salary, manager_name 
            FROM employee
            left join role on employee.role_id = role.id
            left join manager on employee.manager_id = manager.id
            left join department on department.id = role.department_id
            order by last_name`)
        console.table(employees[0]);
        connection.end();

    } else if (response.viewItem === "Salary of Department") {
        const connection = await mysql.createConnection(connectionFile.connection);
        const salary = await connection.query(
            `SELECT first_name, last_name, title, department_name, salary, manager_name 
            FROM employee
            left join role on employee.role_id = role.id
            left join manager on employee.manager_id = manager.id
            left join department on department.id = role.department_id
            order by department_name`)
        console.table(salary[0]);

        const departmentNames = await connection.query(
            `SELECT department_name FROM department`);

        let listOfDepartmentNames = [];

        departmentNames[0].forEach(element => {
            listOfDepartmentNames.push(element.department_name)
        })
        const response = await inquirer.prompt([
            {
                type: 'list',
                name: 'salaryDepartment',
                message: 'Please pick which department',
                choices: listOfDepartmentNames,
            }
        ]);
        let salaryTotal = 0;
        salary[0].forEach(element => {
            if (response.salaryDepartment === element.department_name) {
                salaryTotal += parseFloat(element.salary);
            }
        })
        console.log(`The total combined salary of ${response.salaryDepartment} is ${salaryTotal}`);
        connection.end();
    }
}


module.exports.view = view;
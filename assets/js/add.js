const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const connectionFile = require(`../config/connection.js`)

async function add(roleArray, employeeArray, departmentArray) {
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'addItem',
            message: 'Please choose an option',
            choices: ['Add an Employee', 'Add a department', 'Add a role'],
        }
    ]);

    if (response.addItem === "Add an Employee") {

        const connection = await mysql.createConnection(connectionFile.connection);

        //Get Roles into an array
        const roleTable = await connection.query(
            `SELECT id, title FROM role`);
        let listOfRoleTitles = [];
        roleTable[0].forEach(element => {
            listOfRoleTitles.push(element.title)
        })

        //Get Manager's Names into an array
        const managerTable = await connection.query(
            `SELECT id, manager_name FROM manager`);
        let listOfmanagerNames = [];
        managerTable[0].forEach(element => {
            listOfmanagerNames.push(element.manager_name)
        })

        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeFirstName',
                message: 'What is the employee’s first name?'
            },
            {
                type: 'input',
                name: 'employeeLastName',
                message: 'What is the employee’s last name?'
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'What is the employee’s role? ',
                choices: listOfRoleTitles
            },
            {
                type: 'list',
                name: 'employeeManger',
                message: 'What is the employee’s manager? ',
                choices: listOfmanagerNames
            }
        ]);

        //find and save id related
        let roleNumber;
        roleTable[0].forEach(element => {
            if (element.title === response.employeeRole) {
                roleNumber = element.id;
            }
        })

        //find and save id related
        let managerNumber;
        managerTable[0].forEach(element => {
            if (element.manager_name === response.employeeManger) {
                managerNumber = element.id;
            }
        })

        await connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ("${response.employeeFirstName}","${response.employeeLastName}",${roleNumber},${managerNumber})`);

        connection.end();
        //get details and uploaded into database
        console.log(`added ${response.employeeFirstName} ${response.employeeLastName} with role ${response.employeeRole} and manager ${response.employeeManger}`)


    } else if (response.addItem === "Add a department") {

        const connection = await mysql.createConnection(connectionFile.connection);

        //Get departments into an array
        const departmentTableUpdated = await connection.query(
            `SELECT department_name FROM department`);
        let listOfDepartment = [];
        departmentTableUpdated[0].forEach(element => {
            listOfDepartment.push(element.department_name)
        })

        console.log("The current departments are: ", listOfDepartment)

        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'addedDepartment',
                message: 'What is the department you want to add?',
                //Validate if alread exists.
                validate: (addedDepartment) => {
                    if (!listOfDepartment.includes(addedDepartment)) {
                        return true;
                    } else {
                        console.log(`(Error: This department already exists!)`);
                    }
                }
            }
        ])

        await connection.query(`INSERT INTO department (department_name) 
            VALUES ("${response.addedDepartment}")`);

        const departmentTable = await connection.query(
            `SELECT department_name FROM department`);
        listOfDepartment = [];
        departmentTable[0].forEach(element => {
            listOfDepartment.push(element.department_name)
        })
        connection.end();
        console.log(`Department ${response.addedDepartment} was added`);
        console.log("The updated departments list: ", listOfDepartment)

    } else if (response.addItem === "Add a role") {

        const connection = await mysql.createConnection(connectionFile.connection);

        //Get Role names into an array
        const roleTable = await connection.query(
            `SELECT title FROM role`);
        let listOfRoleTitles = [];
        roleTable[0].forEach(element => {
            listOfRoleTitles.push(element.title)
        })

        //Get Role names into an array
        const departmentTable = await connection.query(
            `SELECT id, department_name FROM department`);
        let listOfDepartments = [];
        departmentTable[0].forEach(element => {
            listOfDepartments.push(element.department_name)
        })

        const roles = await connection.query(
            `SELECT title, salary, department_name 
            FROM role
            join department on role.department_id = department.id`)
        console.table(roles[0]);

        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the new role called?',
                validate: (roleName) => {
                    if (!listOfRoleTitles.includes(roleName)) {
                        return true;
                    } else {
                        console.log(`(Error: This role already exists!)`);
                    }
                }
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary for the new role?',
                validate: (roleSalary) => {
                    if (/^\d+$/.test(roleSalary)) {
                        return true;
                    } else {
                        console.log(`(Error: This input is incorrect!)`);
                    }
                }
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'What is the department the new role is in?',
                choices: listOfDepartments
            }
        ]);

        // Get & Save ID given the department role.
        let departmentID;
        departmentTable[0].forEach(element => {
            if (element.department_name === response.roleDepartment) {
                departmentID = element.id;
            }
        })

        await connection.query(`INSERT INTO role (title, salary, department_id) 
            VALUES ("${response.roleName}", ${response.roleSalary}, ${departmentID})`);


        console.log(`The role ${response.roleName} was added.`)
        const roles2 = await connection.query(
            `SELECT title, salary, department_name 
            FROM role
            join department on role.department_id = department.id`)
        console.table(roles2[0]);

        connection.end();
    }
}
module.exports.add = add;
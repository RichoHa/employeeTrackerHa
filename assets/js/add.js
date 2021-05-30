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
        //get all the roles within the role table/object
        let getAllRoles = roleArray.map(a => a.title);

        //gets the single instance of manager within the Array/object 
        let getAllManagers = employeeArray.map(a => a.manager_id);
        let allManagers = [];
        getAllManagers.forEach(Manager => {
            if (!allManagers.includes(Manager)) {
                allManagers.push(Manager)
            }
            return allManagers;
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
                choices: getAllRoles
            },
            {
                type: 'list',
                name: 'employeeManger',
                message: 'What is the employee’s manager? ',
                choices: allManagers
            }
        ]);

        //get details and uploaded into database
        console.log(`added ${response.employeeFirstName} ${response.employeeLastName} with role ${response.employeeRole} and manager ${response.employeeManger}`)


    } else if (response.addItem === "Add a department") {
        //Map all name of deparmtments
        let departmentArrayMapped = departmentArray.map(a => a.name);

        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'addedDepartment',
                message: 'What is the department you want to add?',
                //Validate if alread exists.
                validate: (addedDepartment) => {
                    if (!departmentArrayMapped.includes(addedDepartment)) {
                        return true;
                    } else {
                        console.log(`(Error: This department already exists!)`);
                    }
                }
            }
        ])

        console.log(`Department ${response.addedDepartment} was added`);

    } else if (response.addItem === "Add a role") {
        let roleArrayMapped = roleArray.map(a => a.title);
        let departmentArrayMapped = departmentArray.map(a => a.name);

        const response = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the new role called?',
                validate: (roleName) => {
                    if (!roleArrayMapped.includes(roleName)) {
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
                choices: departmentArrayMapped
            }
        ]);

        console.log(`The role ${response.roleName}, with salary ${response.roleSalary} was added to department ${response.roleDepartment}`);
    }
}

module.exports.add = add;
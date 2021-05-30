const inquirer = require("inquirer");
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const connectionFile = require(`../config/connection.js`)

async function update() {


    const viewItem = await inquirer.prompt([
        {
            type: 'list',
            name: 'viewItem',
            message: 'Please pick what to update',
            choices: ["Employee's Details", "Remove Employee", "Remove Role", "Remove Manager"],
        }
    ]);

    if (viewItem.viewItem === "Employee's Details") {

        const connection = await mysql.createConnection(connectionFile.connection);
        const employeeDetails = await connection.query(
            `SELECT id, first_name, last_name, role_id, manager_id
            FROM employee`);

        let listEmployeeNames = [];
        employeeDetails[0].forEach(element => {
            listEmployeeNames.push(`${element.first_name} ${element.last_name}`)
        })

        const viewItem = await inquirer.prompt([
            {
                type: 'list',
                name: 'ChosenOne',
                message: 'Who do you want to update?',
                choices: listEmployeeNames,
            }
        ]);

        let chosenOneID;
        employeeDetails[0].forEach(element => {
            if (`${element.first_name} ${element.last_name}` === viewItem.ChosenOne) {
                chosenOneID = element.id
            }
        })

        EmployeeUpdateOptions(chosenOneID)

        async function EmployeeUpdateOptions() {
            const UpdatedChoice = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'UpdateItem',
                    message: 'Please pick what to update',
                    choices: ["Update First Name", "Update Last Name", "Update Role", "Update Manager", "finish Updating"],
                }
            ]);

            if (UpdatedChoice.UpdateItem === "Update First Name") {
                const UpdatedFirstName = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'UpdateFirstName',
                        message: 'Please type in the first name.',
                    }
                ]);

                await connection.query(`update employee
                set first_name = "${UpdatedFirstName.UpdateFirstName}"
                where id=${chosenOneID}`);

                const firstName = await connection.query(
                    `SELECT first_name, last_name, title, department_name, salary, manager_name 
                    FROM employee
                    left join role on employee.role_id = role.id
                    left join manager on employee.manager_id = manager.id
                    left join department on department.id = role.department_id
                    order by first_name`)
                console.table(firstName[0]);

                console.log("you have successfully updated the first name.")
                EmployeeUpdateOptions(chosenOneID)
            }
            else if (UpdatedChoice.UpdateItem === "Update Last Name") {
                const UpdatedLastName = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'UpdateLastName',
                        message: 'Please type in the last name.',
                    }
                ]);

                await connection.query(`update employee
                set last_name = "${UpdatedLastName.UpdateLastName}"
                where id=${chosenOneID}`);

                const lastName = await connection.query(
                    `SELECT first_name, last_name, title, department_name, salary, manager_name 
                    FROM employee
                    left join role on employee.role_id = role.id
                    left join manager on employee.manager_id = manager.id
                    left join department on department.id = role.department_id
                    order by last_name`)
                console.table(lastName[0]);

                console.log("you have successfully updated the last name.")
                EmployeeUpdateOptions(chosenOneID)
            }
            else if (UpdatedChoice.UpdateItem === "Update Role") {

                const roleTable = await connection.query(
                    `SELECT id, title FROM role`);
                let listOfRoleTitles = [];
                roleTable[0].forEach(element => {
                    listOfRoleTitles.push(element.title)
                })


                const UpdatedRoleChosen = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'UpdateRole',
                        message: 'Please choose an what role to update to.',
                        choices: listOfRoleTitles
                    }
                ]);

                let idOfRole;
                roleTable[0].forEach(element => {
                    if (UpdatedRoleChosen.UpdateRole === element.title) {
                        idOfRole = element.id;
                    }
                });

                await connection.query(`update employee
                set role_id = ${idOfRole}
                where id=${chosenOneID}`);

                const RoleChange = await connection.query(
                    `SELECT first_name, last_name, title, department_name, salary, manager_name 
                    FROM employee
                    left join role on employee.role_id = role.id
                    left join manager on employee.manager_id = manager.id
                    left join department on department.id = role.department_id
                    order by title`)
                console.table(RoleChange[0]);

                console.log("you have successfully updated the role.")
                EmployeeUpdateOptions(chosenOneID)
            }
            else if (UpdatedChoice.UpdateItem === "Update Manager") {

                const managerTable = await connection.query(
                    `SELECT id, manager_name FROM manager`);
                let listOfManagers = [];
                managerTable[0].forEach(element => {
                    listOfManagers.push(element.manager_name)
                })


                const UpdatedManagerChosen = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'UpdatedManager',
                        message: 'Please choose an what Manager to update to.',
                        choices: listOfManagers
                    }
                ]);

                let idOfManager;
                managerTable[0].forEach(element => {
                    if (UpdatedManagerChosen.UpdatedManager = element.manager_name) {
                        idOfManager = element.id;
                    }
                })
                await connection.query(`update employee
                set manager_id = ${idOfManager}
                where id=${chosenOneID}`);

                const ManagerChange = await connection.query(
                    `SELECT first_name, last_name, title, department_name, salary, manager_name 
                    FROM employee
                    left join role on employee.role_id = role.id
                    left join manager on employee.manager_id = manager.id
                    left join department on department.id = role.department_id
                    order by manager_name`)
                console.table(ManagerChange[0]);

                console.log("you have successfully updated the Manager.")
                EmployeeUpdateOptions(chosenOneID);
            } else {
                connection.end();
            }
        }
    } else if (viewItem.viewItem === "Remove Employee") {

        const connection = await mysql.createConnection(connectionFile.connection);

        const employeeDetails = await connection.query(
            `SELECT id, first_name, last_name
            FROM employee`);

        let listEmployeeNames = [];
        employeeDetails[0].forEach(element => {
            listEmployeeNames.push(`${element.first_name} ${element.last_name}`)
        })

        const viewItem = await inquirer.prompt([
            {
                type: 'list',
                name: 'ChosenOne',
                message: 'Which employee do you want to delete?',
                choices: listEmployeeNames,
            }
        ]);

        let EmployeeID;
        employeeDetails[0].forEach(element => {
            if (viewItem.ChosenOne === `${element.first_name} ${element.last_name}`)
                EmployeeID = element.id;
        })
        //DELETE FROM table1 WHERE condition
        await connection.query(`delete from employee where id = ${EmployeeID}`);
        const RoleChange = await connection.query(
            `SELECT first_name, last_name, title, department_name, salary, manager_name 
            FROM employee
            left join role on employee.role_id = role.id
            left join manager on employee.manager_id = manager.id
            left join department on department.id = role.department_id
            order by first_name`)
        console.table(RoleChange[0]);
        console.log(`deleted ${viewItem.ChosenOne}`);
        connection.end();
    } else if (viewItem.viewItem === "Remove Role") {

        const connection = await mysql.createConnection(connectionFile.connection);

        const roleDetails = await connection.query(
            `SELECT id, title, salary
            FROM role`);

        let listRoles = [];
        roleDetails[0].forEach(element => {
            listRoles.push(`${element.title}`)
        })

        console.log(`Current Roles are: `, listRoles)
        const viewItem = await inquirer.prompt([
            {
                type: 'list',
                name: 'ChosenRole',
                message: 'Which role do you want to delete?',
                choices: listRoles,
            }
        ]);

        let RoleID;
        roleDetails[0].forEach(element => {
            if (viewItem.ChosenRole === `${element.title}`)
                RoleID = element.id;
        })
        //DELETE FROM table1 WHERE condition
        await connection.query(`delete from role where id = ${RoleID}`);

        const roleDetails2 = await connection.query(
            `SELECT id, title, salary
            FROM role`);
        console.table(roleDetails2[0]);

        console.log(`deleted ${viewItem.ChosenRole}`);
        connection.end();
    }
    else if (viewItem.viewItem === "Remove Manager") {

        const connection = await mysql.createConnection(connectionFile.connection);

        const roleDetails = await connection.query(
            `SELECT id, manager_name
            FROM manager`);
        console.table(roleDetails[0])

        let listRoles = [];
        roleDetails[0].forEach(element => {
            listRoles.push(`${element.title}`)
        })

        console.log(`Current Roles are: `, listRoles)
        const viewItem = await inquirer.prompt([
            {
                type: 'list',
                name: 'ChosenRole',
                message: 'Which role do you want to delete?',
                choices: listRoles,
            }
        ]);

        let RoleID;
        roleDetails[0].forEach(element => {
            if (viewItem.ChosenRole === `${element.title}`)
                RoleID = element.id;
        })
        //DELETE FROM table1 WHERE condition
        await connection.query(`delete from role where id = ${RoleID}`);

        const roleDetails2 = await connection.query(
            `SELECT id, title, salary
            FROM role`);
        console.table(roleDetails2[0]);

        console.log(`deleted ${viewItem.ChosenRole}`);
        connection.end();
    }
}
module.exports.update = update;
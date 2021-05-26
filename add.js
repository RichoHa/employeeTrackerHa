const inquirer = require("inquirer");
let roleArray = [
    { "id": "1", "title": "Mechanical Engineer", "salary": "100000", "department_id": "Engineering" },
    { "id": "2", "title": "Pharmacy Boss", "salary": "10000", "department_id": "Pharmacy" },
]

let employeeArray = [
    { "id": "1", "first_name": "John", "last_name": "Ha", "role_id": "Engineer", "manager_id": "Richard Ha" },
    { "id": "2", "first_name": "Kimmy", "last_name": "Tran", "role_id": "Pharmacy", "manager_id": "Richo Ha" },
    { "id": "3", "first_name": "Daniel", "last_name": "Ha", "role_id": "Engineer", "manager_id": "Richo Ha" }
]

//Questions Regarding adding departments, roles and employees.
async function add() {
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
        let getAllManagers = employeeArray.map(a => a.manager_id);

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
                choices: getAllManagers
            }
        ]);

    } else if (response.addItem === "Add a department") {

    } else {

    }
}


add()
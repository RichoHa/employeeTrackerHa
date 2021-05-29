const inquirer = require("inquirer");
const cTable = require('console.table');

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
        console.table(departmentArray);
    } else if (response.viewItem === "Roles") {
        console.table(roleArray);
    } else if (response.viewItem === "Employees") {
        console.table(employeeArray);
    } else if (response.viewItem === "Salary of Department") {
        let getAllDepartments = departmentArray.map(a => a.name);
        let occuranceRole = 0;

        const response = await inquirer.prompt([
            {
                type: 'list',
                name: 'salaryDepartment',
                message: 'Please pick which department',
                choices: getAllDepartments,
            }
        ]);
        employeeArray.forEach((element) => {
            if (response.salaryDepartment === element.role_id) {
                occuranceRole = occuranceRole + 1;
                return occuranceRole;
            }
        })
        console.log(`The number of ${response.salaryDepartment} role is ${occuranceRole}`)

    }
}


view()
const inquirer = require("inquirer");
const cTable = require('console.table');

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


module.exports.view = view;
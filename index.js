
const inquirer = require("inquirer");
const addFile = require(`./assets/js/add.js`)
const viewFile = require(`./assets/js/view.js`)



// let viewFile = require(`./assets/js/view.js`)

// Example/Seed Information to get code working
// let roleArray = [
//     { "id": "1", "title": "Mechanical Engineer", "salary": "100000", "department_id": "Engineering" },
//     { "id": "2", "title": "Pharmacy ass", "salary": "10000", "department_id": "Pharmacy" },
// ]

// let employeeArray = [
//     { "id": "1", "first_name": "John", "last_name": "Ha", "role_id": "Mechanical Engineer", "manager_id": "Richard Ha" },
//     { "id": "2", "first_name": "Kimmy", "last_name": "Tran", "role_id": "Pharmacy ass", "manager_id": "Richo Ha" },
//     { "id": "3", "first_name": "Daniel", "last_name": "Ha", "role_id": "Mechanical Engineer", "manager_id": "Richo Ha" }
// ]

// let departmentArray = [
//     { "id": "1", "name": "Engineering" },
//     { "id": "2", "name": "Pharmacy" }
// ]

//Code Function
async function code() {
    await viewFile.view();

    // console.table(view[0]);
    // connection.end();
    // await addFile.add(roleArray, employeeArray, departmentArray);
}

code()
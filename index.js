
const inquirer = require("inquirer");
const addFile = require(`./assets/js/add.js`)
const viewFile = require(`./assets/js/view.js`)
require('dotenv').config()

const connection = {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.USER,
    password: process.env.PASS,
    database: "employeeDB",
}



// let viewFile = require(`./assets/js/view.js`)

//Code Function
async function code() {

    // await addFile.add();

    await viewFile.view();


}

code()
module.exports.connection = connection;
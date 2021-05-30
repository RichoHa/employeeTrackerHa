const inquirer = require("inquirer");
const addFile = require(`./assets/js/add.js`)
const viewFile = require(`./assets/js/view.js`)
const updateFile = require(`./assets/js/update.js`)

// let viewFile = require(`./assets/js/view.js`)

//Code Function
async function code() {
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'What do you want to do?',
            choices: ["Add Stuff", "View Stuff", "Update/Delete Stuff"]
        }
    ]);
    if (response.task === "Add Stuff") {
        await addFile.add();
    } else if (response.task === "View Stuff") {
        await viewFile.view();
    } else if (response.task === "Update/Delete Stuff") {
        await updateFile.update();
    }
}

code()
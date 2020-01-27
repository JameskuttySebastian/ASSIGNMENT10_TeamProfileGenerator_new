// import classes and inquirer package

const Employee = require("./Employee");
const inquirer = require('inquirer');
//inheriting for user input validation
const validate = require("./validate");

//class definition

class Manager extends Employee {
    constructor(name, id, email, officeNumber = "") {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() { return this.officeNumber }
    getRole() { return "Manager" };
}



const getManager = async manager => {
    // set of questions for manager. App collects and sets attributes
    // console.log("Started Manager:getManager()");
    await inquirer.prompt([
        {
            message: "What's name of Manager?",
            type: "input",
            name: "name",
            validate: validate.validateString // for error validation
        },
        {
            message: "What's ID of Manager?",
            type: "input",
            name: "id",
            validate: validate.validateNumber // for error validation
        },
        {
            message: "What's the email?",
            type: "input",
            name: "email",
            validate: validate.validateEmail // for error validation
        },
        // asking special question that belongs to manager
        {
            message: "What's office number of Manager?",
            type: "input",
            name: "officeNumber",
            validate: validate.validateNumber // for error validation
        }]).then(function (ans) {
            manager.name = ans.name;
            manager.id = ans.id;
            manager.email = ans.email;
            manager.officeNumber = ans.officeNumber;

        })
    // console.log("Manager: "+JSON.stringify(manager))
    return manager;
};

// getManager();



module.exports = {
    Manager: Manager,
    getManager: getManager
};
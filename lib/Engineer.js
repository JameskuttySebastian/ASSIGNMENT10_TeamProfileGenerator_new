
// inherit the employee class to extend
const Employee = require("./Employee");
// for user input collection
const inquirer = require('inquirer');
// for user input validation
const validate = require("./validate");

// Engineer class 
class Engineer extends Employee {
    constructor(name, id, email, github = "") {
        super(name, id, email);
        this.github = github;
    }
    getRole() { return "Engineer" };
    getGithub() { return this.github }
}

//Engineer data collection function


const getEngineer = async engineer => {
    // set of questions for engineer. App collects and sets attributes
    await inquirer.prompt([
        {
            message: "What's name of Engineer?",
            type: "input",
            name: "name",
            validate: validate.validateString
        },
        {
            message: "What's ID of Engineer?",
            type: "input",
            name: "id",
            validate: validate.validateNumber
        },
        {
            message: "What's the email?",
            type: "input",
            name: "email",
            validate: validate.validateEmail
        },
        // asking special question that belongs to engineer
        {
            message: "What's Git name of Engineer?",
            type: "input",
            name: "github",
            validate: validate.validateString
        }]).then(function (ans) {
            engineer.name = ans.name;
            engineer.id = ans.id;
            engineer.email = ans.email;
            engineer.github = ans.github;

            //return the engineers array, when user confirms all the engineers are entered

        })
    return engineer;
};

// getEngineer();


//exports the functions
module.exports = {
    Engineer: Engineer,
    getEngineer: getEngineer
};

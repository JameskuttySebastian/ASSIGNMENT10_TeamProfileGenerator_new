
// import classes and inquirer package
const Employee = require("./Employee");
const inquirer = require('inquirer');
//inheriting for user input validation
const validate = require("./validate");

//class definition

class Intern extends Employee {
    constructor(name,id,email,school = "") {
        super(name,id,email);
        this.school = school;
    }    
    getSchool(){return this.school};
    getRole() {return "Intern"};
}


const getIntern = async intern => {
    // set of questions for intern. App collects and sets attributes
    await inquirer.prompt([
        {
            message: "What's name of intern?",
            type: "input",
            name: "name",
            validate: validate.validateString // for error validation
        },
        {
            message: "What's ID of intern?",
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
    //asking special input for intern (school)
        {
            message: "What's school name of Intern?",
            type: "input",
            name: "school",
            validate: validate.validateString // for error validation
        }])
        .then(function (ans) {
            intern.name = ans.name;
            intern.id = ans.id;
            intern.email = ans.email;
            intern.school = ans.school;
            return intern;
        })
}

// getIntern();

// exports the class and method

module.exports = {
    Intern: Intern,
    getIntern: getIntern};


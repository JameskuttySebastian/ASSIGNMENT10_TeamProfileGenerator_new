// all the module imports
const Employee = require("./lib/Employee"); // not used

// imported to get all the use data
const { Manager, getManager } = require("./lib/Manager");
const { Engineer, getEngineer } = require("./lib/Engineer");
const { Intern, getIntern } = require("./lib/Intern");

// for user input collection
const inquirer = require('inquirer');
// for user input validation
const validate = require("./lib/validate");


const fs = require("fs"); // for writing into a file
const util = require("util"); // for promisifying

const writeFileAsync = util.promisify(fs.writeFile);

let employeeList = [];


async function getEmployeeType() {
    await inquirer.prompt([
        {
            type: "list",
            message: "Which Employee you eant to create?",
            name: "contact",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function (data) {
        if (data) {
            return data.contact;
        }       
    })
}

async function getEmployee(employeeType) {
    if (employeeType == "Manager") {
        let manager = new Manager;
        return await getManager(manager);        
    }
    else if (employeeType == "Engineer") {
        let engineer = new Engineer;
        return await getEngineer(engineer);
    }
    else if (employeeType == "Manager") {
        let intern = new Intern;
        return await getIntern(intern);
    }
}

async function continueEmployeeList() {
    await inquirer.prompt(
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another employee? ',
            default: true
        })
        .then(function (ans) {
            return ans.again;
        })

}

const main = async () => {

    const employeeType = await getEmployeeType();

    console.log(employeeType);

    employeeList.push(getEmployee(employeeType));

    const continueList = await continueEmployeeList();

    console.log(continueList)

    if (continueList) {
        employeeType();
    }

    console.log(JSON.stringify(employeeList));


};


main(); // invoke main function


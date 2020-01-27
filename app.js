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
const util = require("util"); // for promisify

const writeFileAsync = util.promisify(fs.writeFile);

let employeeList = [];


async function getEmployeeType() {
    return await inquirer.prompt([
        {
            type: "list",
            message: "Which employee type you want to enter?",
            name: "empType",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }
    ]).then(function (data) {
        return data.empType;
    })
}

async function getEmployee(employeeType) {
    return async function () {
        if (employeeType === "Manager") {
            let manager = new Manager;
            console.log("manager created : " + JSON.stringify(manager));
            let managerObj = await getManager(manager);
            return managerObj;
        } else if (employeeType === "Engineer") {
            let engineer = new Engineer;
            console.log("Engineer created : " + JSON.stringify(engineer));
            return await getEngineer(engineer);
        } else if (employeeType === "Manager") {
            let intern = new Intern;
            console.log("Engineer intern : " + JSON.stringify(intern));
            return await getIntern(intern);
        }
    }
}

async function continueEmployeeList() {
    return await inquirer.prompt(
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

async function getEmployeeList(){

    const employeeType = await getEmployeeType();

    console.log(employeeType);

    employeeList.push(getEmployee(employeeType));

    const continueList = await continueEmployeeList();

    return employeeList;
}

const main = async () => {
    let employeeObjList = await getEmployeeList();

    if (continueList) {
        console.log("if (continueList)" + continueList);
        getEmployeeList();

    }

    console.log("main employeeObjList : "+ employeeObjList)


};


main(); // invoke main function


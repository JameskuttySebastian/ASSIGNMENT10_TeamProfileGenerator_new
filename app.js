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

//Global variables
let employeeList = [];
let listItemNo = 0;// for avoiding "do you want to continue?" for first time

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

async function getEmployeeMember(employeeType) {

	if (employeeType === "Manager") {
		let manager = new Manager;

		let managerObj = await getManager(manager);

		return managerObj;
	} else if (employeeType === "Engineer") {
		let engineer = new Engineer;

		return await getEngineer(engineer);
	} else if ( employeeType === "Intern") {
		let intern = new Intern;

		return await getIntern(intern);
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

async function getEmployee(){

	const employeeType = await getEmployeeType();

	let employeeCreated = await getEmployeeMember(employeeType);

	return employeeCreated;
}



async function getEmployeeList(){
    if(listItemNo ===0){
        let employeeObj = await getEmployee();
        listItemNo++;
        employeeList.push(await employeeObj);
    }
    let continueList = false;
    if (listItemNo > 0) {
        continueList = await continueEmployeeList();
        while (continueList) {
            let employeeObj = await getEmployee();
            employeeList.push(employeeObj);
			continueList = await continueEmployeeList();
			console.log("continueList : "+ continueList)
        }
    }
	return employeeList;
}

const main = async () => {

	let employeeObjList = await getEmployeeList();
	console.log("main employeeObjList : "+ JSON.stringify(employeeObjList));

};


main(); // invoke main function


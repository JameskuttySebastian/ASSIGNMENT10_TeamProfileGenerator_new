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

async function getEmployeeMember(employeeType) {
	console.log("async function getEmployeeMember(employeeType): started");
	if (await employeeType === "Manager") {
		let manager = new Manager;
		console.log("manager obj created to pass to Manager class: " + JSON.stringify(manager));
		let managerObj = await getManager(manager);
		console.log("Received Manager Object : " + JSON.stringify(managerObj));
		return managerObj;
	} else if (await employeeType === "Engineer") {
		let engineer = new Engineer;
		console.log("Engineer created : " + JSON.stringify(engineer));
		return await getEngineer(engineer);
	} else if (await employeeType === "Manager") {
		let intern = new Intern;
		console.log("Engineer intern : " + JSON.stringify(intern));
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
	console.log("sync function getEmployee called");
	const employeeType = await getEmployeeType();

	console.log("getEmployee.employeeType :" + employeeType);

	let employeeCreated = await getEmployeeMember(employeeType);

	return employeeCreated;
}

	let listItemNo = 0;// for avoiding "do you want to continue?" for first time

async function getEmployeeList(){
    if(listItemNo ===0){
    	console.log("First time running employee type : "+ listItemNo);
        let employeeObj = await getEmployee();
        listItemNo++;
		console.log("First time running listItemNo ++ : "+ listItemNo);
		console.log("employeeObj : "+JSON.stringify(employeeObj));
        employeeList.push(await employeeObj);
    }
    else if (listItemNo > 0) {
        const continueList = await continueEmployeeList();
		console.log("continueList : "+ continueList);
		console.log("Second round running employee type : "+ listItemNo);
        if (continueList) {
            let employeeObj = await getEmployee();
			console.log("Second round running employee type : "+ listItemNo);
			console.log("employeeObj second round : "+JSON.stringify(employeeObj));
            employeeList.push(employeeObj);
        }
        else if (!continueList){
            return employeeList;
        }
    }
}

const main = async () => {
	console.log("main function started" );
	let employeeObjList = await getEmployeeList();
	console.log("main employeeObjList : "+ employeeObjList)

};


main(); // invoke main function


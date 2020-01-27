// all the module imports
const Employee = require("./lib/Employee"); // not used

// imported to get all the use data
const { Manager, getManager } = require("./lib/Manager");
const { Engineer, getEngineer } = require("./lib/Engineer");
const { Intern, getIntern } = require("./lib/Intern");


// for user input collection
const inquirer = require('inquirer');
//for replacing the object values
const Handlebars = require("handlebars");
// for user input validation
const validate = require("./lib/validate");


const fs = require("fs"); // for writing into a file
const util = require("util"); // for promisify

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

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
	try{
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
	catch (e) {
		console.log("Error: "+ e);
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

async function getHtmlBody(type){
	let filePath = "";
	if (type ==="Manager"){
		filePath = "./templates/manager.html";
	}
	else if (type ==="Engineer"){
		filePath = "./templates/engineer.html";
	}
	else if (type ==="Intern"){
		filePath = "./templates/intern.html";
	}
	else if (type ==="Main"){
		filePath = "./templates/main.html";
	}

	const fileContent = await readFileAsync(filePath);
	return ("'"+ fileContent+"'");
}

const main = async () => {

	let employeeObjList = await getEmployeeList();

	//for saving all the employee html data
	let employeeHtmlArray = [];
	//generate html for each employee and save into an array
	for (const obj of employeeObjList) {
		let objType = obj.constructor.name;
		let empHtmlBody = await getHtmlBody(objType);
		let template = Handlebars.compile(empHtmlBody);
		employeeHtmlArray.push(template(obj));
	}
	//combine all the employee information html
	let employeeHtmlJoined = (employeeHtmlArray.join("\n"));
	// get main html body
	let mainHtmlBody = await getHtmlBody("Main");

	//replace the variable with the generated html
	let pageHtml = await mainHtmlBody.replace("{{employeeHtml}}", employeeHtmlJoined);


// writing to html file
	await writeFileAsync("./output/team.html", pageHtml);
};


main(); // invoke main function


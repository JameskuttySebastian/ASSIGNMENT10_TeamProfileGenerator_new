//defining the class
// this is the base class for all type of person
class Employee{
    constructor (name = "", id = 0,  email = "") {
        this.name = name;
        this.id = id;
        this.email = email;
    };
    
    getName(){return this.name};
    getId(){return this.id};
    getEmail(){return this.email};
    //defining the method without an attribute
    getRole(){return "Employee"};    
}

// exporting the class
module.exports = Employee;
  
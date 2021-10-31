import Person from "./Person";

export default class Employee extends Person{
    constructor(firstName, lastName, employeeID){
        super(firstName, lastName);
        this.employeeID = employeeID;
    }

    cancelOrder(){
        console.log("I have canceled your order");
    }

    processOrder(){
        console.log("I have processed your order");
    }
}
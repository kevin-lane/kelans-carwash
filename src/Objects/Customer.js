import Person from "./Person";

export default class Customer extends Person {
    constructor(firstName, lastName, email, telephone, customerID){
        super(firstName, lastName);
        this.email = email;
        this.telephone = telephone;
        this.customerID = customerID;
    }

    placeOrder(){

    }

    cancelOrder(){
        
    }
}
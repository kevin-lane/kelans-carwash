import { Component } from "react";
import OrderConfirmation from "./OrderConfirmation";
import { db } from "../firebase";
import Customer from "../Objects/Customer";
import Order from "../Objects/Order";
import classes from './BookingForm.module.css';

export default class BookingForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            isSuvOrMinivan: false,
            cFirstName: '',
            cLastName: '',
            cEmail: '',
            cID: '',
            cTelephone: '',
            vRegNo: '',
            bookedTime: '',
            totalPrice: this.props.workPrice,
            oID: '',
            orderConfirmed: false
        }
    }

    handleSuvOrMinivan = () => {
        this.setState(prevState => ({
            isSuvOrMinivan: !prevState.isSuvOrMinivan
        }));
    }

    handleFirstName = (e) => {
        this.setState({ cFirstName: e.target.value })
    }

    handleLastName = (e) => {
        this.setState({ cLastName: e.target.value })
    }

    handleEmail = (e) => {
        this.setState({ cEmail: e.target.value })
    }

    handleTelephone = (e) => {
        this.setState({ cTelephone: e.target.value })
    }

    handleRegistrationNumber = (e) => {
        this.setState({ vRegNo: e.target.value })
    }

    handleBookedTime = (e) => {
        this.setState({ bookedTime: e.target.value.replace('T', ' ') });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            orderConfirmed: true
        });

        //Create a new customer
        const newCustomer = new Customer(this.state.cFirstName, this.state.cLastName, this.state.cEmail, this.state.cTelephone, this.state.cID);
        var customersRef = db.collection('customers');

        //Create the order
        const newOrder = new Order(this.state.oID, this.state.cID, this.props.workItem, this.state.bookedTime, this.state.totalPrice);
        var ordersRef = db.collection('orders');
        
        //Add Customer and Order
        customersRef.add({
            firstName: newCustomer.firstName,
            lastName: newCustomer.lastName,
            email: newCustomer.email,
            telephone: newCustomer.telephone
        }).then((cId) => {
            this.setState({
                cID: cId.id
            })
            //Add order
            ordersRef.add({
                customer: cId.id,
                orderedItem: newOrder.orderItem,
                date: newOrder.date,
                totalCost: newOrder.totalCost
            }).then((oId) => {
                newCustomer.customerID = this.state.cID;
                
                this.setState({
                    oID: oId.id
                });
            });
        });
    }

    render(){
        return(
            <div>
                {this.state.orderConfirmed ? 
                    <OrderConfirmation 
                        fname={this.state.cFirstName} 
                        lname={this.state.cLastName} 
                        email={this.state.cEmail}
                        telephone={this.state.cTelephone}
                        customerID={this.state.cID} 
                        orderedItem={this.props.workItem} 
                        orderID={this.state.oID} 
                        date={this.state.bookedTime} 
                        cost={this.state.isSuvOrMinivan ? this.state.totalPrice + 150 : this.state.totalPrice} 
                    />
                    :
                    <div>
                        <p>You have chosen the carwash menu {this.props.workItem}</p>

                        <form onSubmit={this.handleSubmit}>
                            <p><b>Customer Details</b></p>
                            <input  className={classes.CustomerInput} type="text" placeholder="First Name" onChange={this.handleFirstName} required></input>
                            <input  className={classes.CustomerInput} type="text" placeholder="Last Name" onChange={this.handleLastName} required></input>
                            <input  className={classes.CustomerInput} type="email" placeholder="Email" onChange={this.handleEmail} required></input>
                            <input  className={classes.CustomerInput} type="text" placeholder="Telephone" onChange={this.handleTelephone} required></input>

                            <p><b>Vehicle Information</b></p>
                            <input className={classes.VehicleInput} type="text" placeholder="Registration number (e.g. ABC123)" onChange={this.handleRegistrationNumber} required></input>

                            <p>SUV or Minivan?:</p>
                            <label for="yes">YES</label>
                            <input 
                                type="radio" 
                                id="yes" 
                                name="isSUV" 
                                value="yes"
                                onChange={this.handleSuvOrMinivan}
                                checked={this.state.isSuvOrMinivan === true} 
                            ></input>

                            <label for="no">NO</label>
                            <input 
                                type="radio" 
                                id="no" 
                                name="isSUV" 
                                value="no"
                                checked={this.state.isSuvOrMinivan === false} 
                                onChange={this.handleSuvOrMinivan}
                            ></input>

                            <p><strong>NOTE:</strong> If your vehicle is a SUV or a minivan, there will be an additional cost of 150SEK.</p>
                            <p></p>
                            <p><b>Book a time:</b></p>
                            <input type="datetime-local" step="300" onChange={this.handleBookedTime}></input>

                            <h3>Total cost: {this.state.isSuvOrMinivan ? this.state.totalPrice + 150 : this.state.totalPrice}</h3>
                            <button id={classes.cancelBtn} className={classes.ActionButtons} onClick={this.props.cancelOrder}>Cancel</button>
                            <button id={classes.submitBtn} className={classes.ActionButtons}>Place your order</button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}
import { Component } from "react";
import { db } from "../firebase";


import classes from './CancelOrder.module.css';

export default class CancelOrder extends Component{
    constructor(props){
        super(props);
        this.state = {
            customerID: '',
            orderID: ''
        }
    }

    handleCustomerID = (e) => {
        this.setState({ customerID: e.target.value })
    }

    handleOrderID = (e) => {
        this.setState({ orderID: e.target.value })
    }

    render(){
        return(
            <div className={classes.CancellationForm}>
                <h3>Cancel your order by typing your Order ID together with your Customer ID</h3>
                <form onSubmit={(e) => this.handleOrderCancellation(e, this.state.orderID, this.state.customerID)}>
                    <input className={classes.CancellationInput} type="text" placeholder="Customer ID" onChange={this.handleCustomerID} required></input>
                    <input className={classes.CancellationInput} type="text" placeholder="Order ID" onChange={this.handleOrderID} required></input>
                    <button className={classes.CancellationButton}>Cancel your order</button>
                </form>
            </div>
        )
    }

    async handleOrderCancellation(e, orderID, customerID){
        e.preventDefault();
        const ordersRef = db.collection('orders').doc(orderID);
        const order = await ordersRef.get();

        if (!order.exists) {
            alert("No such order")
        }
        else if(order.data().customer !== customerID){
            alert("Please enter correct customer ID for the order");
        }
        else {
            ordersRef.delete().then((oID) => {
                alert(`Your order ${orderID} has been cancelled`);
            });
        }
    }
}
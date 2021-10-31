import { Component } from "react";

export default class OrderConfirmation extends Component{
    render(){
        return(
            <div>
                <h3>Thank you for your order {this.props.fname} {this.props.lname}</h3>
                <p>Customer ID: {this.props.customerID}</p>
                <p>Product: {this.props.orderedItem}</p>
                <p>Order ID: {this.props.orderID} (Needed for cancellation of your order)</p>
                <p>Date: {this.props.date}</p>
                <p>Total cost: {this.props.cost} SEK</p>
            </div>
        )
    }
}
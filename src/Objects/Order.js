export default class Order{
    constructor(orderID, customerID, orderItem, date, totalCost){
        this.orderID = orderID;
        this.customerID = customerID;
        this.orderItem = orderItem;
        this.date = date;
        this.totalCost = totalCost;
    }
}
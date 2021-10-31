import { Component } from "react";
import BookingForm from "./BookingForm";

import classes from './CarwashMenu.module.css';

const DUMMY_WASH_MENU = [
    {title: 'Exterior Wash', price: 299, itemID: 'item1'},
    {title: 'Interior Wash', price: 199, itemID: 'item2'},
    {title: 'Exterior + Interior Wash', price: 450, itemID: 'item3'},
    {title: 'Deluxe Wash', price: 999, itemID: 'item4'},

];

export default class CarwashMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            aboutToBook: null
        }
    }

    render(){
        return(
            <div className={classes.menuList}>
                {DUMMY_WASH_MENU.map(item => {
                        if (this.state.aboutToBook === item.itemID) {
                            return <BookingForm workItem={item.title} workPrice={item.price} cancelOrder={() => this.setState({ aboutToBook: null })} />
                        }
                        else if(this.state.aboutToBook === null){
                            return(
                                <ul className={classes.menuListItems}>
                                    <li key={item.itemID}>{item.title}  <br/>{item.price}SEK  <button className={classes.bookingBtn} onClick={() => this.setState({ aboutToBook: item.itemID })}>Book a time</button></li>
                                </ul>
                            )
                        }
                        return null;
                    }
                )}
            </div>
        )
    }
}
import { Component } from "react";
import classes from './Navigationbar.module.css';

export default class Navigationbar extends Component {

    render(){
        return(
            <ul className={classes.Navbar}>
                <h2 className={classes.Logo}>KELANS CARWASH</h2>
                <li><button onClick={this.props.goHome}>Main Page</button></li>
                <li><button onClick={this.props.cancelOrder}>Cancel your order</button></li>
            </ul>
        );

    }
}
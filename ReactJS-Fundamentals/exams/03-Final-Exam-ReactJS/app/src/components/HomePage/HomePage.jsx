import React, {Component} from 'react';
export default class HomePage extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        if (localStorage.getItem('authtoken') === null) {
            return (
                <div className="container">
                    <h1>Welcome to budget planner</h1>
                    <div className="center">
                        <a className="button" href="/login">Log In</a>
                        <a className="button" href="/register">Register</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <h1>Welcome to budget planner</h1>
                    <div className="center">
                        <a className="button" href="/balance/yearly">Yearly Balance</a>
                        <a className="button" href={"/balance/monthly/"+ Number(new Date().getMonth() + 1)}>Monthly Balance</a>
                    </div>
                </div>
            );
        }

    }
}
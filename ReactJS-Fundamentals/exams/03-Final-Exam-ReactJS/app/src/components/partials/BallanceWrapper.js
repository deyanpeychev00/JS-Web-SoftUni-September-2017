import React, {Component} from 'react';
import {calendar} from "../../utils/calendar";

export default class BallanceWrapper extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <span>
                <div className="card text-white bg-secondary">
                    <div className="card-body">
                        <blockquote className="card-blockquote">
                            <h2>{calendar.calendar[this.props.id]}</h2>
                            <h4>Year {new Date().getFullYear()}</h4>
                            <label htmlFor="budget">Budget:</label>
                            <input type="text" className="col-md-9" name="budget" value={this.props.month.budget}
                                   disabled/> <br/>
                            <label htmlFor="balance">Balance:</label>
                            <input type="text" className="col-md-9" name="balance" value={this.props.month.balance}
                                   disabled/>
                            <div className="space-top">
                                <a href={localStorage.getItem('authtoken') !== null ?
                                    "/balance/monthly/" + this.props.id :
                                    '/login'} className="button">Details</a>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </span>
        );
    }
}
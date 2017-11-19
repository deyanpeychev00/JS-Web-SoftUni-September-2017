import React, {Component} from 'react';
import {getYearlyBalance} from "../../api/remote";
import BallanceWrapper from "../partials/BallanceWrapper";

export default class YearlyBallance extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    async componentDidMount() {
        const res = await getYearlyBalance();
        this.setState(res);
    }

    render() {
        console.log(this.state);
        const state = this.state;
        return (
            <div className="container">
                <h1>Yearly balance</h1>
                <div className="center">
                    {Object.keys(this.state).map(m => {
                        return <BallanceWrapper key={m} month={state[m]} id={m}/>
                    })}
                </div>
            </div>
        );
    }
}
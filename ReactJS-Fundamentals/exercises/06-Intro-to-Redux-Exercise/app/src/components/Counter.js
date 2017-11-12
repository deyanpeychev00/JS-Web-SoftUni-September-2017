import React, {Component} from 'react';

export default class Counter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: props.props.index,
            value: props.props.value
        };

        // bind event handlers
        this.incrementValue = this.incrementValue.bind(this);
        this.decrementValue = this.decrementValue.bind(this);
        this.clearValue = this.clearValue.bind(this);
    }

    incrementValue() {
        this.setState({
            index: this.state.index,
            value: this.state.value + 1
        });
    }

    decrementValue() {
        this.setState({
            index: this.state.index,
            value: this.state.value - 1
        });
    }

    clearValue() {
        this.setState({
            index: this.state.index,
            value: 0
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.value}</h1>
                <button className="incrementCounterButton" onClick={this.incrementValue}>Increment</button>
                <button className="decrementCounterButton" onClick={this.decrementValue}>Decrement</button>
                <button className="clearCounterButton" onClick={this.clearValue}>Clear</button>
            </div>
        );
    }
};

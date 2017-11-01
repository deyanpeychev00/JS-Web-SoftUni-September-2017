import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class Parent extends Component {
    constructor() {
        super();
        this.state = {counter: 0};

        this.inc = () => {
            this.setState((prevState) => {
                return { counter: prevState.counter + 1}
            });
        }
    }

    render() {
        return (<div>
            <h1>My counter is: {this.state.counter}</h1>
            <Child inc={this.inc}/>
        </div>)
    }
}

class Child extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return <button onClick={this.props.inc}>Update my counter</button>
    }
}


export default Parent;

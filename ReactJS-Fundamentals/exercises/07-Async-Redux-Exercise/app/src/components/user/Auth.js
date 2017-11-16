import React, {Component} from 'react';
import {connect} from 'react-redux';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import fetchDispatcher from '../../store/actions/fetchDispatcher';

let authObj = {};

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true
        };

        // bind event handlers
        this.dataCollector = this.dataCollector.bind(this);
    }

    dataCollector = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        authObj[e.target.name] = e.target.value;
    };

    pathStateChanger = () => {
        this.setState({
            login: !this.state.login
        });
    };


    render() {
        if (this.state.login) {
            return (
                <LoginPage viewFunc={this.pathStateChanger} dataFunc={this.dataCollector}/>
            )
        } else {
            return (
                <RegisterPage
                    submitRegister={this.props.registerFunc}
                    userProps={this.state}
                    viewFunc={this.pathStateChanger}
                    dataFunc={this.dataCollector}
                />
            )
        }

    }
}


function mapStateToProps(state) {
    return {
        store: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerFunc: () => dispatch(fetchDispatcher({username: authObj.username, password: authObj.password, subscriptions: []}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
import React, {Component} from 'react';
import makeRequest from './../../../utils/requester';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        // bind events to parent
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        makeRequest('user', '/login', 'POST', 'basic', this.state, 'login' );
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.onSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input onChange={this.onChange} name="username" type="text"/>
                <label>Password:</label>
                <input onChange={this.onChange} name="password" type="password"/>
                <span className="spanInfo"
                      style={({"display": ((this.state.username === '' || this.state.password === '')) ? '' : 'none'})}>
                    Please enter valid credentials.
                </span>
                <input
                    style={({"display": (!(this.state.username === '' || this.state.password === '')) ? '' : 'none'})}
                    id="btnLogin" value="Sign In" type="submit"/>
            </form>
        );
    }
}
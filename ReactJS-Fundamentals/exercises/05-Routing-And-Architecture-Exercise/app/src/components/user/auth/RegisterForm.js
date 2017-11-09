import React, {Component} from 'react';
import makeRequest from './../../../utils/requester';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            repeatPassword: ''
        };

        // bind events to parent
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let body = {
            username: this.state.username,
            password: this.state.password
        };
        makeRequest('user', '', 'POST', 'basic', body, 'register');
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.onSubmit}>
                <h2>Register</h2>
                <label>Username:</label>
                <input onChange={this.onChange} name="username" type="text"/>
                <label>Password:</label>
                <input onChange={this.onChange} name="password" type="password"/>
                <label>Repeat Password:</label>
                <input onChange={this.onChange} name="repeatPassword" type="password"/>
                <span className="spanInfo"
                      style={({"display": ((this.state.username === '' || this.state.password === '' || this.state.repeatPassword === '' || this.state.password !== this.state.repeatPassword)) ? '' : 'none'})}>
                    Please enter valid credentials.
                </span>
                <input
                    style={({"display": (!(this.state.username === '' || this.state.password === '' || this.state.repeatPassword === '' || this.state.password !== this.state.repeatPassword)) ? '' : 'none'})}
                    id="btnRegister" value="Sign Up" type="submit"/>
            </form>
        );
    }
}
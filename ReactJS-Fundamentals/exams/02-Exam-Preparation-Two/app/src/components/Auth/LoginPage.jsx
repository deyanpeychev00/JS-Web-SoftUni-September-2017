import React, { Component } from 'react';
import Input from '../common/Input';
import { login } from '../../api/remote';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const response = await login(this.state.email, this.state.password);
        if(response.success){
            localStorage.setItem('authtoken', response.token);
            localStorage.setItem('username', response.user.name);
            toastr.success(response.message + '\n Redirecting to home page...');
            setTimeout(() => {window.location.replace('/')}, 2000);
        }else{
            toastr.error(response.message);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Log in</h1>
                <form className="center" onSubmit={this.onSubmitHandler}>
                    <Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeHandler}
                        label="E-mail"
                        placeholder="E-mail"
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        label="Password"
                        placeholder="Password"
                    />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        );
    }
}
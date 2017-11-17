import React, {Component} from 'react';
import Input from '../common/Input';
import {register} from '../../api/remote';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeat: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const response = await register(this.state.name, this.state.email, this.state.password);
        console.log(response);
        if (response.success) {
            toastr.success(response.message + '\n Redirecting to login...');
            setTimeout(() => {window.location.replace('/login')}, 3000);
        } else {
            toastr.error(response.message);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Register</h1>
                <form className="center" onSubmit={this.onSubmitHandler}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                        placeholder="Name"
                    />
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
                    <Input
                        name="repeat"
                        type="password"
                        value={this.state.repeat}
                        onChange={this.onChangeHandler}
                        label="Repeat password"
                        placeholder="Repeat password"
                    />
                    <input type="submit" className="btn btn-primary" value="Register"/>
                </form>
            </div>
        );
    }
}
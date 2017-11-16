import React, {Component} from 'react';
import Input from "../../partials/user/Input";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginAction, registerAction, redirect} from "../../../actions/auth";

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: ''
        };

        //bind handlers
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    submitHandler(e) {
        e.preventDefault();
        this.props.register(this.state.name, this.state.email, this.state.password);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.registerSuccess) {
            this.props.login(this.state.email, this.state.password)
        }
    }

    render() {
        if (this.props.loginSuccess) {
            this.props.redirect();
            return (
                <Redirect to="/"/>
            )
        } else {
            return (
                <main>
                    <div className="container">
                        <div className="row space-top">
                            <div className="col-md-12">
                                <h1>Register</h1>
                                <p>Please fill all fields.</p>
                            </div>
                        </div>
                        <form onSubmit={this.submitHandler}>
                            <div className="row space-top">
                                <div className="col-md-4">
                                    <Input
                                        name={'name'}
                                        type={'text'}
                                        value={this.state.name}
                                        onChange={this.changeHandler}
                                        label={'Name'}
                                    />
                                    <Input
                                        name={'email'}
                                        type={'text'}
                                        value={this.state.email}
                                        onChange={this.changeHandler}
                                        label={'E-mail'}
                                    />
                                    <Input
                                        name={'password'}
                                        type={'password'}
                                        value={this.state.password}
                                        onChange={this.changeHandler}
                                        label={'Password'}
                                    />
                                    <Input
                                        name={'repeatPassword'}
                                        type={'password'}
                                        value={this.state.repeatPassword}
                                        onChange={this.changeHandler}
                                        label={'Repeat password'}
                                    />
                                    <input type="submit" className="btn btn-primary" value="Register"/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br/>
                </main>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        registerSuccess: state.register.success,
        loginSuccess: state.login.success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (name, email, password) => dispatch(registerAction(name, email, password)),
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
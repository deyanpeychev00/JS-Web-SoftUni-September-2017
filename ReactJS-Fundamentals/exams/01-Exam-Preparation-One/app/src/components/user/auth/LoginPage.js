import React, {Component} from 'react';
import Input from "../../partials/user/Input";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginAction, redirect} from "../../../actions/auth";

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        if (this.props.loginSuccess) {
            return (
                <Redirect to="/"/>
            )
        } else {
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
                                    <h1>Login</h1>
                                </div>
                            </div>
                            <form onSubmit={this.submitHandler}>
                                <div className="row space-top">
                                    <div className="col-md-4">
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
                                        <input type="submit" className="btn btn-primary" value="Login"/>
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
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.login.success
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (email, password) => dispatch(loginAction(email, password)),
        redirect: () => dispatch(redirect())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
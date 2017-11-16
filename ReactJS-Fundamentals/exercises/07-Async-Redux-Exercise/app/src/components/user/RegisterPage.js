import React, {Component} from 'react';
import {connect} from 'react-redux';
import fetchDispatcher from '../../store/actions/fetchDispatcher';

let executeSubmit = (e, payload, func) => {
    e.preventDefault();
    let passObj = {
        username: payload.username,
        password: payload.password,
        subscriptions: []
    };

    func(passObj);
};

let authObj = {};

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.dataFunc = this.dataFunc.bind(this);
    }

    dataFunc = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        authObj[e.target.name] = e.target.value;
    };


    render() {
        return (
            <section id="viewRegister">
                <div className="content">
                    <form onSubmit={(e) => executeSubmit(e, this.props.userProps, this.props.registerFunc)}
                          className="form" id="formRegister">
                        <label>Username</label>
                        <input onChange={(e) => this.dataFunc(e)} name="username" type="text"/>
                        <label>Password</label>
                        <input onChange={(e) => this.dataFunc(e)} name="password" type="password"/>
                        <label>Repeat Password</label>
                        <input onChange={(e) => this.dataFunc(e)} name="repeatPass" type="password"/>
                        <input id="btnRegister" value="Register" type="submit"/>
                        <br/>
                        <span className="auth-subinfo">Already have an account?</span>
                        <button className="buttonChangeView" onClick={(e) => this.props.viewFunc(e)}>Log in</button>
                    </form>
                </div>
            </section>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
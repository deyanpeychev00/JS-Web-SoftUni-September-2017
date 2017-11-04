import React, {Component} from 'react';
import validateInput from './../../utils/formValidator';
import Input from './formFields/Input';

export default class LoginForm extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
        };

        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(e){
        e.preventDefault();

        let payload = {
            email: this.state.email,
            password: this.state.password
        };

        this.login(payload);

    }

    login(payload){
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => {
            return res.json()
        }).then(d => {
           this.props.authFunc(d);
        });
    }

    render() {
        let userPassword = this.state.password;
        let userEmail = this.state.email;

        let dataValidator = validateInput(userEmail, userEmail, 'no-username', userPassword, userPassword );

        return (
            <form onSubmit={this.submitLogin}>
                <fieldset className='App'>
                    <div style={{display: 'inline-grid'}}>
                        <h2>Log In</h2>
                        <Input
                            type='text'
                            data='email'
                            name='Email'
                            func={e => {
                                this.setState({email: e.target.value})
                            }}
                            valid={dataValidator.validMail}
                        />
                        <Input
                            type='password'
                            data='password'
                            name='Password'
                            func={e => {
                                this.setState({password: e.target.value})
                            }}
                            valid={dataValidator.validPassword}
                        />
                        <input
                            style={({"display": (dataValidator.validMail && dataValidator.validPassword) === true ? '' : 'none'})}
                            type='submit'
                            value='Log in'
                        />
                    </div>
                </fieldset>
            </form>
        )
    }
}
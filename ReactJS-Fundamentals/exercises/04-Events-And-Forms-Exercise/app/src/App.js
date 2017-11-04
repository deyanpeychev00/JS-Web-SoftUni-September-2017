import React, {Component} from 'react'
import './App.css'

import SingUpForm from './components/form/SingUpForm.jsx'
import LoginForm from './components/form/LogInForm.jsx'
import PokeIndex from './components/form/PokeIndex.jsx'

function tokenAvailable(token) {
    return token !== '' && token !== 'undefined' && typeof(localStorage.token) !== 'undefined';
}


class App extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            token: ''
        };

        this.autenticate = (data) => {
            if (data.success) {
                this.setState({token: data.token, username: data.user.name});
                localStorage.setItem('token', data.token);
            }
        }
    }

    componentDidMount() {
        this.setState({token: localStorage.getItem('token')});
    }

    render() {

        if (tokenAvailable(this.state.token)) {
            return (
                <div>
                    <PokeIndex/>
                </div>)
        } else {
            return (
                <div>
                    <SingUpForm/>
                    <LoginForm authFunc={this.autenticate}/>
                </div>)
        }
    }
}

export default App

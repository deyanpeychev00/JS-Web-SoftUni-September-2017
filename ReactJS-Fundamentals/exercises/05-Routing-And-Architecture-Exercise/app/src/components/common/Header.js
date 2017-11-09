import React, {Component} from 'react';
import auth from './../../utils/auth';
import makeRequest from './../../utils/requester';

export default class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: localStorage.getItem('username'),
            authtoken: localStorage.getItem('authtoken')
        };

        this.logout = this.logout.bind(this);
    }

    logout(e){
        e.preventDefault();
        makeRequest('user', '/_logout', 'POST', 'kinvey', 'noBody', 'logout');
    }

    render(){
        if(auth(this.state.authtoken)){
            return(
                <header>
                    <span className="logo">☃</span><span className="header">SeenIt</span>
                    <div id="profile">
                        <span>{this.state.username}</span>
                        <button className="auth-button" onClick={this.logout}>logout</button>
                    </div>
                </header>
            )
        }else{
            return(
                <header>
                    <span className="logo">☃</span><span className="header">SeenIt</span>
                </header>
            )
        }
    }
};

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <ul>
                    <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                    <li>{loggedIn && <a href="/hotels/add">Add hotel</a>}</li>
                    <li>{loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}</li>
                    <li>{!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}</li>
                    <li>{!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}</li>
                </ul>
            </header>
        );
    }
}
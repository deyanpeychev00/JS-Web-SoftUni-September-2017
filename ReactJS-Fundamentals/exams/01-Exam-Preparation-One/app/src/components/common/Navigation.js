import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom'


export default class Navigation extends Component{
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        return(
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Link className="navbar-brand" to="/">FS</Link>
                                <NavLink activeClassName="active" className="nav-link" exact to="/">Home</NavLink>
                                <NavLink activeClassName="active" className="nav-link" to="/create">Create Furniture</NavLink>
                                <NavLink activeClassName="active" className="nav-link" to="/profile">My Furniture</NavLink>
                                <NavLink activeClassName="active" className="nav-link" to="/logout">Logout</NavLink>
                                <NavLink activeClassName="active" className="nav-link" to="/login">Login</NavLink>
                                <NavLink activeClassName="active" className="nav-link" to="/register">Register</NavLink>
                                <span className="float-right small">72 items in catalog</span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}
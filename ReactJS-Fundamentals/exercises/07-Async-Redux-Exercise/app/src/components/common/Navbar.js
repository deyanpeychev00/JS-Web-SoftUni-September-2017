import React, {Component} from 'react';

export default class Navbar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="menu">
                <a href="#">Home</a>
                <a href="#">Discover</a>
                <a href="#">Me</a>
                <a href="#">Logout</a>
            </div>
        )
    }
}
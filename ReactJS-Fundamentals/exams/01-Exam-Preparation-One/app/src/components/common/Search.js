import React, {Component} from 'react';

export default class Search extends Component{
    constructor(props){
        super(props);

        this.state={}
    }

    render(){
        return(
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" placeholder="Search" type="text"/>
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}
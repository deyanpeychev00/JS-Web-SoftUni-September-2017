import React, {Component} from 'react';
import Pagination from "../../common/Pagination";
import Search from "../../common/Search";
import FurnitureList from "../../furniture/list/FurnitureList";

export default class ProfileView extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {furniture} = this.props;
        return(
            <main>
                <div className="container">
                    <div className="row space-top">
                        <div className="col-md-12">
                            <h1>Profile Page</h1>
                            <p>Listing  your furniture.</p>
                            <br/>
                            <Search/>
                        </div>
                    </div>
                    <FurnitureList furniture={furniture} isDeletable={true}/>
                    <Pagination/>
                </div>
                <br/>
            </main>
        )
    }
}
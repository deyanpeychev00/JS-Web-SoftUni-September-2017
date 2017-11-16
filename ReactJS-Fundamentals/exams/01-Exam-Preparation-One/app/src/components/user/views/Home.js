import React, {Component} from 'react';
import Pagination from "../../common/Pagination";
import Search from "../../common/Search";
import FurnitureList from "../../furniture/list/FurnitureList";

export default class HomePage extends Component{
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
                            <h1>Welcome to Furniture System</h1>
                            <p>Select furniture from the catalog to view details.</p>
                            <br/>
                            <Search/>
                        </div>
                    </div>
                    <FurnitureList furniture={furniture} isDeletable={false}/>
                    <Pagination/>
                </div>
                <br/>
            </main>
        )
    }
}
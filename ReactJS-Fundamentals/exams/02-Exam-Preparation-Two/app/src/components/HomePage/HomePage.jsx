import React, { Component } from 'react';
import AllHotels from "../Hotels/AllHotels";
import {getAllHotels} from "../../api/remote";

export default class HomePage extends Component {

    constructor(props){
        super(props);

        this.state = {
            hotels: []
        }
    }

    async componentDidMount() {
        const hotels = await getAllHotels();
        this.setState({hotels});
    }

    render() {
        return (
            <div className="container">
                <h1>Our Hotels</h1>
                <AllHotels hotels={this.state.hotels}/>
            </div>
        );
    }
}
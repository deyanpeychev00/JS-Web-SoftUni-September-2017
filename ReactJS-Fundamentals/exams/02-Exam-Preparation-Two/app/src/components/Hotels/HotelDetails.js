import React, {Component} from 'react';
import {getCurrentHotel, getHotelReviews} from './../../api/remote';
import ReviewWrapper from "./ReviewWrapper";

export default class HotelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    async componentDidMount() {
        const hotelId = this.props.match.params.id;
        const hotel = await getCurrentHotel(hotelId);
        hotel.reviews = await getHotelReviews(hotelId);
        this.setState(hotel);
    }

    render() {
        console.log(this.state);
        return (
            <div className="container">
                <h1>{`Hotel "${this.state.name}", ${this.state.location}`}</h1>
                <div className="card-details">
                    <img className="hotel-img" src={this.state.image} alt={"Hotel " + this.state.name}/>
                    <div className="card-container">
                        <h4><b>{`Hotel "${this.state.name}", ${this.state.location}`}</b></h4>
                    </div>
                </div>
                <div className="info"><b>Description:</b> {this.state.description}</div>
                <div className="info"><b>Number of rooms:</b> {this.state.numberOfRooms}</div>
                {this.state.parkingSlots ? <div className="info"><b>Parking slots:</b> {this.state.parkingSlots}</div> :
                    <div></div>}
                <a className="button review" href={`/hotels/reviews/add/${this.state.id}`}>Add a review</a>
                {this.state.reviews ? <ReviewWrapper reviews={this.state.reviews}/> : <div></div>}
            </div>
        );
    }
}
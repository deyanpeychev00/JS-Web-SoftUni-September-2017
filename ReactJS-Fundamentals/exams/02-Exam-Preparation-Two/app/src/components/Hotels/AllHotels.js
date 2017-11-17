import React, {Component} from 'react';
import SingleHotel from "../partials/SingleHotel";

export default class AllHotels extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                {this.props.hotels.map(h => {
                    return <SingleHotel
                        key={h.id}
                        id={h.id}
                        name={h.name}
                        image={h.image}
                        location={h.location}
                    />
                })}
            </div>
        );
    }
}
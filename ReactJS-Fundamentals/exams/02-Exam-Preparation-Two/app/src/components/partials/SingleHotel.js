import React, {Component} from 'react';

export default class SingleHotel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {id, name, image, location} = this.props;
        return (
            <div className="card">
                <img className="hotel-img" src={image} alt={"Hotel " + {name}}/>
                <div className="card-container">
                    <h4><b>{`Hotel "${name}", ${location}`}</b></h4>
                    {
                        localStorage.getItem('authtoken') !== null ?
                            <a className="button" href={`/hotels/details/${id}`}>Details</a> :
                            <a className="button" href={`/login`}>Details</a>
                    }
                </div>
            </div>
        );
    }
}
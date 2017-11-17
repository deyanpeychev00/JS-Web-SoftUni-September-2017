import React, {Component} from 'react';

export default class Review extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-container">
                    <p><b>Rating: </b>{this.props.rating}/5</p>
                    <p><b>Comment: </b>{this.props.comment}</p>
                    <p><b>From: </b>{this.props.user}</p>
                </div>
            </div>
        );
    }
}
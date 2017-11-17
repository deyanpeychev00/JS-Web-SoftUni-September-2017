import React, {Component} from 'react';
import Review from './../partials/Review';

export default class ReviewWrapper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.reviews.map(r => {
                    return <Review
                        key={r.id}
                        rating={r.rating}
                        comment={r.comment}
                        user={r.user}
                    />
                })}
            </div>
        );
    }
}
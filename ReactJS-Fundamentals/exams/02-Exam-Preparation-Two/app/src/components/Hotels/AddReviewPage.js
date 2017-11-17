import React, {Component} from 'react';
import Input from './../common/Input';
import {addReview} from './../../api/remote';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

export default class SingleHotel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            comment: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const hotelId = this.props.match.params.id;
        if (this.state.parkingSlots === '') {
            delete this.state.parkingSlots;
        }
        const response = await addReview(this.state, hotelId);
        if (response.success) {
            toastr.success(response.message + '\n Redirecting to hotel details page...');
            setTimeout(() => {
                window.location.replace('/hotels/details/' + hotelId)
            }, 2000);
        } else {
            toastr.error(response.message);
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Add hotel</h1>
                <form className="center" onSubmit={this.onSubmitHandler}>
                    <Input
                        name="rating"
                        type="number"
                        value={this.state.rating}
                        onChange={this.onChangeHandler}
                        label="Rating ( 0-5 )"
                        placeholder="Rating"
                        max={5}
                        min={0}
                    />
                    <Input
                        name="comment"
                        value={this.state.comment}
                        onChange={this.onChangeHandler}
                        label="Comment"
                        placeholder="Comment"
                    />
                    <input type="submit" className="btn btn-primary" value="Add Review"/>
                </form>
            </div>
        );
    }
}
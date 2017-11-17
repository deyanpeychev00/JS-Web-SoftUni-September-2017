import React, { Component } from 'react';
import Input from './../common/Input';
import {addHotel} from './../../api/remote';
import toastr from 'toastr';
import '../../../node_modules/toastr/build/toastr.min.css';

export default class SingleHotel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            location: '',
            numberOfRooms: 0,
            description: '',
            image: '',
            parkingSlots: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        if(this.state.parkingSlots === ''){
            delete this.state.parkingSlots;
        }
        const response = await addHotel(this.state);
        if (response.success) {
            toastr.success(response.message + '\n Redirecting to home page...');
            setTimeout(() => {window.location.replace('/')}, 3000);
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
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeHandler}
                        label="Name"
                        placeholder="Name"
                    />
                    <Input
                        name="location"
                        value={this.state.location}
                        onChange={this.onChangeHandler}
                        label="Location"
                        placeholder="Location"
                    />
                    <Input
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeHandler}
                        label="Description"
                        placeholder="Description"
                    />
                    <Input
                        name="numberOfRooms"
                        type="number"
                        value={this.state.numberOfRooms}
                        onChange={this.onChangeHandler}
                        label="Number of rooms"
                        placeholder="Number of rooms"
                    />
                    <Input
                        name="image"
                        value={this.state.image}
                        onChange={this.onChangeHandler}
                        label="Image"
                        placeholder="Image"
                    />
                    <Input
                        name="parkingSlots"
                        type="number"
                        value={this.state.parkingSlots}
                        onChange={this.onChangeHandler}
                        label="Parking slots ( optional )"
                        placeholder="Parking slots"
                    />
                    <input type="submit" className="btn btn-primary" value="Add Hotel"/>
                </form>
            </div>
        );
    }
}
import React, {Component} from 'react';
import makeRequest from './../../../utils/requester';

export default class Submit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            author: localStorage.getItem('username'),
            url: '',
            title: '',
            imageUrl: '',
            description: '',
        };

        //bind functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        makeRequest('appdata', '/posts', 'POST', 'kinvey', this.state, 'submitPost')
    }

    render() {
        return ( <section id="viewSubmit">
                <div className="submitArea">
                    <h1>Submit Link</h1>
                    <p>Please, fill out the form. A thumbnail image is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form onSubmit={this.onSubmit} id="submitForm" className="submitForm">
                        <label>Link URL:</label>
                        <input onChange={this.onChange} name="url"  type="text"/>
                        <label>Link Title:</label>
                        <input onChange={this.onChange} name="title"  type="text"/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input onChange={this.onChange} name="imageUrl"  type="text"/>
                        <label>Comment (optional):</label>
                        <textarea onChange={this.onChange} name="description"></textarea>
                        <input id="btnSubmitPost" value="Submit" type="submit"/>
                    </form>
                </div>
            </section>
        )
    }
}
import React, {Component} from 'react';
import makeRequest from './../../../utils/requester';

export default class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        //bind functions
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        makeRequest('appdata', `/posts/${this.props.match.params.postId}`, 'GET', 'kinvey', 'noBody', 'getCurrentPost')
            .then((res) => {
                this.setState(res);
            });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        let body = {
          author: this.state.author,
          title: this.state.title,
          description: this.state.description,
          url: this.state.description,
          imageUrl: this.state.imageUrl
        };
        makeRequest('appdata', `/posts/${this.state._id}`, 'PUT', 'kinvey', body, 'updatePost');
    }

    render() {
        return (
            <section id="viewEdit">
                <div className="submitArea">
                    <h1>Edit Link</h1>
                    <p>Please, fill out the form. A thumbnail image/description is not required.</p>
                </div>
                <div className="submitArea formContainer">
                    <form id="editPostForm" className="submitForm" onSubmit={this.onSubmit}>
                        <label>Link URL:</label>
                        <input name="url" type="text"
                               value={this.state.url}
                               onChange={this.onChange}
                        />
                        <label>Link Title:</label>
                        <input name="title" type="text" value={this.state.title} onChange={this.onChange}/>
                        <label>Link Thumbnail Image (optional):</label>
                        <input name="imageUrl" type="text"
                               value={this.state.imageUrl}
                               onChange={this.onChange}
                        />
                        <label>Comment (optional):</label>
                        <textarea name="description" value={this.state.description} onChange={this.onChange}></textarea>
                        <input id="btnEditPost" type="submit" value="Edit Post"/>
                    </form>
                </div>
            </section>
        )
    }
}
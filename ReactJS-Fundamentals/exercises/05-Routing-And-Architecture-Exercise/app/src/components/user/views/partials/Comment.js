import React, {Component} from 'react';
import timeConverter from './../../../../utils/timeConverter';
import makeRequest from './../../../../utils/requester';

export default class Comment extends Component {
    constructor(props) {
        super(props);

        //bind events
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const commentId = this.props.props._id;
        const postId = this.props.props.postId;
        makeRequest('appdata', `/comments/${commentId}`, 'DELETE', 'kinvey', 'noBody', 'deleteComment', postId);
    }

    render() {
        return (
            <article className="post post-content">
                <p>{this.props.props.content}</p>
                <div className="info">
                    submitted {timeConverter(this.props.props._kmd.lmt)} ago by {this.props.props.author}
                    {this.props.props.author === localStorage.getItem('username')
                        ?
                        <form onSubmit={this.onSubmit}>
                            <input type="submit" className="auth-button-small" value="delete"/>
                        </form>
                        :
                        <span></span>
                    }
                </div>
            </article>
        );
    }
};

import React, {Component} from 'react';
import timeConverter from './../../../../utils/timeConverter';
import makeRequest from './../../../../utils/requester';
import {Link} from 'react-router-dom';

export default class Post extends Component {
    constructor(props) {
        super(props);

        //bind events
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost(e) {
        e.preventDefault();
        makeRequest('appdata', `/posts/${this.props.props._id}`, 'DELETE', 'kinvey', 'noBody', 'deletePost')
    }

    render() {
        return (
            <article className="post">
                <div className="col rank">
                    <span>{this.props.props.positionIndex}</span>
                </div>
                <div className="col thumbnail">
                    <a href={this.props.props.url}>
                        <img
                            src={this.props.props.imageUrl}
                            alt="post thumbnail"
                        />
                    </a>
                </div>
                <div className="post-content">
                    <div className="title">
                        <a href={this.props.props.url}>
                            {this.props.props.title}
                        </a>
                    </div>
                    <div className="details">
                        <div className="info">
                            submitted {timeConverter(this.props.props._kmd.lmt)} ago by {this.props.props.author}
                        </div>
                        <div className="controls">
                            {
                                this.props.props.author === localStorage.getItem('username')
                                    ?
                                    <ul>
                                        <li className="action"><Link className="commentsLink auth-button-small"
                                                                     to={`/comments/${this.props.props._id}`}>comments</Link>
                                        </li>
                                        <li className="action"><Link className="editLink auth-button-small"
                                                                     to={`/edit/${this.props.props._id}`}>edit</Link>
                                        </li>
                                        <li className="action">
                                            <form onSubmit={this.deletePost}>
                                                <input className="auth-button-small" type="submit" value="delete"/>
                                            </form>
                                        </li>
                                    </ul>
                                    :
                                    <ul>
                                        <li className="action"><Link className="commentsLink auth-button-small"
                                                                     to={`/comments/${this.props.props._id}`}>comments</Link>
                                        </li>
                                    </ul>
                            }
                        </div>

                    </div>
                </div>
            </article>
        );
    }
};


import React, {Component} from 'react';
import makeRequest from './../../../utils/requester';
import timeConverter from './../../../utils/timeConverter';
import {Link} from 'react-router-dom';
import Comment from './partials/Comment';

export default class PostDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _kmd: {lmt: 0},
            comments: [],
            commentToPost: {
                content: '',
                author: localStorage.getItem('username'),
            }
        };

        //bind events
        this.deletePost = this.deletePost.bind(this);
        this.onChange = this.onChange.bind(this);
        this.postComment = this.postComment.bind(this);
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;

        makeRequest('appdata', `/posts/${postId}`, 'GET', 'kinvey', 'noBody', 'getCurrentPost')
            .then((res) => {
                this.setState(res);
                makeRequest('appdata', `/comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`, 'GET', 'kinvey', 'noBody', 'getPostComments')
                    .then((comments) => {
                        this.setState({comments: comments});
                    })
            });
    }

    deletePost(e) {
        const postId = this.props.match.params.postId;
        e.preventDefault();
        makeRequest('appdata', `/posts/${postId}`, 'DELETE', 'kinvey', 'noBody', 'deletePost')
    }

    onChange(e) {
        this.setState({commentToPost: {[e.target.name]: e.target.value}});
    }

    postComment(e) {
        e.preventDefault();
        this.state.commentToPost.author = localStorage.getItem('username');
        this.state.commentToPost.postId = this.state._id;
        makeRequest('appdata', '/comments', 'POST', 'kinvey', this.state.commentToPost, 'postComment', this.state._id);
    }

    render() {
        return (
            <section id="viewComments">
                <div className="post">
                    <div className="col thumbnail">
                        <a href={this.state.url}>
                            <img src={this.state.imageUrl}/>
                        </a>
                    </div>
                    <div className="post-content">
                        <div className="title">
                            <a href={this.state.url}>
                                {this.state.title}
                            </a>
                        </div>
                        <div className="details">
                            <p>{this.state.description}</p>
                            <div className="info">
                                submitted {timeConverter(this.state._kmd.lmt)} ago by {this.state.author}
                            </div>
                            <div className="controls">
                                {this.state.author === localStorage.getItem('username')
                                    ?
                                    <ul>
                                        <li className="action"><Link className="editLink auth-button-small"
                                                                     to={`/edit/${this.state._id}`}>edit</Link></li>
                                        <li className="action">
                                            <form onSubmit={this.deletePost}>
                                                <input className="auth-button-small" type="submit" value="delete"/>
                                            </form>
                                        </li>
                                    </ul>
                                    :
                                    <ul></ul>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="post post-content">
                    <form id="commentForm" onSubmit={this.postComment}>
                        <label>Comment</label>
                        <textarea name="content" type="text" onChange={this.onChange}></textarea>
                        <input type="submit" value="Add Comment" id="btnPostComment"/>
                    </form>
                </div>
                {
                    this.state.comments.map((comment) => {
                        return <Comment key={comment._id} props={comment}/>
                    })}
            </section>
        )
    }
}
import React, {Component} from 'react';
import makeRequest from './../../../utils/requester';
import Post from './partials/Post';
let postIndex = 1;

export default class MyPosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        makeRequest('appdata', `/posts?query={"author":"${localStorage.getItem('username')}"}&sort={"_kmd.lmt": -1}`, 'GET', 'kinvey', 'noBody', 'listPosts')
            .then((posts) => {
                this.setState({posts: posts});
            });
    }

    render() {
        return (
            <section id="viewMyPosts">
                <div className="post post-content">
                    <h1>Your Posts</h1>
                </div>
                <div className="posts">
                    {this.state.posts.map(post => {
                        post.positionIndex = postIndex++;
                        return <Post key={post._id} props={post}/>
                    })}
                </div>
            </section>
        )
    }
};
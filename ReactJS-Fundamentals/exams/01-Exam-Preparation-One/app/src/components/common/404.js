import React, {Component} from 'react';
import './../../style/404.css';
import image from './../../style/images/error-img.png'

export default class NotFound extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <main>
                <div className="wrap">
                    <div className="content">
                        <img src={image} title="404: Page not Found" alt="404: Page not Found"/>
                        <p><span><label>O</label>hh.....</span>You Requested the page that is no longer There.</p>
                        <a href="/">Back To Home</a>
                    </div>
                </div>
                <br/>
                <br/>
            </main>
        )
    }
}
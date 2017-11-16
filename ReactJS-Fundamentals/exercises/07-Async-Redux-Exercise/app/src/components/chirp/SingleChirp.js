import React from 'react';
import timeConverter from './../../utils/timeConverter';

let SingleChirp = (props) => {
    return (
        <article className="chirp">
            <div className="titlebar">
                <a href="#" className="chirp-author">{props.props.author}</a>
                <span className="chirp-time">{timeConverter(props.props._kmd.lmt)}</span>
            </div>
            <p>{props.props.text}</p>
        </article>
    )
};

export default SingleChirp;
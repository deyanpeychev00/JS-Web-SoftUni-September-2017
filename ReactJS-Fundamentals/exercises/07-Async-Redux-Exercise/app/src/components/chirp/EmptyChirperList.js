import React from 'react';

let EmptyChirperList = (props) => {
    return (
        <article className="chirp">
            <div className="titlebar">
                <a href="#" className="chirp-author">No chirps in database.</a>
            </div>
        </article>
    )
};

export default EmptyChirperList;
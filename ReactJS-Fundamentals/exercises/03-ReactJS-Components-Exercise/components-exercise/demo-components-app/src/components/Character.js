/**
 * Created by Deyan Peychev on 01-Nov-17.
 */
import React, {Component} from 'react';

let SingleChar = (props) => {
    return (
    <img className="roster_charImg" src={props.url} alt="currentChar"/>
    );
};

export default SingleChar;
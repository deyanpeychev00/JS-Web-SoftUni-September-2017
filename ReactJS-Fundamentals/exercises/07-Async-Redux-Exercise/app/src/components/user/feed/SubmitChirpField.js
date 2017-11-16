import React, {Component} from 'react';

class SubmitChirpField extends Component{
    constructor(props){
        super(props);
    }

    render(){

        return (
            <div className="chirper">
                <h2 className="titlebar">{this.props.user.username}</h2>

                <form id="formSubmitChirp" className="chirp-form">
                    <textarea name="text" className="chirp-input" defaultValue={""}></textarea>
                    <input className="chirp-submit" id="btnSubmitChirp" value="Chirp" type="submit"/>
                </form>

                <div id="userStats" className="user-details">
                    <span>0 chirps</span> | <span>1 following</span> | <span>0 followers</span>
                </div>
            </div>
        )
    }
}

export default SubmitChirpField;
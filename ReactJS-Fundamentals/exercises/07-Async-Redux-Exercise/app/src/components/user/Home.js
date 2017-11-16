import React, {Component} from 'react';
import Chirps from './../chirp/ChirpWrapper';
import SubmitChirpField from './feed/SubmitChirpField';
import {connect} from 'react-redux';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <section id="viewFeed">
                <div className="content">
                    <SubmitChirpField user={this.props.store.user}/>
                    <Chirps chirps={this.props.store.chirps} user={this.props.store.user}/>
                </div>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        store: state
    };
}


export default connect(mapStateToProps, null)(Home);
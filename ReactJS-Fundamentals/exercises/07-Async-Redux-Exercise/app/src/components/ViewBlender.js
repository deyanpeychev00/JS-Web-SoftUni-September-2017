import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './user/Auth';
import Home from './user/Home'
import {connect} from 'react-redux';

let ViewBlender = (props) => {

    if (JSON.stringify({}) !== JSON.stringify(props.store.user) ) {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route exact path='/' component={Auth}/>
        </Switch>
    )
};

function mapStateToProps(state) {
    return {
        store: state
    };
}

export default connect(mapStateToProps, null)(ViewBlender);
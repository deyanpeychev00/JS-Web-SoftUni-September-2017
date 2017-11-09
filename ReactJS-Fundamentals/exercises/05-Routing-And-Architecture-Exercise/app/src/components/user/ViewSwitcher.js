import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Catalog from './views/Catalog';
import MyPosts from './views/MyPosts';
import Submit from './views/Submit';
import EditPost from './views/EditPost';
import PostDetails from './views/PostDetails';
import DeletePost from './views/DeletePost';

let NavigationView = (props) => {
    return (
        <Switch>
            <Route exact path='/' component={Catalog}/>
            <Route exact path='/catalog' component={Catalog}/>
            <Route exact path='/submit' component={Submit}/>
            <Route exact path='/myPosts' component={MyPosts}/>
            <Route  path='/comments/:postId' component={PostDetails}/>
            <Route  path='/edit/:postId' component={EditPost}/>
            <Route  path='/delete/:postId' component={DeletePost}/>
            <Route  path='/deleteComment/:commentId' component={DeletePost}/>
        </Switch>
    )
};

export default NavigationView;

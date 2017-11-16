import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Footer from './components/common/Footer';
import LoginPage from './components/user/auth/LoginPage';
import RegisterPage from './components/user/auth/RegisterPage';
import Navigation from './components/common/Navigation';
import HomePage from "./components/user/views/Home";
import ProfileView from "./components/user/profile/ProfileView";
import CreateFurniture from "./components/furniture/create/CreateFurniture";
import FurnitureDetails from "./components/furniture/details/FurnitureDetails";
import NotFound from "./components/common/404";

import { furniture } from './storage/furniture.json'


class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <Switch>
                    <Route exact path="/" render={ () => <HomePage furniture={furniture}/>}/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/register" component={RegisterPage}/>
                    <Route path="/profile" render={ () => <ProfileView furniture={furniture}/>}/>
                    <Route path="/create" component={CreateFurniture}/>
                    <Route path="/details/:id" component={FurnitureDetails}/>
                    <Route component={NotFound}/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;

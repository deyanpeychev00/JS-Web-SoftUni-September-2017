import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import AddHotelPage from './components/Hotels/AddHotelPage';
import HotelDetails from './components/Hotels/HotelDetails';
import AddReview from './components/Hotels/AddReviewPage';

class App extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="App">
                <Header loggedIn={localStorage.getItem('authtoken') != null} onLogout={this.onLogout} />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/hotels/add" component={AddHotelPage} />
                    <Route path="/hotels/reviews/add/:id" component={AddReview} />
                    <Route path="/hotels/details/:id" component={HotelDetails} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
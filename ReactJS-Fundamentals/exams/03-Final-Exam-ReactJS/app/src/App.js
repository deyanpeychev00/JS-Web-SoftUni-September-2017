import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './components/common/Header';
import RegisterPage from './components/Auth/RegisterPage';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/HomePage/HomePage';
import Footer from "./components/common/Footer";
import YearlyBallance from "./components/UserSession/YearlyBallance";
import MonthlyBalance from "./components/UserSession/MonthlyBalance";
import AddExpenses from "./components/UserSession/AddExpenses";

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
                    <Route path="/balance/yearly" component={YearlyBallance} />
                    <Route path="/balance/monthly/:monthId" component={MonthlyBalance} />
                    <Route path="/plan/:year/:month/expense" component={AddExpenses} />
                </Switch>
                <Footer loggedIn={localStorage.getItem('authtoken') != null}/>
            </div>
        );
    }
}

export default withRouter(App);
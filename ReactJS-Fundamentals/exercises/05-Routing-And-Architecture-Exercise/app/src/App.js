import React, {Component} from 'react';
import './style/App.css';
import auth from './utils/auth';

//import DOM elements
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Navigation from './components/user/LoggedWrapper';
import WelcomePage from './components/user/WelcomePage';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            authtoken: '',
            username: ''
        }
    }

    componentDidMount(){
        this.setState({authtoken: localStorage.getItem('authtoken')});
    }
    render() {
        if(auth(this.state.authtoken)){
            return (
                <div id="container">
                    <Header/>
                    <div className="content">
                        <Navigation/>
                    </div>
                    <Footer/>
                </div>
            );
        }else{
            return (
                <div id="container">
                    <Header/>
                    <div className="content">
                        <WelcomePage/>
                    </div>
                    <Footer/>
                </div>
            );
        }
    }
}

export default App;

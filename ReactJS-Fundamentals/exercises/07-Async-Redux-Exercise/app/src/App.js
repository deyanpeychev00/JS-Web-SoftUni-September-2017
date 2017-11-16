import React, {Component} from 'react';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navbar from './components/common/Navbar';
import ViewBlender from './components/ViewBlender';


class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Navbar/>
                <ViewBlender/>
                <Footer/>
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import Slider from './components/Slider';
import Roster from './components/Roster';
import Bio from './components/Bio';
import observerMenu from './utils/observer';


class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>Rick and Morty paradise</h1>
                    <a className="dp_link" href="https://www.behance.net/deyanppeyc3645" target="_blank">Deyan
                        Peychev</a>
                </div>
                <Slider/>
                <div className="App-subheader">
                    <h1>Our characters:</h1>
                </div>
                <div className="info">Click on a character to display its bio.</div>
                <div>
                    <Roster/>
                </div>
                <footer>
                    <div>
                        <p>ReactJS Components Exercise - 2017</p>
                        <a href="https://www.behance.net/deyanppeyc3645" target="_blank">Deyan Peychev</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;

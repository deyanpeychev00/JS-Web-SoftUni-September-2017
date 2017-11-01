/**
 * Created by Deyan Peychev on 01-Nov-17.
 */
import React, {Component} from 'react';
import Char from './Character';
import observerMenu from './../utils/observer';
import Bio from './Bio'

class Roster extends Component {
    constructor() {
        super();
        this.state = {
            characters: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:9999/roster').then((res) => {
            return res.json();
        }).then((charactersJSON) => {
            this.setState({
                characters: charactersJSON
            });
        });
    }

    render() {
        return (
        <div>
            {this.state.characters.map((ch, index) => {
                return  <span onClick={() => {observerMenu.executeObserver('changeFocus', {id: ch.id})}} key={index} alt="currentCharacter">
                            {Char({ url: ch.url })}
                        </span>
            })}
            <Bio />
        </div>
        );
    }
}

export default Roster;
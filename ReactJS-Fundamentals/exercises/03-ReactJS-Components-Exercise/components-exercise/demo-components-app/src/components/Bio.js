/**
 * Created by Deyan Peychev on 01-Nov-17.
 */
import React, {Component} from 'react';
import Character from './Character';
import observerMenu from './../utils/observer';

class Bio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            char: {}
        }
    }

    componentDidMount() {
        observerMenu.addObserver('changeFocus', this.viewBiography);
    }

    viewBiography = ({id}) => {
        this.setState({id: id});
        this.getChar({id});
    };

    getChar = ({id}) => {
        fetch("http://localhost:9999/character/" + id)
            .then(response => {
                response.json()
                    .then(responseJson => {
                        this.setState({
                            char: responseJson
                        });
                    })
            })
    };

    render() {
        let html;
        if (Object.keys(this.state.char).length !== 0) {
            html = (
                <fieldset>
                    <div>
                          <span className="bio_name">
                              <b> {this.state.char.name} </b>
                        </span>
                        <span className="bio_image">
                        {Character({url: this.state.char.url})}
                    </span>
                        <div className="bio_info">
                            <div className="bio_desc">
                                {this.state.char.bio}
                            </div>
                        </div>
                    </div>
                </fieldset>
            )
        }
        return (
            <div>
                {html}
            </div>
        )
    }
}

export default Bio;
import React, {Component} from 'react';
import leftArrow from '../resources/left.png';
import rightArrow from '../resources/right.png';


class Slider extends Component {
    constructor() {
        super();
        this.state = {
            focusedEpId: 0,
            imgURL: ''
        };

        this.getNewEp = (epID) => {
            fetch('http://localhost:9999/episodePreview/' + epID).then((data) => {
                return data.json();
            }).then((dataJSON) => {

                fetch('http://localhost:9999/sliderDB').then((episodes) => {
                    return episodes.json();
                }).then((epJSON) => {
                    if (epID >= epJSON.length) {
                        epID = Number(epJSON.length) - 1;
                    }
                    if (epID <= 0) {
                        epID = 0;
                    }
                    this.setState({
                        imgURL: dataJSON.url,
                        focusedEpId: epID
                    });
                });
            });
        }
    }

    componentDidMount() {
        fetch('http://localhost:9999/episodePreview/' + this.state.focusedEpId).then((data) => {
            return data.json();
        }).then((dataJSON) => {
            this.setState({
                imgURL: dataJSON.url
            });
        });
    };

    render() {
        return (<div className="warper">
            <img onClick={() => {
                this.getNewEp(Number(this.state.focusedEpId) - 1)
            }} className="slider-button case-left" src={leftArrow} alt="Previous Element"/>
            <img className="sliderImg" src={this.state.imgURL} alt="Current Element"/>
            <img onClick={() => {
                this.getNewEp(Number(this.state.focusedEpId) + 1)
            }} className="slider-button case-right" src={rightArrow} alt="Next Element"/>
        </div>);
    }
}

export default Slider;
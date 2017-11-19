import React, { Component } from 'react';

export default class Footer extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <div className="footer">
                ReactJS exam, November 2017 |
                <strong><a className="softUni" href="https://softuni.bg/" target="_blank"> Software University</a></strong> |
                Designed by:
                <strong><a className="copyrightLink" href="https://www.behance.net/deyanppeyc3645" target="_blank"> Deyan Peychev</a></strong>
                <strong><a className="copyrightLink right" href="https://www.behance.net/deyanppeyc3645" target="_blank"> DP</a></strong>
            </div>
        );
    }
}
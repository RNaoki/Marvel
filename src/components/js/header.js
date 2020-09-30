import React, { Component } from 'react'
import '../css/header.css'

class Header extends Component {

    state = {
        top: true,
    };

    componentDidMount() {
        document.addEventListener('scroll', () => {
            var scrolled = document.scrollingElement.scrollTop
            if (scrolled <= 30) {
                if (this.state.top === false) {
                    this.setState({ top: true })
                }
            } else {
                if (scrolled > 30) {
                    this.setState({ top: false })
                }
            }
        });
    }

    render() {

        return (
            <div className={this.state.top ? "app-header" : "app-header active"}>
                <div className="header-content">
                    <div className="logo">
                    </div>
                    <ul className="header-items">
                        <li className="links">
                            <a href="/home" className={this.state.top ? "link" : "link active"}>HOME</a>
                        </li>
                        <li className="links">
                            <a href="/comics" className={this.state.top ? "link" : "link active"}>COMICS</a>
                        </li>
                        <li className="links">
                            <a href="/characters" className={this.state.top ? "link" : "link active"}>CHARACTERS</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header;
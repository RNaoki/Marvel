import React, { Component } from 'react'
import '../css/home.css'
import Marvel from '../../images/Marvel_logo_PNG1.png'

class Home extends Component {

    render() {

        return (
            <div className="comicBg">
                <div className="text">
                    <img className="logo" src={Marvel} alt=""></img>
                </div>
                <div className="credit">
                    By Ricardo Naoki Tanji
                </div>
            </div>
        )
    }
}

export default Home;
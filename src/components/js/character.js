import React, { Component } from 'react';
import '../css/character.css'

class Character extends Component {

    constructor(props) {
        super(props)
        this.state = {
            details: false,
        }
    }

    render() {
        return (
            <div>
                <div className="character" onClick={() => this.details(this.props.id)}>
                    <img src={this.props.banner.path + "." + this.props.banner.extension} alt="">
                    </img>
                    <span className="title">
                        {this.props.title}
                    </span>
                </div>
            </div>
        )
    }
}

export default Character;
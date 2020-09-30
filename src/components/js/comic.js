import React, { Component } from 'react';
import '../css/comic.css'

class Comics extends Component {

    constructor(props) {
        super(props)
        this.state = {
            details: false,
        }
    }

    details(id) {
        // Indica que o modal deve ser aberto
        this.setState(({
            details: true
        }));
    }

    close() {
        // Indica que o modal deve ser fechado
        this.setState(({
            details: false
        }));
    }

    render() {
        return (
            <div>
                <div className="card" onClick={() => this.details(this.props.id)}>
                    <img src={this.props.banner.path + "." + this.props.banner.extension} alt="">
                    </img>
                    <span className="title">
                        {this.props.title}
                    </span>
                </div>
                <div>
                    <div className={"modal " + this.state.details}>
                        <div className="modal-content">
                            <img src={this.props.banner.path + "." + this.props.banner.extension} alt=""></img>
                            <div className="details">
                                <p className="name">{this.props.title}</p>
                                <p className="category">Criadores:</p>
                                <ul>
                                    {this.props.creators.items.map((item, index) => (
                                        <li className="author" key={index}>
                                            <p>
                                                {item.name}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <p className="category">Personagens:</p>
                                <ul>
                                    {this.props.characters.items.map((item, index) => (
                                        <li className="author" key={index + 40}>
                                            <p>
                                                {item.name}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <span className="close" onClick={() => this.close()}>&times;</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comics;
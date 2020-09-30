import React, { Component } from 'react';
import CryptoJS from 'crypto-js'
import auth from '../../auth/my.json'
import '../css/comics.css'
import Comic from '../../components/js/comic.js'

class Comics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            displaying: [],
            set: 5,
            page: 1,
            previous: true,
            next: false,
            authors: [],
            total: 0
        }
    }

    componentDidMount() {
        // Carrega os 5 primeiros quadrinhos para popular a primeira pagina
        const now = Date.now()
        var auth_key = this.getHash(now, auth);
        var url = "http://gateway.marvel.com/v1/public/comics?limit=5&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: [result.data.results],
                        displaying: result.data.results
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    getHash(now, auth_values) {
        // Gera o hash com MD5
        const authentication_key = now + auth_values.auth_keys.private_key + auth_values.auth_keys.public_key
        return (CryptoJS.MD5(authentication_key).toString());
    }

    changePage() {
        // Avança para a proxima pagina
        var current_page = this.state.page + 1
        this.setState(({
            page: current_page,
            displaying: []
        }));

    }

    backPage() {
        // Volta uma pagina
        var current_page = this.state.page - 1
        this.setState(({
            page: current_page,
            displaying: []
        }));

    }

    async load() {
        // Carrega a proxima pagina
        await this.changePage();
        // Verifica se a proxima pagina ja foi carregada antes
        if (this.state.page > this.state.items.length) {
            const now = Date.now()
            var auth_key = this.getHash(now, auth);
            var url = "http://gateway.marvel.com/v1/public/comics?limit=" + this.state.set + "&offset=" + this.state.set * (this.state.page - 1) + "&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState(prevState => ({
                            isLoaded: true,
                            items: [...prevState.items, result.data.results],
                            displaying: result.data.results,
                            previous: false,
                            total: result.data.total
                        }));
                        if (this.state.page * 5 === result.data.results.total || result.data.results.length < 5) {
                            this.setState({
                                next: true
                            });
                        }
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        } else {
            // Retorna os dados que ja foram carregados
            var display = this.state.items[this.state.page - 1]
            this.setState({
                displaying: display,
                previous: false
            });
        }

    }

    async back() {
        // Popula a pagina anterior
        await this.backPage();
        var display = this.state.items[this.state.page - 1]
        this.setState({
            displaying: display
        });
        // Verifica se eh a primeira pagina
        if (this.state.page > 1) {
            this.setState({
                next: false,
                previous: false
            });
        } else {
            this.setState({
                next: false,
                previous: true
            });
        }
    }

    render() {
        return (
            <div>
                <div className="display">
                    <ul className="items comic-list">
                        {this.state.displaying.map((item, index) => (
                            <li key={index}>
                                <Comic characters={item.characters} creators={item.creators} banner={item.thumbnail} title={item.title} id={item.id}></Comic>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="button-container">
                    <div className={"button-box " + !this.state.previous} onClick={() => this.back()}>
                        <div className="previous" disabled={this.state.previous}>
                            <span className={"bg " + !this.state.previous}></span>
                            <span className="arrow">&#60;</span>
                        </div>
                    </div>
                    <div className={"button-box " + !this.state.next} onClick={() => this.load()}>
                        <div className="next" disabled={this.state.next}>
                            <span className={"bg " + !this.state.next}></span>
                            <span className="arrow">&#62;</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Comics;
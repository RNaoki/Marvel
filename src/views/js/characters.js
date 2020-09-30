import React, { Component } from 'react';
import CryptoJS from 'crypto-js'
import auth from '../../auth/my.json'
import Character from '../../components/js/character'
import '../css/characters.css'

class Characters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            characters: [],
            showing: [],
            limit: 20,
            page: 1,
            search: false,
            searchName: "",
            previous: true,
            next: false
        }
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount() {
        // Retorna os 20 primeiros personagens, para popular a 1a pagina
        const now = Date.now()
        var auth_key = this.getHash(now, auth);
        var url = "http://gateway.marvel.com/v1/public/characters?limit=" + this.state.limit + "&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        characters: [result.data.results],
                        showing: result.data.results
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
        // Gera a hash com MD5
        const key = now + auth_values.auth_keys.private_key + auth_values.auth_keys.public_key
        return (CryptoJS.MD5(key).toString());
    }

    changePage() {
        // Avanca para a proxima pagina
        var current_page = this.state.page + 1
        this.setState(({
            page: current_page,
            showing: []
        }));

    }

    backPage() {
        // Volta uma pagina
        var current_page = this.state.page - 1
        this.setState(({
            page: current_page,
            showing: []
        }));

    }

    async load() {
        // Carrega os personagens da proxima pagina
        await this.changePage();
        const now = Date.now()
        var auth_key = this.getHash(now, auth);
        // Verifica se eh uma pesquisa
        if (this.state.search === true) {
            // Verifica se essa pagina ja foi carregada
            if (this.state.page > this.state.characters.length) {
                var url = "http://gateway.marvel.com/v1/public/characters?nameStartsWith=" + this.state.searchName + "&limit=" + this.state.limit + "&offset=" + this.state.limit * (this.state.page - 1) + "&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
                fetch(url)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            this.setState(prevState => ({
                                isLoaded: true,
                                characters: [...prevState.characters, result.data.results],
                                showing: result.data.results,
                                previous: false
                            }));
                            // Verifica se tem 20 personagens, ne não tiver desabilita o botão de avancar
                            if (result.data.results.length < 20) {
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
                // Carrega os valores da pagina ja carregada
                var display = this.state.characters[this.state.page - 1]
                this.setState({
                    showing: display,
                    previous: false
                });
            }
        }
        else {
            // Verifica se essa pagina ja foi carregada
            if (this.state.page > this.state.characters.length) {
                url = "http://gateway.marvel.com/v1/public/characters?limit=" + this.state.limit + "&offset=" + this.state.limit * (this.state.page - 1) + "&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
                fetch(url)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log(result.data.results.length)
                            this.setState(prevState => ({
                                isLoaded: true,
                                characters: [...prevState.characters, result.data.results],
                                showing: result.data.results,
                                previous: false
                            }));
                            if (this.state.page * 20 === result.data.results.total || result.data.results.length < 20) {
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
                // Carrega os valores da pagina ja carregada
                display = this.state.characters[this.state.page - 1]
                this.setState({
                    showing: display,
                    previous: false
                });
            }
        }
    }

    async back() {
        // Carrega os valores da pagina anterior
        await this.backPage();
        console.log(this.state)
        var display = this.state.characters[this.state.page - 1]
        this.setState({
            showing: display
        });
        // Verifica se a pagina eh a primeira
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

    search() {
        // Pesquisa por substring de um personagem
        const now = Date.now()
        var auth_key = this.getHash(now, auth);
        var url = "http://gateway.marvel.com/v1/public/characters?nameStartsWith=" + this.state.searchName + "&limit=" + this.state.limit + "&offset=" + this.state.limit * (this.state.page - 1) + "&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(prevState => ({
                        isLoaded: true,
                        characters: [result.data.results],
                        showing: result.data.results,
                        previous: true,
                        search: true
                    }));
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    inputChange(event) {
        this.setState({ searchName: event.target.value });
    }

    cancel() {
        // Cancela a pesquisa e retorna ao comportamento padrao
        const now = Date.now()
        var auth_key = this.getHash(now, auth);
        var url = "http://gateway.marvel.com/v1/public/characters?limit=" + this.state.limit + "&ts=" + now + "&apikey=" + auth.auth_keys.public_key + "&hash=" + auth_key
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        characters: [result.data.results],
                        showing: result.data.results,
                        search: false
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

    render() {
        var i = 0;

        return (
            <div>
                <div className="search-container">
                    <input className="search" onChange={this.inputChange}></input>
                    <div className={"search-button-box"} onClick={() => this.search()}>
                        <div>
                            <span className={"search-bg"}></span>
                            <span className="arrow">SEARCH</span>
                        </div>
                    </div>
                    <div className={"search-button-box " + this.state.search} onClick={() => this.cancel()}>
                        <div>
                            <span className={"search-bg"}></span>
                            <span className="arrow">CANCEL</span>
                        </div>
                    </div>
                </div>
                <div className="display">
                    <div>
                        <ul className="characters">
                            {this.state.showing.slice(0, 5).map(item => (
                                <li key={i++}>
                                    <Character banner={item.thumbnail} title={item.name} id={item.id}></Character>
                                </li>
                            ))}
                        </ul>
                        <ul className="characters">
                            {this.state.showing.slice(5, 10).map(item => (
                                <li key={i++}>
                                    <Character banner={item.thumbnail} title={item.name} id={item.id}></Character>
                                </li>
                            ))}
                        </ul>
                        <ul className="characters">
                            {this.state.showing.slice(10, 15).map(item => (
                                <li key={i++}>
                                    <Character banner={item.thumbnail} title={item.name} id={item.id}></Character>
                                </li>
                            ))}
                        </ul>
                        <ul className="characters">
                            {this.state.showing.slice(14, 19).map(item => (
                                <li key={i++}>
                                    <Character banner={item.thumbnail} title={item.name} id={item.id}></Character>
                                </li>
                            ))}
                        </ul>
                    </div>
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

export default Characters;
import React, { Component } from 'react';
import { Route } from 'react-router'
import routesConfig from './routesConfig';
import Header from './components/js/header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }

  render() {
    return (
      <div className="App">
        <div className="nav">
          <Header></Header>
        </div>
        <div className="content">
          {routesConfig.map((value, key) => {
            return <Route
              key={key}
              path={value.path}
              render={(props) => (
                <value.component {...props} language={this.state.language} />
              )}
              exact={value.exact}
            ></Route>
          })}
        </div>
        <a className="reference" href='https://br.freepik.com/vetores/fundo'>Fundo vetor criado por vector_corp - br.freepik.com</a>
      </div>
    );
  }
}

export default App;

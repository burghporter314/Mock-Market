import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './routes/Login';
import NavbarHeader from './components/NavbarHeader';

class App extends Component {
  render() {
    var logo = require('./assets/market.png')

    return (
      <Router>
        <Switch>
          <Route path="/">
            <NavbarHeader />
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

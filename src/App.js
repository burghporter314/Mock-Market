import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './routes/Login';
import MainPage from './routes/Main';
import NavbarHeader from './components/NavbarHeader';
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const {isLoading} = useAuth0();
  if (isLoading) {
    return <p>Loading...</p>
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <NavbarHeader />
          <LoginPage />
        </Route>
        <Route exact path="/main">
          <NavbarHeader />
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

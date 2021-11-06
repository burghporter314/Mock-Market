import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './routes/Login';
import MainPage from './routes/Main';
import SearchPage from './routes/Search';
import NavbarHeader from './components/NavbarHeader';
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const {isLoading, user} = useAuth0();
  const domain = process.env.REACT_APP_SERVER_DOMAIN;
  
  if (isLoading) {
    return <p>Loading...</p>
  }


  return (
    <Router>
      <Switch>
        <Route exact path="/" render={
          (props) => {
            return(
              <React.Fragment>
                <NavbarHeader />
                <LoginPage {...props} />
              </React.Fragment>
            );
          }
        }/>
        <Route exact path="/main" render={
          (props) => {
            return(
              <React.Fragment>
                <NavbarHeader />
                <MainPage {...props} />
              </React.Fragment>
            );
          }
        }/>
        <Route exact path="/search" render={
          (props) => {
            return(
              <React.Fragment>
                <NavbarHeader />
                <SearchPage {...props} />
              </React.Fragment>
            );
          }
        }/>
      </Switch>
    </Router>
  );
}

export default App;

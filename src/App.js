import React, { Component } from 'react';
import './App.css';
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Button } from 'react-bootstrap'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        {/* <Container>
          <Form>
            <Form.Group controlId="form.Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
            <Form.Group controlId="form.Email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="form.Textarea">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Container> */}
        <LoginButton />
        <LogoutButton />
        <Profile />
      </React.Fragment>
    );
  }
}

export default App;

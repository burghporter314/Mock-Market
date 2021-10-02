import React from 'react';
import logo from '../assets/market.png'
import { Button, Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const NavbarHeader = () => {
    const { logout, user } = useAuth0();

    let rightNavbar;
    return(
    <Navbar bg="light" expand="lg">
    <Container>
        <Nav>
            <a href="/main">
                <img className="col-lg-6 img-fluid w-100 login-image center-block" src={logo} style={{"maxWidth": "40px"}}></img>
            </a>
        </Nav>
        <Navbar.Brand href="#home">Mock Market</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/main">Dashboard</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
            </Nav>
            {user &&
                <React.Fragment>
                    <Navbar.Text style={{margin: "0 10px"}}>
                        Welcome, <a>{user.name}!</a>
                    </Navbar.Text>
                    <Nav>
                        <Button variant="danger" onClick={() => logout()}>Logout</Button>
                    </Nav>
                </React.Fragment>
            }
        </Navbar.Collapse>
    </Container>
    </Navbar>
    );
}

export default NavbarHeader;
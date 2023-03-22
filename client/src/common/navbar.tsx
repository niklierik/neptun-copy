"use client";

import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MyNavbar() {
    return <>
        <div className="navigation">
            <Navbar className="zero_padding" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="nav_link" href="#home">Főoldal</Nav.Link>
                            <Nav.Link className="nav_link" href="#link">Tanulmányok</Nav.Link>
                            <Nav.Link className="nav_link" href="#a1">Tárgyfelvétel</Nav.Link>
                            <Nav.Link className="nav_link" href="#a2">Vizsgák</Nav.Link>
                            <Nav.Link className="nav_link" href="#a3">Órarend</Nav.Link>
                            <Nav.Link className="nav_link" href="#a4">Üzenetek</Nav.Link>
                            <Nav.Link className="nav_link" href="#a5">Fórum</Nav.Link>
                            <Nav.Link className="nav_link" href="#a6">Hirdetmények</Nav.Link>
                            <NavDropdown className="nav_link" title="Admin" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    </>;
}
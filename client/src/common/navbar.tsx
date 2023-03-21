"use client";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MyNavbar() {
    return <>
        <div className="navigation">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className="nav_link" href="#home">Főoldal</Nav.Link>
                            <Nav.Link className="nav_link" href="#link">Tanulmányok</Nav.Link>
                            <Nav.Link className="nav_link" href="#home">Tárgyfelvétel</Nav.Link>
                            <Nav.Link className="nav_link" href="#link">Vizsgák</Nav.Link>
                            <Nav.Link className="nav_link" href="#home">Órarend</Nav.Link>
                            <Nav.Link className="nav_link" href="#link">Üzenetek</Nav.Link>
                            <Nav.Link className="nav_link" href="#home">Fórum</Nav.Link>
                            <Nav.Link className="nav_link" href="#link">Hirdetmények</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    </>;
}
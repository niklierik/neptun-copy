"use client";

import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signout } from "./utils";

export function Admin() {
    return (
        <NavDropdown className="nav_link" title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item href="/admin/majors">Szakok</NavDropdown.Item>
            <NavDropdown.Item href="/admin/subjects">
                Tantárgyak
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/rooms">Termek</NavDropdown.Item>
            <NavDropdown.Item href="/admin/courses">Kurzusok</NavDropdown.Item>
            <NavDropdown.Item href="/admin/register">
                Regisztrálás
            </NavDropdown.Item>
            <NavDropdown.Divider></NavDropdown.Divider>
            <NavDropdown.Item href="/admin/datas/users">
                Felhasználók
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/rooms">
                Termek
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/courses">
                Kurzusok
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/subjects">
                Tantárgyak
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/majors">
                Szakok
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/education-charts">
                Mintatanterv
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/messagings">
                Üzenetek
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/forums">
                Fórum
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/news">
                Hirdetmények
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/common-news">
                Összevont hirdetmények
            </NavDropdown.Item>
            <NavDropdown.Item href="/admin/datas/common-forums">
                Összevont fórum
            </NavDropdown.Item>
        </NavDropdown>
    );
}

export default function MyNavbar({
    email,
    isAdmin,
}: {
    email: string;
    isAdmin: boolean;
}) {
    return (
        <>
            <div className="top_text_div">
                <div>
                    <p className="top_text">{email}</p>
                </div>
                <div className="navigation">
                    <Navbar className="zero_padding" expand="lg" variant="dark">
                        <Container>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link className="nav_link" href="/">
                                        Főoldal
                                    </Nav.Link>
                                    <Nav.Link
                                        className="nav_link"
                                        href="/studies"
                                    >
                                        Tanulmányok
                                    </Nav.Link>
                                    <Nav.Link
                                        className="nav_link"
                                        href="/subjects"
                                    >
                                        Tárgyfelvétel
                                    </Nav.Link>
                                    <Nav.Link
                                        className="nav_link"
                                        href="/exams"
                                    >
                                        Vizsgák
                                    </Nav.Link>
                                    <Nav.Link
                                        className="nav_link"
                                        href="/marks"
                                    >
                                        Jegy statisztika
                                    </Nav.Link>
                                    <Nav.Link className="nav_link" href="/pms">
                                        Üzenetek
                                    </Nav.Link>
                                    {isAdmin ? <Admin></Admin> : <></>}
                                    <Nav.Link
                                        className="nav_link"
                                        href="/change-password"
                                    >
                                        Jelszó megváltoztatása
                                    </Nav.Link>
                                    <Nav.Link
                                        className="nav_link"
                                        onClick={() => {
                                            signout();
                                            window.location.href = "/login";
                                        }}
                                    >
                                        Kijelentkezés
                                    </Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </div>
        </>
    );
}

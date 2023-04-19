"use client";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function MyNavbar({ email }: { email: string }) {
  return (
    <>
      <div className="top_text_div">
        <div><p className="top_text">{email}</p></div>
        <div className="navigation">
          <Navbar className="zero_padding" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link className="nav_link" href="/">
                    Főoldal
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#link">
                    Tanulmányok
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#a1">
                    Tárgyfelvétel
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#a2">
                    Vizsgák
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#a3">
                    Órarend
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#a4">
                    Üzenetek
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#a5">
                    Fórum
                  </Nav.Link>
                  <Nav.Link className="nav_link" href="#a6">
                    Hirdetmények
                  </Nav.Link>
                  <NavDropdown
                    className="nav_link"
                    title="Admin"
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
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
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  );
}

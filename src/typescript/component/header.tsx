import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Header: React.FunctionComponent<{}> = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='header'>
      <Container>
        <Navbar.Brand href="#home">SoundStadio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="File" id="header-dropdown-file">
              <NavDropdown.Item href="#">New file</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Save</NavDropdown.Item>
              <NavDropdown.Item href="#">Save as ...</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Open file</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Edit" id="header-dropdown-edit">
              <NavDropdown.Item href="#">Undo</NavDropdown.Item>
              <NavDropdown.Item href="#">Redo</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Add note</NavDropdown.Item>
              <NavDropdown.Item href="#">Select note</NavDropdown.Item>
              <NavDropdown.Item href="#">Mod note</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="Player" id="header-dropdown-player">
              <NavDropdown.Item href="#">Play</NavDropdown.Item>
              <NavDropdown.Item href="#">Stop</NavDropdown.Item>
              <NavDropdown.Item href="#">Jump to</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link id="header-dropdown-settings">Settings</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
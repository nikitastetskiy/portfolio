import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { mainBody, about } from '../editable-stuff/config';

const Navigation = React.forwardRef(() => {
  const [isTop] = useState(true);
  const navbarMenuRef = React.useRef();

  return (
    <Navbar
      ref={navbarMenuRef}
      className={` fixed-top  ${
        !isTop ? 'navbar-white' : 'navbar-transparent'
      }`}
      expand="lg"
    >
      <Navbar.Brand className="brand" href={`${process.env.PUBLIC_URL}/#home`}>
        {`<${mainBody.firstName} />`}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="nav-link lead"
            href={about.resume}
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
          </Nav.Link>
          <Nav.Link
            className="nav-link lead"
            href={`${process.env.PUBLIC_URL}/#aboutme`}
          >
            About
          </Nav.Link>
          <Nav.Link
            className="nav-link lead"
            href={`${process.env.PUBLIC_URL}/#projects`}
          >
            Projects
          </Nav.Link>
          <Nav.Link
            className="nav-link lead"
            href={`${process.env.PUBLIC_URL}/#skills`}
          >
            Skills
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;

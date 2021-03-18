/* eslint-disable no-undef */
import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { mainBody, about } from '../editable-stuff/config';
import pdf from '../editable-stuff/resume.pdf';

const Navigation = React.forwardRef(() => {
  const isTop = window.pageYOffset;
  console.log(window.pageYOffset);
  const navbarMenuRef = React.useRef();

  return (
    <Navbar
      ref={navbarMenuRef}
      className={` fixed-top  ${
        window.pageYOffset ? 'transparent' : 'navbar-white'
      }`}
      expand="lg"
    >
      <Navbar.Brand className="brand" href="/#home">
        {`< Portfolio />`}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggler" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            href="#"
            onclick="window.open('pdf', '_blank', 'fullscreen=yes'); return false;"
          >
            Resume
          </Nav.Link>
          <Nav.Link className="nav-link lead" href="/#aboutme">
            About
          </Nav.Link>
          <Nav.Link className="nav-link lead" href="/#projects">
            Projects
          </Nav.Link>
          <Nav.Link className="nav-link lead" href="/#skills">
            Skills
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;

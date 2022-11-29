import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = React.forwardRef(() => {
  const [navbar, setNavbar] = useState(false);
  const navbarMenuRef = React.useRef();

  const changeBackground = () => {
    if (window.pageYOffset >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener('scroll', changeBackground);

  return (
    <Navbar
      ref={navbarMenuRef}
      className={` fixed-top  ${
        navbar ? 'navbar-white' : 'navbar-transparent'
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
            className="nav-link lead"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume
          </Nav.Link>
          <Nav.Link className="nav-link lead" href="/#aboutme">
            About
          </Nav.Link>
          <Nav.Link className="nav-link lead" href="/#skills">
            Skills
          </Nav.Link>
          <Nav.Link className="nav-link lead" href="/#projects">
            Projects
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default Navigation;

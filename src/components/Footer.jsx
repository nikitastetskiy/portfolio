import React from 'react';
import Container from 'react-bootstrap/Container';
import { getInTouch } from '../personal-info/config';

const Footer = () => {
  const bgStyle = { backgroundColor: '#EEEEEE' };

  return (
    <footer style={bgStyle} className="mt-auto py-5 text-center">
      <Container>
        <h2 className="display-5 pb-3 text-center">{getInTouch.heading}</h2>
        <p className="lead text-center pb-3">
          {getInTouch.message}
          &nbsp;
          <a href={`mailto:${getInTouch.email}`}>{getInTouch.email}</a>
          .&nbsp;
        </p>
        <p>
          <small className="text-muted">
            Project code is open source. Feel free to fork it on
            <a
              rel="noopener"
              href="https://github.com/nikitastetskiy"
              aria-label="My GitHub"
            >
              &nbsp;Github
            </a>
            .
          </small>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

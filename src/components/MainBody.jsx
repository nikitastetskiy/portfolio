import React from 'react';
import Typist from 'react-typist';
import Typed from 'react-typed';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import StarfieldAnimation from 'react-starfield-animation';
import { mainBody } from '../personal-info/config';

const MainBody = React.forwardRef(() => {
  const Ref = React.useRef();

  return (
    <Jumbotron
      fluid
      id="home"
      style={{
        background: `linear-gradient(136deg,${mainBody.gradientColors})`,
        backgroundSize: '1000% 1000%',
      }}
      className="title bg-transparent bgstyle text-light min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
    >
      <StarfieldAnimation
        lineWidth={0.0}
        depth={1000}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      />
      <Container className="text-center text-mix">
        <h1 ref={Ref} className="display-1">
          {`${mainBody.firstName} ${mainBody.lastName}`}
        </h1>
        <div>
          {/* 
          
          Using componentWillReceiveProps (deprecated)
          
          */}
          <div className="p-3">
            <Typist className="lead typist" cursor={{ show: false }}>
              {mainBody.firstMessage}
            </Typist>
          </div>
          <div className="p-1">
            &lt;
            <Typed
              strings={mainBody.secondMessage}
              typeSpeed={40}
              backSpeed={60}
              startDelay={4000}
              backDelay={1000}
              loop
              showCursor={false}
            />
            /&gt;
          </div>
        </div>
        <div className="header-icons">
          <a
            aria-label="Send email"
            href="mailto:nikin929@gmail.com"
            rel="noreferrer noopener"
          >
            <i className="icon fa fa-envelope" />
          </a>
          <a
            aria-label="My Linkedin"
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.linkedin.com/in/nikita-stetskiy-743572150/"
          >
            <i className="icon fab fa-linkedin" aria-hidden="true" />
          </a>
          <a
            aria-label="My Github"
            target="_blank"
            rel="noreferrer noopener"
            href="https://github.com/nikitastetskiy"
          >
            <i className="icon fab fa-github-alt" aria-hidden="true" />
          </a>
        </div>
        <a
          className="btn btn-outline-light btn-lg"
          href="#aboutme"
          role="button"
          aria-label="Learn more about me"
        >
          More about me
        </a>
      </Container>
    </Jumbotron>
  );
});

export default MainBody;

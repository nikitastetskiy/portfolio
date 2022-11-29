import React from 'react';
import { about } from '../personal-info/config';
import ProfilePicture from '../images/profile.png';

const AboutMe = () => (
  <div id="aboutme" className="jumbotron jumbotron-fluid m-0 bg-light">
    <div className="container container-fluid display-4 pb-5 text-center">
      <div className="row aboutme-text">
        <div>
          <img
            className="border-secondary rounded-circle center pic"
            src={ProfilePicture}
            alt="profilePicture"
            width="500px"
          />
        </div>

        <div className="container container-fluid">
          <h2 className="display-4 mb-5 text-center">{about.heading}</h2>
          <p className="lead text-center">{about.message}</p>
          <p className="lead text-center">
            <a
              className="btn btn-outline-dark btn-lg"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              role="button"
              aria-label="Resume/CV"
            >
              Resume
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default AboutMe;

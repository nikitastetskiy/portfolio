import React from 'react';
import { about } from '../personal-info/config';
import ProfilePicture from '../images/profile.jpeg';
import Pdf from '../personal-info/resume.pdf';

const AboutMe = () => (
  <div id="aboutme" className="jumbotron jumbotron-fluid m-0">
    <div className="container container-fluid">
      <div className="row">
        <div className="col-5 d-none d-lg-block align-self-center">
          <img
            className="border-secondary rounded-circle center"
            src={ProfilePicture}
            alt="profilePicture"
            width={about.imageSize}
            height={about.imageSize}
          />
        </div>

        <div className="col-lg-7">
          <h2 className="display-4 mb-5 text-center">{about.heading}</h2>
          <p className="lead text-center">{about.message}</p>
          {about.Pdf && (
            <p className="lead text-center">
              <a
                className="btn btn-outline-dark btn-lg"
                href={Pdf}
                target="_blank"
                rel="noreferrer noopener"
                role="button"
                aria-label="Resume/CV"
              >
                Resume
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);
export default AboutMe;

import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { skills } from '../personal-info/config';

function Skills() {
  return (
    <Jumbotron ref={skills.skillsTabRef} fluid className="m-0" id="skills">
      <Container className="p-2">
        <h2 ref={skills.skillsTabRef} className="display-4 pb-5 text-center">
          {skills.heading}
        </h2>
        <div className="user">
          <div>
            <div className="tech">
              <h2 className="pb-3">Code</h2>
              <i className="icons fab fa-python" />
              <i className="icons fab fa-js-square" />
              <i className="icons devicon-cplusplus-line-wordmark" />
            </div>
            <div className="tech">
              <i className="icons devicon-java-plain" />
              <i className="icons devicon-ruby-plain" />
              <i className="icons devicon-html5-plain-wordmark" />
            </div>
          </div>

          <div>
            <div className="tech">
              <h2 className="pb-3">Web</h2>
              <i className="icons devicon-apache-line-wordmark" />
              <i className="icons devicon-django-line-wordmark" />
              <i className="icons fab devicon-nginx-original-wordmark" />
            </div>
            <div className="tech">
              <i className="icons devicon-bootstrap-plain-wordmark" />
              <i className="icons devicon-flask-original" />
              <i className="icons devicon-heroku-original" />
            </div>
          </div>
          <div>
            <div className="tech">
              <h2 className="pb-3">Tools</h2>
              <i className="icons devicon-docker-plain" />
              <i className="icons fab fa-git" />
              <i className="icons fab devicon-mongodb-plain-wordmark" />
            </div>
            <div className="tech">
              <i className="icons devicon-postgresql-plain" />
              <i className="icons devicon-npm-original-wordmark" />
              <i className="icons devicon-express-original-wordmark" />
            </div>
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
}

export default Skills;

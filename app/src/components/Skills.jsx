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
              <i className="icons devicon-python-plain" />
              <i className="icons devicon-javascript-plain" />
              <i className="icons devicon-cplusplus-line-wordmark" />
            </div>
            <div className="tech">
              <i className="icons devicon-java-plain" />
              <i className="icons devicon-ruby-plain" />
              <i className="icons devicon-php-plain" />
              
            </div>
          </div>

          <div>
            <div className="tech">
              <h2 className="pb-3">Web</h2>
              <i className="icons devicon-heroku-original" />
              <i className="icons devicon-googlecloud-plain" />
              <i className="icons devicon-amazonwebservices-original" />
            </div>
            <div className="tech">
              <i className="icons devicon-html5-plain-wordmark" />
              <i className="icons devicon-flask-original" />
              <i className="icons devicon-apache-line-wordmark" />
            </div>
          </div>
          <div>
            <div className="tech">
              <h2 className="pb-3">Tools</h2>
              <i className="icons devicon-docker-plain" />
              <i className="icons devicon-github-original" />
              <i className="icons devicon-mongodb-plain-wordmark" />
            </div>
            <div className="tech">
              <i className="icons devicon-postgresql-plain" />
              <i className="icons devicon-react-original" />
              <i className="icons devicon-terraform-plain" />
            </div>
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
}

export default Skills;

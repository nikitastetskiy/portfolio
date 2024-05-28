import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { skills } from '../personal-info/config';

import pythonIcon from '../icons/python.svg';
import javascriptIcon from '../icons/javascript.svg';
import javaIcon from '../icons/java.svg';
import rubyIcon from '../icons/ruby.svg';
import postgresqlIcon from '../icons/postgresql.svg';
import mongodbIcon from '../icons/mongodb.svg';
import dockerIcon from '../icons/docker.svg';
import kubernetesIcon from '../icons/kubernetes.svg';
import ocpIcon from '../icons/ocp.svg';
import githubIcon from '../icons/github.svg';
import terraformIcon from '../icons/terraform.svg';
import reactIcon from '../icons/react.svg';
import ibmcloudIcon from '../icons/ibmcloud.svg';
import awsIcon from '../icons/aws.svg';
import googlecloudIcon from '../icons/gcp.svg';
import photoshopIcon from '../icons/photoshop.svg';
import davinciIcon from '../icons/davinci.svg';
import finalcutIcon from '../icons/finalcut.svg';

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
              <div className="icons">
                <img src={pythonIcon} alt="Python" />
              </div>
              <div className="icons">
                <img src={javascriptIcon} alt="JavaScript" />
              </div>
              <div className="icons">
                <img src={javaIcon} alt="Java" />
              </div>
              <div className="icons">
                <img src={rubyIcon} alt="Ruby" />
              </div>
              <div className="icons">
                <img src={postgresqlIcon} alt="PostgreSQL" />
              </div>
              <div className="icons">
                <img src={mongodbIcon} alt="MongoDB" />
              </div>
            </div>
          </div>
          <div>
            <div className="tech">
              <h2 className="pb-3">Infrastructure</h2>
              <div className="icons">
                <img src={dockerIcon} alt="Docker" />
              </div>
              <div className="icons">
                <img src={kubernetesIcon} alt="Kubernetes" />
              </div>
              <div className="icons">
                <img src={ocpIcon} alt="OCP" />
              </div>
              <div className="icons">
                <img src={githubIcon} alt="GitHub" />
              </div>
              <div className="icons">
                <img src={terraformIcon} alt="Terraform" />
              </div>
              <div className="icons">
                <img src={reactIcon} alt="React" />
              </div>
            </div>
          </div>
          <div>
            <div className="tech">
              <h2 className="pb-3">Tools</h2>
              <div className="icons">
                <img src={ibmcloudIcon} alt="IBM Cloud" />
              </div>
              <div className="icons">
                <img src={awsIcon} alt="AWS" />
              </div>
              <div className="icons">
                <img src={googlecloudIcon} alt="Google Cloud" />
              </div>
              <div className="icons">
                <img src={photoshopIcon} alt="Photoshop" />
              </div>
              <div className="icons">
                <img src={davinciIcon} alt="DaVinci Resolve" />
              </div>
              <div className="icons">
                <img src={finalcutIcon} alt="Final Cut" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
}

export default Skills;

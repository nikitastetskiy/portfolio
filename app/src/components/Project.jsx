import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import { repos } from '../personal-info/config';

const dummyProject = {
  name: null,
  description: null,
  svn_url: null,
  stargazers_count: null,
  languages_url: null,
  pushed_at: null,
};
const API = 'https://api.github.com';

const Project = () => {
  const allReposAPI = `${API}/users/${repos.gitHubUsername}/repos?sort=updated&direction=desc`;
  const specficReposAPI = `${API}/repos/${repos.gitHubUsername}`;
  const dummyProjectsArr = new Array(
    repos.reposLength + repos.specificRepos.length
  ).fill(dummyProject);

  const [projectsArray, setProjectsArray] = useState([]);

  const fetchRepos = useCallback(async () => {
    let repoList = [];
    try {
      // getting all repos
      let response = await axios.get(allReposAPI);
      // slicing to the length
      repoList = [...response.data.slice(0, repos.reposLength)];
      // adding specified repos
      try {
        for (let i = 0; i < repos.specificRepos.length; i += 1) {
          response = await axios.get(
            `${specficReposAPI}/${repos.specificRepos[i]}`
          );
          repoList.push(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
      // setting projectArray
      // TODO: remove the duplication.
      setProjectsArray(repoList);
    } catch (error) {
      console.error(error.message);
    }
  }, [allReposAPI, repos.reposLength, repos.specificRepos, specficReposAPI]);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <Jumbotron fluid id="projects" className="bg-light m-0 align-items-center">
      <Container className="">
        <h2 className="display-4 pb-5 text-center">{repos.heading}</h2>
        <Row>
          {projectsArray.length
            ? projectsArray.map((project, index) => (
                <ProjectCard
                  key={`project-card-${repos.reposLength - index}`}
                  id={`project-card-${index}`}
                  value={project}
                />
              ))
            : dummyProjectsArr.map((project, index) => (
                <ProjectCard
                  key={`dummy-${repos.reposLength - index}`}
                  id={`dummy-${index}`}
                  value={project}
                />
              ))}
        </Row>
      </Container>
    </Jumbotron>
  );
};

export default Project;

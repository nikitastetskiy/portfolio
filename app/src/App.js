/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainBody from './components/MainBody';
import AboutMe from './components/AboutMe';
import Project from './components/Project';
import Skills from './components/Skills';
import Footer from './components/Footer';
import './scss/custom.scss';
import './App.css';

const App = () => {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <Navbar />
      <MainBody />
      <AboutMe />
      <Skills />
      <Project />
      <Footer />
    </BrowserRouter>
  );
};

export default App;

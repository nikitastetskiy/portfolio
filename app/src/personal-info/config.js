// NAVIGATION BAR SECTION

const navBar = {};

// MAIN BODY SECTION

const mainBody = {
  gradientColors: '#FFFFFF, #3D3D3D, #000000',
  firstName: 'Nikita',
  lastName: 'Stetskiy',
  firstMessage: ' The secret of getting ahead is getting started. ',
  secondMessage: ['IT Engineer', 'Cloud Architect', 'Full Stack Developer'],
};

// ABOUT SECTION

const about = {
  heading: 'About Me',
  message:
    'My name is Nikita Stetskiy. I graduated from the University of Granada (UGR) in 2022 with a degree in Computer Engineering, specializing in IT. Currently, I am developing my career as a Cloud Architect at IBM. In this role, I leverage my expertise to design and manage robust and scalable cloud architecture solutions. Additionally, I aim to focus on design, networking, automation, and development, with the intention of understanding all layers of a solution. Outside of my professional career, I enjoy image and video editing, which allows me to express my creativity in different ways.',
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]

const repos = {
  heading: 'Recent Projects',
  gitHubUsername: 'nikitastetskiy',
  reposLength: 4,
  specificRepos: [],
};

// SKILLS SECTION

const skills = {
  heading: 'Skills',
};

// GET IN TOUCH SECTION

const getInTouch = {
  heading: 'Get In Touch',
  message:
    'Thank you for your time and consideration. Feel free to email me at',
  email: 'nikitastetskiy@gmail.com',
};

export { navBar, mainBody, about, repos, skills, getInTouch };

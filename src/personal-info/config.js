// NAVIGATION BAR SECTION

const navBar = {};

// MAIN BODY SECTION

const mainBody = {
  gradientColors: '#FFFFFF, #3D3D3D, #000000',
  firstName: 'Nikita',
  lastName: 'Stetskiy',
  firstMessage: ' The secret of getting ahead is getting started. ',
  secondMessage: [
    'Computer Science Student',
    'IT Engineer',
    'Full Stack Developer',
  ],
};

// ABOUT SECTION

const about = {
  heading: 'About Me',
  message:
    'My name is Nikita Stetskiy. I’m an IT engineer student from the University of Granada. In my spare time I enjoy improving my editing skills and ' +
    "being engaging with projects that require me to work outside my comfort set, as continuing to learn new languages and development techniques. I'm improving myself to become dedicated and efficient " +
    'full stack developer expert in application layers, presentation layers, databases, data structures and my relationships.',
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

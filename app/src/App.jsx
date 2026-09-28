import { useState, useEffect, useRef } from 'react';
import {
  profile,
  copy,
  experience,
  skillGroups,
  projects,
  education,
  certifications,
  formatMonth,
} from './personal-info/config.js';
import portrait from './images/profile.png';
import Starfield from './components/Starfield.jsx';
import pythonIcon from './icons/python.svg';
import javascriptIcon from './icons/javascript.svg';
import javaIcon from './icons/java.svg';
import dockerIcon from './icons/docker.svg';
import kubernetesIcon from './icons/kubernetes.svg';
import terraformIcon from './icons/terraform.svg';
import ibmcloudIcon from './icons/ibmcloud.svg';
import awsIcon from './icons/aws.svg';
import gcpIcon from './icons/gcp.svg';

const base = import.meta.env.BASE_URL;
const sectionIds = ['aboutme', 'experience', 'skills', 'projects'];
export function pagePath(lang, resume = false) {
  return `${base}${lang === 'es' ? 'es/' : ''}${resume ? 'resume/' : ''}`;
}
export function routeFromPath(path) {
  const local = path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, '');
  return {
    lang: local.startsWith('es/') || local === 'es' ? 'es' : 'en',
    resume: /(^|\/)resume(?:\/|$)/.test(local),
  };
}
function ExternalLink({ href, children, className = '' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
function Tags({ items, highlight }) {
  return (
    <ul className="skill-tags">
      {items.map((item) => (
        <li key={item} className={item === highlight ? 'tag-highlight' : undefined}>
          {item}
        </li>
      ))}
    </ul>
  );
}
function Navigation({ lang, resume }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY >= 80);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header>
      <nav
        className={`navbar navbar-expand-lg navbar-light fixed-top ${scrolled || resume || open ? 'navbar-white' : 'navbar-transparent'}`}
        aria-label={lang === 'es' ? 'Navegación principal' : 'Main navigation'}
      >
        <a className="navbar-brand brand" href={`${pagePath(lang)}#home`}>
          {'< Portfolio />'}
        </a>
        <button
          ref={toggle}
          className="navbar-toggler toggler"
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? t.close : t.menu}
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id="site-navigation"
          className={`collapse navbar-collapse ${open ? 'show' : ''}`}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
              toggle.current?.focus();
            }
          }}
        >
          <div className="navbar-nav mr-auto">
            {resume ? (
              <a className="nav-link lead" href={pagePath(lang)}>
                {t.home}
              </a>
            ) : (
              <>
                <a className="nav-link lead" href={pagePath(lang, true)}>
                  {t.resume}
                </a>
                {sectionIds.map((id, i) => (
                  <a
                    className="nav-link lead"
                    href={`#${id}`}
                    key={id}
                    onClick={() => setOpen(false)}
                  >
                    {t.nav[i]}
                  </a>
                ))}
              </>
            )}
          </div>
          <a
            className="nav-link lead language-link"
            href={pagePath(lang === 'en' ? 'es' : 'en', resume)}
            lang={lang === 'en' ? 'es' : 'en'}
            hrefLang={lang === 'en' ? 'es' : 'en'}
          >
            {t.otherLang}
          </a>
        </div>
      </nav>
    </header>
  );
}
function RotatingText({ phrases }) {
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer;
    let index = 0;
    let length = phrases[0].length;
    let deleting = true;
    const tick = () => {
      length += deleting ? -1 : 1;
      setText(phrases[index].slice(0, length));
      let delay = deleting ? 35 : 65;
      if (length === 0) {
        deleting = false;
        index = (index + 1) % phrases.length;
        delay = 250;
      } else if (length === phrases[index].length) {
        deleting = true;
        delay = 2400;
      }
      timer = window.setTimeout(tick, delay);
    };
    const restart = () => {
      window.clearTimeout(timer);
      index = 0;
      length = phrases[0].length;
      deleting = true;
      setText(phrases[0]);
      if (!preference.matches) timer = window.setTimeout(tick, 3000);
    };
    restart();
    preference.addEventListener('change', restart);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', restart);
    };
  }, [phrases]);
  return (
    <div className="hero-tagline">
      <span className="sr-only">{phrases.join('. ')}</span>
      <span aria-hidden="true">
        {'< '}
        {text}
        {' />'}
      </span>
    </div>
  );
}
function Hero({ lang }) {
  const t = copy[lang];
  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      style={{
        background: 'linear-gradient(136deg,#FFFFFF, #3D3D3D, #000000)',
        backgroundSize: '1200% 1200%',
      }}
      className="jumbotron jumbotron-fluid title bg-transparent bgstyle text-light min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
    >
      <Starfield />
      <div className="container text-center text-mix">
        <h1 id="hero-name" className="display-1">
          {profile.name}
        </h1>
        <div className="p-3">
          <p className="lead typist mb-0">
            {profile.role} {t.at} HashiCorp
          </p>
        </div>
        <RotatingText phrases={t.heroPhrases} />
        <p className="mt-3 mb-0">{t.basedIn}</p>
        <div className="header-icons">
          <a aria-label={t.emailLabel} href={`mailto:${profile.email}`}>
            <i className="icon fa fa-envelope" aria-hidden="true" />
          </a>
          <ExternalLink href={profile.linkedin}>
            <span className="sr-only">LinkedIn</span>
            <i className="icon fab fa-linkedin-in" aria-hidden="true" />
          </ExternalLink>
          <ExternalLink href={profile.github}>
            <span className="sr-only">GitHub</span>
            <i className="icon fab fa-github-alt" aria-hidden="true" />
          </ExternalLink>
        </div>
        <a className="btn btn-outline-light btn-lg hero-about" href="#aboutme">
          {t.moreAbout}
        </a>
      </div>
    </section>
  );
}
function About({ lang }) {
  const t = copy[lang];
  return (
    <section id="aboutme" className="jumbotron jumbotron-fluid m-0 bg-light">
      <div className="container">
        <div className="about-layout">
          <div className="about-portrait">
            <img
              className="border-secondary rounded-circle pic"
              src={portrait}
              alt="Nikita Stetskiy"
              width="500"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="about-copy">
            <h2 className="display-4 mb-4">{t.nav[0]}</h2>
            {t.about.map((p) => (
              <p className="lead" key={p}>
                {p}
              </p>
            ))}
            <p className="lead mt-4 mb-0">
              <a className="btn btn-outline-dark btn-lg" href={pagePath(lang, true)}>
                {t.resume}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Experience({ lang, resume = false }) {
  const t = copy[lang];
  const jobs = (
    <div className="experience-list">
      {experience.map((job) => (
        <article className="experience-entry" key={`${job.company}-${job.start}`}>
          <div className="experience-meta">
            <p>
              <time dateTime={job.start}>{formatMonth(job.start, lang)}</time> ·{' '}
              {job.end ? <time dateTime={job.end}>{formatMonth(job.end, lang)}</time> : t.present}
            </p>
            <h3>{job.company}</h3>
          </div>
          <div>
            <h3>{job.role[lang]}</h3>
            <p className="text-muted">{job.location[lang]}</p>
            <p>{job.description[lang]}</p>
            {job.tags.length > 0 && <Tags items={job.tags} />}
          </div>
        </article>
      ))}
    </div>
  );
  return resume ? (
    <section className="resume-section">
      <h2>{t.nav[1]}</h2>
      {jobs}
    </section>
  ) : (
    <section id="experience" className="jumbotron jumbotron-fluid m-0 bg-white">
      <div className="container">
        <h2 className="display-4 pb-5 text-center">{t.nav[1]}</h2>
        {jobs}
      </div>
    </section>
  );
}
const iconGroups = [
  {
    en: 'Code',
    es: 'Código',
    skills: 2,
    items: [
      ['Python', pythonIcon],
      ['JavaScript', javascriptIcon],
      ['Java', javaIcon],
    ],
  },
  {
    en: 'Infrastructure',
    es: 'Infraestructura',
    skills: 1,
    items: [
      ['Terraform', terraformIcon],
      ['Docker', dockerIcon],
      ['Kubernetes', kubernetesIcon],
    ],
  },
  {
    en: 'Cloud',
    es: 'Cloud',
    skills: 0,
    items: [
      ['IBM Cloud', ibmcloudIcon],
      ['AWS', awsIcon],
      ['Google Cloud', gcpIcon],
    ],
  },
];
function Skills({ lang }) {
  const t = copy[lang];
  return (
    <section id="skills" className="jumbotron jumbotron-fluid m-0">
      <div className="container p-2">
        <h2 className="display-4 pb-4 text-center">{t.nav[2]}</h2>
        <div className="row skills-grid">
          {iconGroups.map((group) => (
            <div className="col-md-4 skill-group" key={group.en}>
              <div className="tech text-center">
                <h3 className="pb-3">{group[lang]}</h3>
                {group.items.map(([label, image]) => (
                  <div className="icons" key={label}>
                    <img
                      src={image}
                      alt={label}
                      title={label}
                      width="60"
                      height="60"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <p>{skillGroups[group.skills].text[lang]}</p>
              <Tags items={skillGroups[group.skills].tags} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Projects({ lang }) {
  const t = copy[lang];
  return (
    <section id="projects" className="jumbotron jumbotron-fluid bg-light m-0">
      <div className="container">
        <h2 className="display-4 pb-3 text-center">{t.nav[3]}</h2>
        <p className="lead text-center mb-4">{t.projectsIntro}</p>
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-6 mb-4" key={project.id}>
              <article className={`card project-card bg-white rounded h-100 ${project.category}`}>
                <div className="project-visual" aria-hidden="true">
                  <div className="project-diagram">
                    {project.diagram.map((label, index) => (
                      <span
                        className={index === 1 ? 'diagram-node active-node' : 'diagram-node'}
                        key={label}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <span className="project-label">{project.label}</span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h3 className="h4 card-title">{project.title[lang]}</h3>
                  <p className="card-text">{project.text[lang]}</p>
                  <Tags items={project.tags} highlight={project.tags[0]} />
                  <div className="mt-auto pt-3">
                    <ExternalLink
                      className="btn btn-outline-secondary"
                      href={`${profile.github}/${project.id}`}
                    >
                      <i className="fab fa-github" aria-hidden="true" /> {t.repo}
                      <span className="sr-only">: {project.title[lang]}</span>
                    </ExternalLink>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Qualifications({ lang, resume = false }) {
  const t = copy[lang];
  const content = (
    <div className="row qualification-grid">
      <div className="col-md-6">
        <div className={resume ? '' : 'qualification-panel'}>
          <h2 className={resume ? '' : 'h3 qualification-heading'}>{t.education}</h2>
          {education.map((item) => (
            <article className="qualification-entry" key={item.school}>
              <p className="small text-muted mb-2">{item.date}</p>
              <h3 className="h5">{item.school}</h3>
              <p className="mb-0">{item.title[lang]}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="col-md-6">
        <div className={resume ? '' : 'qualification-panel'}>
          <h2 className={resume ? '' : 'h3 qualification-heading'}>{t.certifications}</h2>
          {certifications.map((item) => (
            <article className="qualification-entry" key={item.title}>
              <p className="small text-muted mb-2">
                {t.issued} {formatMonth(item.date, lang)}
              </p>
              <h3 className="h5 mb-0">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
  return (
    <section
      className={
        resume ? 'resume-section' : 'jumbotron jumbotron-fluid bg-white m-0 qualifications-section'
      }
      aria-label={`${t.education} / ${t.certifications}`}
    >
      <div className={resume ? '' : 'container'}>{content}</div>
    </section>
  );
}
function Resume({ lang }) {
  const t = copy[lang];
  return (
    <div className="container resume-page">
      <div className="resume-tools">
        <a href={pagePath(lang)}>{t.home}</a>
        <button className="btn btn-outline-dark" onClick={() => window.print()}>
          {t.print}
        </button>
      </div>
      <article className="resume-document">
        <header>
          <h1>{profile.name}</h1>
          <p className="lead">
            {profile.role} {t.at} HashiCorp
          </p>
          <p>{t.location}</p>
          <div className="resume-links">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin}>linkedin.com/in/nikitastetskiy</a>
            <a href={profile.github}>github.com/nikitastetskiy</a>
          </div>
        </header>
        <section className="resume-summary" aria-label={t.nav[0]}>
          {t.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <Experience lang={lang} resume />
        <section className="resume-section">
          <h2>{t.nav[2]}</h2>
          {skillGroups.map((group) => (
            <p key={group.title.en}>
              <strong>{group.title[lang]}: </strong>
              {group.tags.join(', ')}
            </p>
          ))}
        </section>
        <Qualifications lang={lang} resume />
        <section className="resume-section">
          <h2>{t.nav[3]}</h2>
          {projects.slice(0, 2).map((project) => (
            <p key={project.id}>
              <a href={`${profile.github}/${project.id}`}>{project.title[lang]}</a>:{' '}
              {project.text[lang]}
            </p>
          ))}
        </section>
      </article>
    </div>
  );
}
function Footer({ lang }) {
  const t = copy[lang];
  return (
    <footer id="contact" style={{ backgroundColor: '#EEEEEE' }} className="mt-auto py-5">
      <div className="container">
        <div className="contact-layout">
          <div>
            <h2 className="display-4 mb-3">{t.contact}</h2>
            <p className="lead mb-3">{t.contactText}</p>
            <p className="text-muted mb-0">{t.contactDetail}</p>
          </div>
          <div className="contact-links">
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <ExternalLink href={profile.linkedin}>
              <i className="fab fa-linkedin-in" aria-hidden="true" /> LinkedIn
            </ExternalLink>
            <ExternalLink href={profile.github}>
              <i className="fab fa-github-alt" aria-hidden="true" /> GitHub
            </ExternalLink>
          </div>
        </div>
        <small className="text-muted">
          © {new Date().getFullYear()} {profile.name} ·{' '}
          <ExternalLink href={profile.source}>{t.code}</ExternalLink>
        </small>
      </div>
    </footer>
  );
}
export default function App({ lang = 'en', resume = false }) {
  return (
    <>
      <a className="skip-link" href="#main">
        {copy[lang].skip}
      </a>
      <Navigation lang={lang} resume={resume} />
      <main id="main" tabIndex="-1">
        {resume ? (
          <Resume lang={lang} />
        ) : (
          <>
            <Hero lang={lang} />
            <About lang={lang} />
            <Experience lang={lang} />
            <Skills lang={lang} />
            <Projects lang={lang} />
            <Qualifications lang={lang} />
          </>
        )}
      </main>
      <Footer lang={lang} />
    </>
  );
}

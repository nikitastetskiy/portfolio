import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { routeFromPath } from './App.jsx';
import './scss/custom.scss';
import './App.css';
import './enhancements.css';

const root = document.getElementById('root');
const route = routeFromPath(window.location.pathname);
const app = <App {...route} />;
document.documentElement.lang = route.lang;
if (root.querySelector('main')) hydrateRoot(root, app);
else createRoot(root).render(app);

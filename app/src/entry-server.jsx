import { renderToString } from 'react-dom/server';
import App from './App.jsx';
export function render(lang, resume) {
  return renderToString(<App lang={lang} resume={resume} />);
}

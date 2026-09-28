import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { render } from '../.ssr/entry-server.js';
import { profile, copy } from '../src/personal-info/config.js';

const base = process.env.SITE_BASE || '/';
if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base))
  throw new Error('SITE_BASE must be a slash-delimited path, e.g. /portfolio/');
const origin = process.env.SITE_ORIGIN || profile.site;
const rootUrl = new URL(base, origin).href;
const template = await readFile('dist/index.html', 'utf8');
const portrait = (await readdir('dist/assets')).find((file) => /^profile-.*\.png$/.test(file));
if (!portrait) throw new Error('Missing profile image');
const imageUrl = new URL(`assets/${portrait}`, rootUrl).href;
const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
const routes = [
  { path: '', lang: 'en', resume: false },
  { path: 'es/', lang: 'es', resume: false },
  { path: 'resume/', lang: 'en', resume: true },
  { path: 'es/resume/', lang: 'es', resume: true },
];
for (const route of routes) {
  const t = copy[route.lang];
  const title = `${profile.name} | ${route.resume ? (route.lang === 'es' ? 'Currículum' : 'Résumé') : `Customer Success Engineer ${t.at} HashiCorp`}`;
  const url = new URL(route.path, rootUrl).href;
  const enUrl = new URL(route.resume ? 'resume/' : '', rootUrl).href;
  const esUrl = new URL(route.resume ? 'es/resume/' : 'es/', rootUrl).href;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    inLanguage: route.lang,
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      url: rootUrl,
      jobTitle: profile.role,
      worksFor: { '@type': 'Organization', name: 'HashiCorp' },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: [
        'Cloud Computing',
        'HashiCorp Vault',
        'Terraform',
        'Customer Success',
        'Infrastructure as Code',
      ],
    },
  };
  const meta = `<meta name="description" content="${escape(t.description)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="es" href="${esUrl}" />
    <link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <meta property="og:type" content="profile" />
    <meta property="og:image" content="${imageUrl}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(t.description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="${route.lang === 'es' ? 'es_ES' : 'en_GB'}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(t.description)}" />
    <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  const html = template
    .replace('<html lang="en">', `<html lang="${route.lang}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace('<!--page-meta-->', meta)
    .replace('<!--app-html-->', render(route.lang, route.resume));
  await mkdir(`dist/${route.path}`, { recursive: true });
  await writeFile(`dist/${route.path}index.html`, html);
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${rootUrl}sitemap.xml\n`);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${new URL(route.path, rootUrl).href}</loc></url>`).join('')}</urlset>\n`,
);
await writeFile('dist/.nojekyll', '');
await writeFile(
  'dist/404.html',
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Nikita Stetskiy</title><style>body{font:18px/1.6 system-ui;background:#f5f5f0;color:#202620;max-width:650px;margin:15vh auto;padding:24px}a{color:inherit}</style><h1>Page not found</h1><p>This page may have moved.</p><p><a href="${base}">Back to the portfolio</a> · <a href="${base}resume/">Current résumé</a></p></html>`,
);
console.log(`Pre-rendered ${routes.length} pages at ${rootUrl}`);

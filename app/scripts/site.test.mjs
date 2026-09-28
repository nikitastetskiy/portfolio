import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { profile, projects, experience, copy } from '../src/personal-info/config.js';

const routes = ['', 'es/', 'resume/', 'es/resume/'];
const base = process.env.SITE_BASE || '/';
for (const route of routes) {
  test(`${route || '/'} ships readable content and valid local links without JavaScript`, async () => {
    const html = await readFile(`dist/${route}index.html`, 'utf8');
    const es = route.startsWith('es/');
    assert.ok(html.includes(`<html lang="${es ? 'es' : 'en'}">`));
    assert.match(html, /Customer Success Engineer/);
    assert.match(html, /dateTime="2025-08"/i);
    assert.match(html, /dateTime="2025-09"/i);
    assert.ok(html.includes('buenas prácticas') || html.includes('best practices'));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.ok(!html.includes('<!--app-html-->'));
    assert.ok(!html.includes('<!--page-meta-->'));
    assert.ok(!html.includes('developing my career as a Cloud Architect at IBM'));
    assert.ok(!html.includes('resume.pdf'));
    assert.ok(!html.includes('api.github.com'));
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, 'duplicate HTML IDs');
    for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (url.startsWith('#')) assert.ok(ids.includes(url.slice(1)), `missing anchor ${url}`);
      else if (url.startsWith(base) && !url.startsWith('//')) {
        const target = new URL(url, 'https://local.test');
        let file = path.join('dist', target.pathname.slice(base.length));
        if (target.pathname.endsWith('/')) file += '/index.html';
        assert.ok((await stat(file)).isFile(), `missing local asset ${url}`);
        if (target.hash)
          assert.ok(
            (await readFile(file, 'utf8')).includes(`id="${target.hash.slice(1)}"`),
            `missing destination anchor ${url}`,
          );
      }
    }
    const schema = JSON.parse(
      html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1],
    );
    assert.equal(schema.mainEntity.worksFor.name, 'HashiCorp');
    assert.equal(schema.inLanguage, es ? 'es' : 'en');
    assert.match(html, /rel="canonical"/);
    assert.match(html, /hreflang="es"/);
    if (!route.includes('resume')) {
      assert.match(html, /href="#experience"/);
      assert.ok(html.includes(`href="${base}${es ? '' : 'es/'}" lang="${es ? 'en' : 'es'}"`));
    }
    for (const tag of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
      assert.match(tag[0], /rel="noopener noreferrer"/);
  });
}

test('all curated projects link to their public repositories', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  for (const project of projects)
    assert.ok(html.includes(`href="${profile.github}/${project.id}"`));
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
});
test('translations have complete, matching coverage', () => {
  assert.deepEqual(Object.keys(copy.en).sort(), Object.keys(copy.es).sort());
  for (const lang of ['en', 'es']) {
    for (const item of projects) assert.ok(item.title[lang] && item.text[lang]);
    for (const job of experience) assert.ok(job.role[lang] && job.description[lang]);
  }
});
test('experience has one current role and preserves the actual transition dates', () => {
  assert.equal(experience.filter((job) => !job.end).length, 1);
  assert.equal(experience[0].company, 'HashiCorp');
  assert.equal(experience[0].start, '2025-08');
  assert.equal(experience[1].end, '2025-09');
  assert.equal(profile.github, 'https://github.com/nikitastetskiy');
});
test('robots, sitemap and recovery page are deployed', async () => {
  assert.match(await readFile('dist/robots.txt', 'utf8'), /Sitemap:/);
  const sitemap = await readFile('dist/sitemap.xml', 'utf8');
  for (const route of routes) assert.ok(sitemap.includes(`${base}${route}</loc>`));
  assert.match(await readFile('dist/404.html', 'utf8'), /Current résumé/);
  await stat('dist/.nojekyll');
});

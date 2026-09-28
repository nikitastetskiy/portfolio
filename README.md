# Nikita Stetskiy's portfolio

[Live site](https://nikitastetskiy.github.io/) · [Español](https://nikitastetskiy.github.io/es/) · [CV (PDF)](https://nikitastetskiy.github.io/resume.pdf) · [Online résumé](https://nikitastetskiy.github.io/resume/)

A bilingual portfolio covering customer success engineering at HashiCorp, cloud architecture, and public technical projects. React provides navigation and the rotating hero text. Vite builds the site, and a build step renders every page to HTML so the content works without JavaScript or GitHub API requests.

## Run with Docker

Docker and Git are the only host requirements. Node and npm dependencies stay inside containers.

```sh
docker compose up --build -d web
```

Open [localhost:8000](http://localhost:8000). This serves the production build with nginx; build-time tests must pass before the image is created.

For live editing:

```sh
docker compose --profile dev up --build dev
```

Open [localhost:5173](http://localhost:5173). Source is mounted into the container; dependencies live in a named Docker volume. After changing package dependencies, refresh that volume with `docker compose --profile dev run --rm dev npm ci`.

Stop the services with `docker compose --profile dev down`.

## Content and behavior

- Edit English and Spanish copy, employment dates, skills, education and project links in [`app/src/personal-info/config.js`](app/src/personal-info/config.js).
- Page components are in [`app/src/App.jsx`](app/src/App.jsx); the original styles remain in [`app/src/scss`](app/src/scss) and [`app/src/App.css`](app/src/App.css). Selected project-card and certification improvements, lime accents, accessibility, language navigation and résumé printing live in [`app/src/enhancements.css`](app/src/enhancements.css).
- `/` and `/es/` are the portfolio pages. Their CV buttons open the approved one-page English PDF at `/resume.pdf`, sourced from `app/public/resume.pdf`. Replace that file with the final Overleaf export when updating the CV.
- `/resume/` and `/es/resume/` provide an online résumé using the same site data, with links to download the approved PDF or print the HTML version.
- Projects are curated public repositories. Add real examples and verified descriptions, without private client information or invented outcomes.
- Navigation supports keyboard focus and a mobile menu. Reduced-motion preferences stop the rotating text, gradient and starfield animations.
- Canonical URLs, language alternatives, structured data, robots.txt, a sitemap and a recovery page are generated at build time.

There are two runtime dependencies (React and React DOM). Vite, its React plugin, Bootstrap CSS and Sass are build dependencies. The original Bootstrap visual design, gradient, starfield and icon treatment are retained. The npm lockfile is committed.

## Build and test

```sh
docker build -f compose/Dockerfile --target export --output type=local,dest=build .
```

The build runs eight checks covering rendered content in both languages, résumé routes, asset and anchor links, metadata, project links, translation completeness and career dates. Output is written to `build/` without installing anything on the host. CI repeats these checks at the site root and under `/portfolio/`.

To update the lockfile, use Docker:

```sh
docker run --rm -v "$PWD/app:/app" -w /app node:24-alpine npm install --package-lock-only --ignore-scripts
```

## Publish

The source repository is `nikitastetskiy/portfolio`, branch `main`. The public site is served from `nikitastetskiy/nikitastetskiy.github.io`, branch `master`.

After reviewing and committing changes:

```sh
git push origin main
./scripts/publish.sh
```

The publish script builds and tests in Docker, clones the existing deployment branch, replaces generated files, records the source commit in `version.json`, and makes a normal Git push. It preserves custom-domain configuration and never force-pushes. GitHub Pages can take a few minutes to serve the new build.

`SITE_BASE` (default `/`) and `SITE_ORIGIN` (default `https://nikitastetskiy.github.io`) are Docker build arguments for deployments at another path or origin.

## License and acknowledgements

[GPL-3.0](LICENSE). Earlier versions drew on [Hashir Shoaib's Home](https://github.com/hashirshoaeb/home), [Travis Fischer's Starfield Animation](https://github.com/transitive-bullshit/react-starfield-animation), [Nathan Randecker's Particle](https://github.com/nrandecker/particle), [React Typist](https://github.com/jstejada/react-typist), [Typed.js](https://github.com/mattboldt/typed.js), and Bootstrap. The current site retains the original Bootstrap styling and particle model, with the animation lifecycle updated to browser APIs.

# Goo

A living profile. One link, two audiences: people see a beautiful page, AI agents see structured context.

This repo is the marketing site for Goo's early-access launch.

## Stack

- Plain `index.html` + React 18 via CDN, JSX compiled in the browser by `@babel/standalone`.
- No build step, no bundler, no `node_modules`. Just open `index.html`.
- Email capture via [Netlify Forms](https://docs.netlify.com/forms/setup/).

## Run locally

Either open `index.html` directly in a browser, or serve from the project root:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

A local server is recommended — opening `file://` works for most things but some browsers restrict `fetch('/')` and other behaviors over the `file://` protocol.

## Deploy

Pushing to `main` triggers a Netlify deploy automatically. There's no build command — Netlify just publishes the repo root. The build bot scans `index.html` for the `<form name="early-access">` block so it can register the form for submissions.

## Tweaks panel

There's a hidden design-tweaks panel (accent color, headline variant, density, type). It's off by default in production. To toggle it on:

```
https://your-site.example.com/?tweaks=1
```

## Performance notes

Because this site uses in-browser Babel to transform JSX on every page load, it's not optimized for production traffic. If you start to care about Lighthouse scores or first-paint time, migrate to a real bundler — [Vite](https://vitejs.dev) is the smallest jump and would let you keep the existing component structure largely intact.

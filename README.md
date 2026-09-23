# Philip Nordquist: projects and profile

Source for [philip.nordquist.me](https://philip.nordquist.me), a personal site whose main content is
finished side projects, each with a short write-up. A condensed resume lives at `/about`.

## The one rule

Only finished projects get published. A project is ready when it can honestly fill the write-up
template below: what it is, why it exists, a picture, and a way to try it or read the code. If a
project is too big for that, publish a finished slice of it instead of waiting for the whole thing.

## Adding a project

Create `src/content/projects/<slug>/+page.md`:

```md
---
title: 'Project name'
date: '2026-09-23' # the day it shipped; sorts the list
summary: 'One or two sentences. Shown on the card and as the page lead.'
tags:
  - TypeScript
cover: '/images/projects/<slug>/cover.jpg' # optional, 16:11 works best (e.g. 1600x1112)
coverAlt: 'What the cover shows'
liveUrl: 'https://…' # optional, renders "Try it"
repoUrl: 'https://github.com/…' # optional, renders "Source on GitHub"
published: true # anything else keeps it hidden and 404s the page
---

Why you built it, then a few short sections: how it works, what's in it, what you learned.
Aim for 150 to 400 words and one or two images.
```

Put images in `static/images/projects/<slug>/`. Projects without a `cover` get a typographic
placeholder card. The home page, `/projects/<slug>` and `sitemap.xml` pick the file up with no other
changes.

## Stack

- [SvelteKit 5](https://kit.svelte.dev/) with `adapter-auto`
- [mdsvex](https://mdsvex.pngwn.io/) for Markdown project pages, laid out by
  `src/routes/projects/project.svelte`
- [Shiki](https://shiki.style/) for code blocks
- Hand-written CSS in `src/app.css` (ivory/cobalt palette, dark mode via `prefers-color-scheme`),
  with Tailwind still available for utilities

## Structure

```
src/
├── content/projects/     # One directory per finished project (+page.md)
├── lib/
│   ├── components/       # Nav, Footer
│   ├── data/             # workHistory.js: profile, roles, skills, education for /about
│   ├── utils/            # projects.js (frontmatter loader), formatDate.js
│   └── site.js           # URL, name, email, social links, company footer details
└── routes/
    ├── +page.svelte      # Intro + project list
    ├── projects/         # [slug] pages and the mdsvex layout
    ├── about/            # Resume-style profile
    ├── philip/, posts/   # Redirects from old URLs
    └── sitemap.xml/
og-image/                 # HTML sources for the social image and generated project covers
resume/                   # Resume PDF import script
```

## Getting started

```
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Resume, OG image and generated covers

The resume PDF is maintained in the sibling `cv` project and imported unchanged:

```
npm run resume:sync                        # ../cv/dist/base.pdf -> static/files/pn_resume_26.pdf
npm run resume:sync -- /path/to/base.pdf   # explicit source
```

Update `src/lib/data/workHistory.js` separately when the resume content changes.

The social preview image and any HTML-drawn project covers are rendered with local headless Chrome:

```
npm run og-image:build
```

Add a cover to the `IMAGES` list in `og-image/build.mjs` to render it from `og-image/covers/`.

## Deployment

Builds via SvelteKit's `adapter-auto`. Cloudflare Web Analytics is wired into `src/app.html`.
Contract work is invoiced through CJP IT Consulting AB, which appears only in the footer.

## License

Copyright © 2026 Philip Nordquist. All Rights Reserved.

This project and its contents are proprietary and confidential. Unauthorized copying, transfer, or
reproduction of the contents of this project, via any medium, is strictly prohibited.

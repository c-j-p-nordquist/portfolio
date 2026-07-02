# Philip Nordquist's Personal Website

Source for [philip.nordquist.me](https://philip.nordquist.me) — a single-page resume site with a
fuller about page and a writing/projects section staged behind a feature gate until there's real
content to publish.

## Technologies Used

- [SvelteKit 5](https://kit.svelte.dev/) — framework, SSR, routing
- [TailwindCSS](https://tailwindcss.com/) — styling, with `@tailwindcss/typography` for post content
- [mdsvex](https://mdsvex.pngwn.io/) — Markdown-as-Svelte-components for posts/projects
- [Shiki](https://shiki.style/) — syntax highlighting for code blocks in posts

## Features

- Single-page resume: hero, work history, education, and a "day to day" summary, all driven by
  `src/lib/data/workHistory.js`
- Responsive layout with dark mode (`prefers-color-scheme`, no manual toggle)
- View transitions on navigation (falls back silently in unsupported browsers)
- A fuller `/about` page and a `/posts` writing section exist in the codebase but currently
  redirect to `/`: `/about` is hidden until there's a reason to split it out from the home page,
  and `/posts` auto-hides itself whenever every post in `src/content/posts` has
  `published: false` in its frontmatter — flip one to `true` and the section goes live with no
  other changes needed
- Resume PDF and Open Graph image are generated from HTML/CSS sources via headless Chrome rather
  than committed as opaque binaries — see [Regenerating the resume and OG image](#regenerating-the-resume-and-og-image)

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── components/    # Nav, Footer, JobEntry
│   │   ├── data/          # workHistory.js — the single source for experience/education
│   │   ├── utils/         # formatDate, readingTime, posts (frontmatter loader)
│   │   └── site.js        # SITE_URL / OG_IMAGE constants used across svelte:head blocks
│   ├── content/
│   │   └── posts/         # One directory per post/project, each a +page.md with frontmatter
│   ├── routes/
│   │   ├── +page.svelte   # Home (the live page)
│   │   ├── about/         # Fuller write-up; currently redirects to / (see Features)
│   │   └── posts/         # Writing/projects index + [slug] detail pages via mdsvex
│   ├── app.css
│   └── app.html
├── static/              # Images, robots.txt, resume PDF
├── resume/              # HTML/CSS source + build script for the downloadable resume PDF
├── og-image/            # HTML/CSS source + build script for the social preview image
└── svelte.config.js, tailwind.config.js, vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```
git clone https://github.com/c-j-p-nordquist/portfolio.git
cd portfolio
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Regenerating the resume and OG image

The downloadable resume and the social-share preview image are both built from HTML/CSS sources
using local, headless Chrome — no puppeteer/playwright dependency, and no binary committed without
a way to reproduce it:

```
npm run resume:build     # resume/resume.html   -> static/files/pn_resume_26.pdf
npm run og-image:build   # og-image/og-image.html -> static/images/og-image.png
```

Both scripts look for Chrome/Chromium in the usual install locations (see `CHROME_CANDIDATES` in
each `build.mjs` if yours lives elsewhere).

## Adding a post or project

Add a new directory at `src/content/posts/<slug>/+page.md` with frontmatter (`title`, `date`,
`type`, `summary`, `published`, etc. — see any existing post for the full shape). Posts with
`published: false` are excluded from the `/posts` index and 404 directly. Once at least one post
is published, `/posts` stops redirecting to `/` automatically.

## Deployment

Builds via SvelteKit's `adapter-auto`, which selects the appropriate adapter for the hosting
platform at build time. Cloudflare Web Analytics is wired into `src/app.html`.

## License

Copyright © 2026 Philip Nordquist. All Rights Reserved.

This project and its contents are proprietary and confidential. Unauthorized copying, transfer, or
reproduction of the contents of this project, via any medium, is strictly prohibited.

## Contact

Philip Nordquist — philip@nordquist.me

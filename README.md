# CJP IT Consulting AB — Company Site & Portfolio

Source for [philip.nordquist.me](https://philip.nordquist.me) — the company site for
CJP IT Consulting AB (services, how we work, contact) with Philip's personal resume/portfolio as a
secondary section at `/philip`, plus a writing/projects section staged behind a feature gate until
there's real content to publish.

## Technologies Used

- [SvelteKit 5](https://kit.svelte.dev/) — framework, SSR, routing
- [TailwindCSS](https://tailwindcss.com/) — styling, with `@tailwindcss/typography` for post content
- [mdsvex](https://mdsvex.pngwn.io/) — Markdown-as-Svelte-components for posts/projects
- [Shiki](https://shiki.style/) — syntax highlighting for code blocks in posts

## Features

- Company landing page at `/`: company introduction, services, engagement options, and contact, all driven by
  `src/lib/data/company.js` (services, copy, and the contact email live there)
- Single-page resume at `/philip`: summary, work history, technical skills, education, languages, and side projects, all
  driven by `src/lib/data/workHistory.js`
- One shared nav across the whole site (Services/Philip/Contact) so `/philip` reads as a page of
  the company site; the resume PDF download lives on that page's hero
- Responsive editorial design with an ivory/cobalt palette, direct service descriptions, and dark mode (`prefers-color-scheme`, no manual toggle)
- Visible service capabilities and expandable career contributions, keyboard focus indicators, a skip link, and reduced-motion support
- View transitions on navigation (falls back silently in unsupported browsers)
- A fuller `/about` page and a `/posts` writing section exist in the codebase but are currently
  hidden: `/about` redirects to `/philip` until there's a reason to split it out,
  and `/posts` auto-hides itself whenever every post in `src/content/posts` has
  `published: false` in its frontmatter — flip one to `true` and the section goes live with no
  other changes needed
- The downloadable resume is imported unchanged from the base PDF in the sibling `cv` project.
  Open Graph images are generated from HTML/CSS via headless Chrome — see
  [Updating the resume and OG images](#updating-the-resume-and-og-images)
- `sitemap.xml` is generated at build time from the page list and published posts

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── components/    # Nav, Footer, JobEntry
│   │   ├── data/          # company.js (services/contact) + workHistory.js (experience/education)
│   │   ├── utils/         # formatDate, readingTime, posts (frontmatter loader)
│   │   └── site.js        # SITE_URL / OG_IMAGE constants used across svelte:head blocks
│   ├── content/
│   │   └── posts/         # One directory per post/project, each a +page.md with frontmatter
│   ├── routes/
│   │   ├── +page.svelte   # Company landing page (CJP IT Consulting AB)
│   │   ├── philip/        # Philip's resume/portfolio page
│   │   ├── about/         # Fuller write-up; currently redirects to /philip (see Features)
│   │   └── posts/         # Writing/projects index + [slug] detail pages via mdsvex
│   ├── app.css
│   └── app.html
├── static/              # Images, robots.txt, resume PDF
├── resume/              # Resume import script + legacy HTML source (no longer used)
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

## Selected design

Ivory (A) is the selected design at `/` and `/philip`. The comparison switcher is removed.
The previous `/b` and `/b/philip` URLs redirect to their Ivory counterparts. The unused B source
is retained for reference, but its stylesheet and shell are no longer loaded by the site.

Use `npm run dev -- --host 127.0.0.1 --port 5180 --strictPort` for the local preview without
using the game's port.

## Updating the resume and OG images

The authoritative resume is maintained in the sibling `cv` project. The current personal page
was updated from `cv/dist/base.pdf`, supplied on 2026-09-17. Import that PDF unchanged:

```
npm run resume:sync                           # ../cv/dist/base.pdf -> static/files/pn_resume_26.pdf
npm run resume:sync -- /path/to/base.pdf       # explicit source
```

`resume:build` remains an alias for this import. The older `resume/resume.html` is retained for
reference and is no longer used to generate the download. A missing or invalid source fails
without replacing the existing PDF. Update `src/lib/data/workHistory.js` separately when the
resume content changes; this holds the profile summary, roles, skills, projects, and languages.

Social-share preview images are generated from HTML/CSS using local headless Chrome:

```
npm run og-image:build   # og-image/og-company.html -> static/images/og-company.png
                         # og-image/og-philip.html  -> static/images/og-philip.png
```

The OG build script looks for Chrome/Chromium in the usual install locations.

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

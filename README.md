# Philip Nordquist's Personal Website

This repository contains the source code for Philip Nordquist's personal website, showcasing projects, blog posts, and professional information in the field of DevOps and Software Engineering.

## Technologies Used

- [SvelteKit 5](https://kit.svelte.dev/): Frontend framework
- [TailwindCSS](https://tailwindcss.com/): Utility-first CSS framework
- [DaisyUI](https://daisyui.com/): Tailwind CSS component library
- [FlexSearch](https://github.com/nextapps-de/flexsearch): Full-text search library

## Features

- Responsive design with dark mode support
- Project showcase with filterable tags
- Blog with searchable posts and tag categorization
- Universal search functionality using a modal dialog
- Server-side rendering for improved SEO
- Web worker for non-blocking search operations

## Project Structure

```
.
├── src/
│   ├── lib/
│   │   ├── components/       # Reusable Svelte components
│   │   ├── data/             # Static data and blog posts
│   │   └── utils/            # Utility functions and helpers
│   ├── routes/               # SvelteKit routes and page components
│   │   ├── api/              # API routes for search and posts
│   │   ├── blog/             # Blog-related routes and components
│   │   └── projects/         # Project showcase route
│   ├── app.css               # Global styles
│   └── app.html              # HTML template
├── static/                   # Static assets
├── svelte.config.js          # SvelteKit configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── vite.config.js            # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Key Components

- `Nav.svelte`: Main navigation component with integrated search functionality
- `SearchModal.svelte`: Universal search modal using DaisyUI and the `<dialog>` element
- `ProjectCard.svelte`: Reusable component for displaying project information
- `+layout.svelte`: Main layout component that wraps all pages
- `+layout.server.js`: Server-side logic for initializing search index and handling global data
- `api/search/+server.js`: API endpoint for search functionality
- `api/posts/+server.js`: API endpoint for retrieving blog posts
- `utils/search.js`: Utility functions for search operations
- `utils/posts.js`: Utility functions for handling blog posts

## Search Functionality

The search feature uses FlexSearch for efficient full-text search capabilities. The search index is created server-side and used client-side for fast, responsive searching. A web worker (`search-worker.js`) is employed to prevent blocking the main thread during search operations.

## Blog System

Blog posts are stored as HTML files in `src/lib/data/posts/`. The blog system supports:
- Server-side rendering of posts
- Tag-based categorization
- Reading time estimation
- Fuzzy search within blog content

## Deployment

[Add information about your deployment process here, e.g., hosting platform, CI/CD setup]

## License

Copyright © 2024 Philip Nordquist. All Rights Reserved.

This project and its contents are proprietary and confidential. Unauthorized copying, transfer, or reproduction of the contents of this project, via any medium, is strictly prohibited.

## Contact

Philip Nordquist - philip@nordquist.me


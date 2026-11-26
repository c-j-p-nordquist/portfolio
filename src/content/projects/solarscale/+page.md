---
title: 'Solarscale'
date: '2026-11-26'
summary: 'A 3D model of the Solar System in the browser, built by five Gemini 4 Neon agents working in parallel in Antigravity and deployed to Cloudflare Workers through the Cloudflare MCP server.'
kind: 'Swarm-built 3D web app'
pitch: 'A 3D Solar System you can switch from a readable overview to true scale, where the planets turn into specks. I mainly built it to try a full agent workflow: five agents in Antigravity built and tested it in parallel, and the Cloudflare MCP server set up hosting and deploys from GitHub.'
stats:
  - value: '5'
    label: 'specialist swarm agents'
  - value: '4'
    label: 'scale modes (up to 1:1)'
  - value: '0'
    label: 'external texture files'
tags:
  - TypeScript
  - Three.js
  - AI agents
  - MCP
  - Cloudflare Workers
cover: '/images/projects/solarscale/cover.jpg'
coverAlt: 'A 3D view of the Solar System with the Sun at the centre, planets along glowing orbits, an asteroid belt, scale-mode controls at the top and an Earth info card on the right'
liveUrl: 'https://solarscale.philip-bd6.workers.dev'
repoUrl: 'https://github.com/c-j-p-nordquist/solarscale'
published: true
---

Solarscale is a 3D model of the Solar System that runs in the browser. You can move between an overview that is easy to browse and a 1:1 view with real sizes and distances, where the planets are hard to find at all.

I was as curious about how it got built as about the result. Instead of one long conversation with a single agent, I used Gemini 4 Neon in Antigravity's Swarm mode, then deployed it to Cloudflare with the Cloudflare MCP server instead of the dashboard.

## Five agents in parallel

In Swarm mode a coordinator splits the project into parts, gives each part its own files and starts one agent per part. The agents share a message board. For Solarscale there were five:

- **Scaffold and data.** The Vite and TypeScript project, shared types and a dataset of diameters, orbital periods, axial tilts, moons and everyday comparisons of scale.
- **Textures.** Planet surfaces, clouds, rings and the Sun's surface, drawn at runtime on offscreen `<canvas>` elements. The app has no image files for textures.
- **Scene and camera.** The Three.js scene with the asteroid belt and orbits, camera movement between planets and the maths for each scale mode.
- **Interface.** Mode bar, time speed, toggles for orbits, labels and axes, a planet picker and an info card for each planet.
- **Testing.** Once the build passed, this agent opened the app in a real browser, went through every mode and planet, looked for console and WebGL errors and took screenshots.

Giving each agent its own files meant they rarely got in each other's way. The testing agent found camera and layout problems that `tsc && vite build` would not have caught.

## Deploying through Cloudflare MCP

The app is hosted the same way as my other browser projects. Vite builds to `dist/`, `wrangler.jsonc` serves it as static assets with a single-page-app fallback and no Worker script, `.node-version` pins Node 22 and `public/_headers` caches the hashed files under `/assets/` for good while `index.html` is always revalidated.

From the same agent session, the Cloudflare MCP server looked at how my existing Workers are set up, created the `solarscale` Worker, connected the GitHub repository to Workers Builds so every push to `main` deploys and then checked the live site.

## Scale modes

- **Explorer.** A readable overview with planets enlarged and orbits pulled in.
- **True Size.** Real relative diameters on compact orbits.
- **True Scale.** Real sizes and real distances.
- **Compare.** Planets side by side by size.

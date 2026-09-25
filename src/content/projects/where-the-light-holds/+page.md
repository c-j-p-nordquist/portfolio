---
title: 'Where the Light Holds'
date: '2026-09-25'
summary: 'A maze tower-defense for desktop browsers, inspired by the Warcraft III custom tower-defense maps. It runs in the browser with no install or account.'
tags:
  - TypeScript
  - Canvas
  - Game
cover: '/images/projects/where-the-light-holds/cover.jpg'
coverAlt: 'A wave of dark foes with pale eyes walking the path past a violet tower light on The Moor'
liveUrl: 'https://where-the-light-holds.philip-bd6.workers.dev'
published: true
---

You build a maze out of firepots, which foes won't cross, and place towers whose lamplight is their reach. Foes avoid light when they can, so where you put light shapes their path. There are 30 waves, nine towers and one map, The Moor.

The look is dusk fog with towers as lights in the dark. A light's colour shows its damage type, and foes are dark silhouettes with pale eyes.

## Under the hood

- TypeScript, Vite and Preact
- Canvas 2D rendering
- A deterministic simulation with unit tests
- Procedural sound with WebAudio
- Deployed as a static site on Cloudflare Workers

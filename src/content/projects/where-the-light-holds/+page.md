---
title: 'Where the Light Holds'
date: '2026-09-25'
summary: 'A maze tower-defense for desktop browsers that is easy to get started with. No install or account, and the next wave only starts when you send it.'
kind: 'A game for desktop browsers'
pitch: 'I wanted a tower defense I could leave open beside other work, so there is no clock. You build a maze out of firepots, some foes jump it and some fly over it, and the next wave only starts when you send it.'
stats:
  - value: '40'
    label: 'waves in 5 chapters'
  - value: '9'
    label: 'towers'
  - value: '4'
    label: 'maps'
tags:
  - TypeScript
  - Canvas
  - Game
cover: '/images/projects/where-the-light-holds/cover.jpg'
coverAlt: 'A green moor seen from above, with rows of firepots forming a maze, towers beside the lanes and a line of dark foes walking through it'
liveUrl: 'https://where-the-light-holds.philip-bd6.workers.dev'
published: true
---

<script>
	import LightHoldsDemo from '$lib/components/projects/LightHoldsDemo.svelte';
</script>

I wanted a tower defense game for myself, something easy to get started with that I could play in a browser on the side while doing other work. So there is no clock. You decide when the next wave starts, and you can leave the game sitting between waves for as long as you like.

You build a maze out of firepots and place towers along it. Foes take the shortest way to your hall, so a longer road gives your towers more time. Then the game starts bending that rule. Hounds jump over firepots and only a tower stops them. Wraiths fly straight to the hall, where catapults can't reach them.

There are 40 waves in five chapters, nine towers and four maps. Each chapter brings in one new idea, mixes it with everything before it, and ends with a boss built around that idea.

<LightHoldsDemo />

The first version was set at night, and foes avoided the light of your towers. It looked good but played badly: the towers needed foes close, and the rule pushed them away. I replaced it with a daylight board that is easier to read, and with the jumpers and flyers.

## Under the hood

- TypeScript, Vite and Preact
- Canvas 2D rendering
- A deterministic simulation with unit tests
- Procedural sound with WebAudio
- Deployed as a static site on Cloudflare Workers

---
title: 'Where the Light Holds'
date: '2026-09-25'
summary: 'A maze tower defense game for desktop browsers. There is no install, account or timer between waves: you build the maze at your own pace and send the next wave when you are ready.'
kind: 'Game for desktop browsers'
pitch: 'A tower defense game made to sit open beside other work. There is no clock: you build a maze out of firepots, some foes jump it and some fly over it, and the next wave only starts when you send it.'
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
	import LightHoldsDemo from '#lib/components/projects/LightHoldsDemo.svelte';
</script>

I made this game for myself: something quick to pick up that I could keep open in a browser tab alongside other work. Between waves the board sits still for as long as you like, so you can lay out a maze, step away and send the next wave when you come back.

You build the maze out of firepots and place towers along it. Foes take the shortest path to your hall, so a longer road gives your towers more time to work. Later chapters start bending that rule: hounds jump over firepots unless a tower blocks them, and wraiths fly straight to the hall where catapults can't reach them.

There are 40 waves in five chapters, nine towers and four maps. Each chapter brings in one new idea, mixes it with everything before it and ends with a boss built around that idea.

<LightHoldsDemo />

The first version was set at night, and foes avoided the light of your towers. It looked good but played badly: the towers needed foes close, and the rule pushed them away. I replaced it with a daylight board that's much easier to read, and used jumpers and flyers to keep the pathfinding interesting.

## Under the hood

- TypeScript, Vite and Preact
- Canvas 2D rendering
- A deterministic simulation with unit tests
- Procedural sound with WebAudio
- Deployed as a static site on Cloudflare Workers

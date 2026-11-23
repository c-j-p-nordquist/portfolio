---
title: 'Trading Co-Pilot'
date: '2026-11-23'
summary: 'A background service that watches my Interactive Brokers positions, sector rotation and overnight futures, sends short Slack messages to my phone when something needs a decision and stages orders in IBKR Mobile for me to approve.'
kind: 'Phone-first trading assistant'
pitch: "A service on my Mac that watches my open positions and the wider market so I don't have to watch a screen. When a level breaks it sends a short message to my phone, and if a trade makes sense it stages the order in IBKR Mobile for me to approve or ignore."
stats:
  - value: '11'
    label: 'sectors tracked for rotation'
  - value: '5'
    label: 'views in the desktop app'
  - value: '0'
    label: 'orders it can send on its own'
tags:
  - Python
  - Slack
  - Interactive Brokers
  - AI agents
cover: '/images/projects/trading-copilot/cover.png'
coverAlt: 'A phone showing a short message about a position testing resistance, with buttons to ask for a second opinion or review a staged order'
published: false
---

This started as an SPX signal bot. It read the S&P 500 option chain, worked out where dealers' gamma exposure was likely to pin or push the index and posted paper signals to Slack. Over a few weeks it grew into a desktop terminal with live charts, option chains and one-click trading. That made me watch screens more, which was the opposite of what I wanted from it.

So I turned it around. The heavy lifting now runs in the background, and the place I meet it is a Slack thread on my phone.

## Numbers first, words second

The service has two layers. The first is plain Python that runs on a schedule and computes everything: support and resistance from swing points, moving averages, VWAP and the gamma levels from the original bot. It also follows each open position through a small state machine: monitoring, testing a level, then either rejected or broken out.

Only when that layer finds something does a language model get involved. It gets a packet of verified numbers, decides whether the trigger is worth a message at all and writes two to five sentences: what happened, why it matters, what I could do and what it is watching next. Most triggers end there without a message.

## What it watches

- **Open positions.** A heads-up when a position tests a level, and a follow-up only when the level clearly holds or breaks.
- **Sector rotation.** All 11 S&P sectors, sorted by whether a move is early, healthy or already crowded. Crowded sectors are kept out of new long ideas, so it doesn't suggest chasing a rally that is mostly done.
- **New setups** on a short focus list, with the structure picked to fit: a debit or credit spread, a single option or shares.
- **Overnight.** Futures, oil, gold, the dollar, USD/SEK and bitcoin at a slower pace outside US hours, with a summary at 06:00 Swedish time.

I can reply in any thread from my phone, for example to ask a question or to move a stop level, and the service picks it up.

## Orders stay with me

Orders go through Interactive Brokers' own MCP connector. The agent is allowed to read positions, quotes and option chains and to create an order instruction, which appears in IBKR Mobile waiting for review. Submitting, changing and cancelling orders are blocked in the agent's permissions, so a trade only happens when I tap approve on the phone.

Using the connector also means no local TWS or IB Gateway has to be logged in, which used to kick my phone session out.

## A second opinion

On any message I can ask for a second opinion. A separate model runs with no tools and only the thread as context, and its job is to argue against the idea. It answers agree, modify or pass with its strongest objection, and the co-pilot replies with where the two agree and where they don't.

## The desktop side

For planning and review there is a small macOS app with five views: today's watches and sector grid, the portfolio with Greeks and payoff curves, the watchlist and trade ideas, a journal filled in automatically from executions, and progress against my own risk rules. It is meant for the weekend, not for watching the market tick.

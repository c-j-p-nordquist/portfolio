---
title: 'Trading Co-Pilot'
date: '2026-11-23'
summary: 'A headless AI agent daemon that watches my Interactive Brokers positions, sector rotation and overnight futures, talks to me in stateful Slack threads, red-teams ideas with a second model and stages orders via MCP for mobile approval.'
kind: 'Phone-first AI trading agent'
pitch: "A service on my Mac that pairs deterministic market math with headless AI agents over MCP. Plain Python watches levels, sector rotation and overnight futures; when something matters, an agent checks live broker data, decides whether to message my phone on Slack, and stages an order in IBKR Mobile for me to approve or challenge with a second model."
stats:
  - value: '2'
    label: 'models (primary + red-team)'
  - value: '2'
    label: 'MCP servers (broker + account)'
  - value: '0'
    label: 'orders it can send on its own'
tags:
  - Python
  - AI agents
  - MCP
  - Slack
  - Interactive Brokers
cover: '/images/projects/trading-copilot/cover.png'
coverAlt: 'A phone showing a short message about a position rejecting resistance, with buttons to ask for a second opinion or review a staged order'
published: true
---

This started as an SPX signal bot. It read the S&P 500 option chain, worked out where dealers' gamma exposure was likely to pin or push the index and posted paper signals to Slack. Over a few weeks it grew into a desktop terminal with live charts, option chains and one-click trading. That made me watch screens more, which was the opposite of what I wanted from it.

So I turned it around. The heavy lifting now runs as a background agent daemon, and the place I meet it is a Slack thread on my phone.

## Deterministic math, structured agent judgement

The service separates calculation from judgement into two layers. The first is plain Python running on a market-aware schedule: it clusters support and resistance from swing points, moving averages, VWAP and gamma walls, computes Black-Scholes Greeks and option spreads, checks headlines and macro events, and tracks each open position through a small state machine (`monitoring`, `testing`, then `rejected` or `broken out`).

Only when that layer trips does a language model wake up. Rather than wrapping a raw chat API, the daemon drives a headless agent CLI with strict JSON schemas (`--json-schema`) and tiered reasoning effort — higher for briefings and trade decisions, lighter for quick thread replies and broker syncs. Every trigger passes through an explicit decision gate (`notify_and_stage`, `notify_only` or `veto_silent`). Noisy triggers are dropped silently; real ones become two to five plain sentences: what happened, why it matters, what I could do and what it is watching next. If the agent CLI is ever unreachable, critical stop and exit alerts fall back to deterministic prose so nothing important disappears.

## Stateful Slack threads and MCP tools

Every alert, briefing and position watch stores its Slack `thread_ts` alongside the agent's `conversation_id` in SQLite. Replying from my phone hours later resumes that exact agent session instead of starting cold. The reply schema also carries structured `watch_mutations`, so saying *"move my stop to 264"* or *"snooze this today"* updates the live Python watchers directly without a command syntax.

Under the hood, the agent has live access to two MCP servers:

- **Interactive Brokers' official MCP** for pulling live quotes, option chains, Greeks, earnings and positions on demand — which also removes the need to keep TWS or IB Gateway logged in locally (and stops it kicking out my mobile session).
- **My own `account-command-os` MCP server**, exposing the same portfolio briefing, journal, playbooks, GEX scans and what-if simulator so IDE chat agents share the exact same account state.

Multi-step procedures, like verifying live bid/ask spreads before staging a ticket, live in reusable skill files rather than being stuffed into every prompt.

## Permission-enforced staging

Safety isn't left to prompt instructions alone. The agent's CLI permission policy allows read tools plus `create_order_instruction` — which queues a draft waiting for review in IBKR Mobile — and explicitly denies `submit_order`, `modify_order`, `cancel_order` and `delete_order_instruction`. Even if a model tried to execute directly, the tool call is blocked before it leaves the machine.

## Two-model adversarial red-teaming

On any alert or thread I can tap *Second opinion* or ask for one in prose. That spawns a second model (Claude) strictly toolless (`--tools ""`), given only the Slack thread, structured trigger context and a portfolio snapshot. Its single job is to argue against the primary model — hunting for hidden correlation, IV/earnings traps or late-stage crowding — and return `AGREE`, `MODIFY` or `PASS` with its sharpest objection. The primary agent then weighs that pushback and replies in one short message showing where the two models agree and where they diverge.

## What the watchers feed it

- **Open positions.** A heads-up when a position tests a level, and a follow-up only when the level clearly holds or breaks.
- **Sector rotation.** All 11 S&P sectors sorted into early inflection, healthy trend, base-building or crowded late rallies — crowded sectors are kept out of new long ideas.
- **New setups** on a short focus list, picking the structure to fit liquidity and account size: a debit or credit spread, a single option or shares.
- **Overnight.** Globex futures, oil, gold, DXY, USD/SEK and bitcoin at a slower cadence outside US hours, plus a morning summary at 06:00 Swedish time.

## The desktop side

For weekend planning and review there is a small macOS app with five views: today's watches and sector grid, the portfolio with Greeks and payoff curves, the watchlist and trade ideas, a journal filled in automatically from executions, and progress against my own risk rules. It is meant for the weekend, not for watching the market tick.

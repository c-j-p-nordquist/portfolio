---
title: 'Trading Co-Pilot'
date: '2026-11-23'
summary: 'A service on my Mac that watches my Interactive Brokers positions, sector rotation and overnight futures, messages me on Slack when something needs a decision and stages orders in IBKR Mobile for me to approve.'
kind: 'Phone-first AI trading agent'
pitch: 'Plain Python watches my positions, sector rotation and overnight futures. When something matters, an AI agent checks live data from my broker, decides whether it is worth a message on my phone and can stage an order in IBKR Mobile. I approve it, ignore it or ask a second model to argue against it.'
stats:
  - value: '2'
    label: 'models, one as a critic'
  - value: '2'
    label: 'MCP servers'
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

So I turned it around. Most of the work now happens in the background, and I deal with it in Slack threads on my phone.

## Python does the maths, the agent decides

The first layer is plain Python on a schedule that follows market hours. It finds support and resistance from swing points, moving averages, VWAP and gamma levels, prices option spreads with Black-Scholes, checks headlines and macro events and follows each open position through a small state machine: `monitoring`, `testing`, then `rejected` or `broken out`.

A language model only gets involved when that layer finds something. The service runs an agent CLI headless and asks for a reply that fits a JSON schema, so it can act on the result without parsing prose. Each trigger ends in one of three decisions: `notify_and_stage`, `notify_only` or `veto_silent`. Most are vetoed. The rest become two to five sentences about what happened, why it matters, what I could do and what it is watching next.

If the agent is unavailable, stop breaches and exit signals still go out as plain templated text, and everything else waits.

## Threads that remember

Each message stores its Slack thread together with the agent's conversation ID. When I reply hours later, the agent picks up the same conversation instead of starting from nothing. Replies can also change the watchers, so "move my stop to 264" or "snooze this today" updates the Python side directly.

The agent can call two MCP servers:

- **Interactive Brokers' own MCP** for quotes, option chains, earnings and positions. Using it means I no longer need TWS or IB Gateway logged in on the Mac, which used to log me out of IBKR Mobile.
- **My own `account-command-os` server**, which exposes the portfolio, journal, playbooks, gamma scans and a what-if simulator. Coding agents in my editor use the same server, so they see the same account state.

Longer procedures, such as checking live bid and ask before staging an order, are kept in skill files rather than repeated in every prompt.

## Orders are staged, never sent

The agent's permission file allows read tools and `create_order_instruction`, which puts a draft order in IBKR Mobile waiting for my review. `submit_order`, `modify_order`, `cancel_order` and `delete_order_instruction` are denied. A model that tries to place a trade gets the call blocked before it leaves the machine.

## A second opinion

On any message I can ask for a second opinion. That runs Claude with no tools at all, given only the thread, the trigger and a snapshot of the portfolio. Its job is to argue against the idea, for example by pointing out correlation with what I already hold, an earnings date or a crowded sector. It answers `AGREE`, `MODIFY` or `PASS` with its main objection. The first model then replies once, saying where the two agree and where they don't.

## What it watches

- **Open positions.** A heads-up when a position tests a level, and a follow-up only when the level clearly holds or breaks.
- **Sector rotation.** All 11 S&P sectors, sorted into early turns, healthy trends, bases and crowded late rallies. Crowded sectors are left out of new long ideas.
- **New setups** on a short focus list, with the structure chosen to fit liquidity and account size: a debit or credit spread, a single option or shares.
- **Overnight.** Futures, oil, gold, the dollar index, USD/SEK and bitcoin at a slower pace outside US hours, and a summary at 06:00 Swedish time.

## The desktop side

For planning and review there is a small macOS app with five views: today's watches and sector grid, the portfolio with Greeks and payoff curves, the watchlist and trade ideas, a journal filled in from executions and progress against my own risk rules. I use it at weekends, not to watch the market move.

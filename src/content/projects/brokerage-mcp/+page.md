---
title: 'Brokerage MCP server'
date: '2026-05-07'
summary: 'An MCP server that lets AI agents review an Interactive Brokers account and prepare orders, with dry-run previews, an audit log and human approval before anything trades.'
tags:
  - Python
  - MCP
  - AI agents
cover: '/images/projects/brokerage-mcp/cover.png'
coverAlt: 'An agent session in demo mode: a portfolio check, position sizing, and a dry-run bracket order waiting for approval'
repoUrl: 'https://github.com/c-j-p-nordquist/ai-brokerage-mcp'
published: true
---

I wanted to use Claude and Codex for portfolio reviews without handing a language model the keys to a brokerage account. The Interactive Brokers API is large, and exposing it one endpoint per tool gives an agent too many ways to do the wrong thing. So I built a small MCP server with an opinionated tool surface instead.

## Small tools, clear boundaries

Twelve tools map to workflows rather than endpoints. `portfolio` returns the account context an agent needs before suggesting anything. `position_size` does advisory risk sizing from account value, stop distance and exposure. `submit_order` returns a dry-run bracket preview by default.

Multi-step judgement lives in the client's prompts and skills. The server's job is to enforce the boundaries.

## Safety model

- Demo mode is the default, with synthetic account, market and option data, so anyone can try it without broker credentials
- Orders are dry-run previews unless live mode and live trading are both explicitly switched on
- Every mutating action is written to a local SQLite audit log
- Live submit, cancel and modify are designed to sit behind a human approval step

## Try it

It runs in demo mode out of the box:

```bash
uv sync
AGENTIC_BROKERAGE_MCP_BROKER_MODE=demo uv run agentic-brokerage-mcp
```

The public repo is extracted from a larger private project, without the agent daemon, backtesting code and personal settings.

## Then the official one arrived

Interactive Brokers has since released an official connector, which covers most of what I built this for. The parts I'd still carry into any agent that can move money are the ones this project was really about: preview first, keep an audit trail, and keep the tool surface narrow.

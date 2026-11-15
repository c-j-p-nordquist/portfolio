---
title: 'Brokerage MCP server'
date: '2026-05-07'
summary: 'An MCP server that lets AI agents review an Interactive Brokers account and prepare orders, with dry-run previews, an audit log and human approval before anything trades.'
kind: 'MCP server'
pitch: 'Built so an AI agent can help review an Interactive Brokers account without being able to place trades on its own. The agent can read positions, size risk and stage orders, and nothing is sent until a human approves it.'
tags:
  - Python
  - MCP
  - AI agents
cover: '/images/projects/brokerage-mcp/cover.png'
coverAlt: 'An agent session in demo mode: a portfolio check, position sizing and a dry-run bracket order waiting for approval'
repoUrl: 'https://github.com/c-j-p-nordquist/ai-brokerage-mcp'
published: true
---

<script>
	import BrokerageMcpDemo from '$lib/components/projects/BrokerageMcpDemo.svelte';
</script>

I wanted to use Claude and Codex for portfolio reviews without handing a language model the keys to a brokerage account. The Interactive Brokers API is large, and exposing it one endpoint at a time gives an agent too many ways to do the wrong thing. So I built a small MCP server around a fixed set of workflows instead.

## The tools

There are twelve tools, each covering one workflow. `portfolio` returns the account context an agent needs before suggesting anything. `position_size` calculates position size from account value, stop distance and current exposure. `submit_order` stages a bracket order and returns a dry-run preview by default.

Multi-step judgement is left to the client's prompts and skills. The server only enforces the limits.

<BrokerageMcpDemo />

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

Interactive Brokers has since released an official connector, which covers most of what I built this for. I'd still do three things the same way in any agent that can move money: preview first, keep an audit trail and keep the list of tools short.

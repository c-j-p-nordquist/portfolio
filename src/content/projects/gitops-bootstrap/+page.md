---
title: 'Hardened GitOps bootstrap'
date: '2026-11-15'
summary: 'A Go CLI that installs Argo CD on a Kubernetes cluster from a lock file where every image is pinned by digest and verified against its upstream signer, then audits the live cluster against a hardening baseline.'
kind: 'CLI for Kubernetes'
pitch: 'Hardening a new Kubernetes cluster usually gets left for later. This CLI does it at install time: it sets up Argo CD from signature-verified images, only applies a plan you approved by its hash, and then audits the live cluster and reports what still fails.'
stats:
  - value: '6'
    label: 'components pinned'
  - value: '17/18'
    label: 'images signature-verified'
  - value: '3/6'
    label: 'baseline checks passing'
tags:
  - Go
  - Kubernetes
  - Argo CD
  - Supply chain
cover: '/images/projects/gitops-bootstrap/cover.png'
coverAlt: 'A terminal showing the audit of a freshly installed cluster: three checks pass and three fail'
repoUrl: 'https://github.com/c-j-p-nordquist/argocd-kargo-deploy'
published: true
---

Setting up GitOps on a new cluster usually starts the same way: install Argo CD from a chart, trust whatever images it pulls and promise to harden it later. I wanted a tool that does that first hour properly and shows its work.

This is the first finished slice of a larger toolkit. The plan is a full platform with Kargo, Kyverno, cert-manager and External Secrets Operator. Today it installs Argo CD and audits the result.

## What gets verified

Every chart and image is pinned by digest in a lock file, and each image is verified when the lock is generated. Upstreams sign in different ways, so the lock records which method applies: keyless cosign signatures for Argo CD, Dex, Kargo and External Secrets Operator, signed SLSA provenance for Kyverno, and a pinned long-lived key for cert-manager. Redis publishes nothing to verify, so the lock marks it as unverified rather than hiding it.

Charts are rendered once into plain manifests that live in the repository, so Helm isn't needed at install time and an upgrade is a diff you can read. A release has to be 14 days old before the tool will adopt it.

## Installing with a coding agent

The installer never prompts interactively. It prints its questions as structured data, with the security consequence of each option, so you can work through them with a coding agent. Picking an option that weakens the baseline requires a written acknowledgement.

Those answers produce a plan with a content hash. `apply` only accepts that hash, refuses the plan if any file changed after you approved it and makes you name the cluster explicitly.

## The audit

`verify` checks the live cluster and names the guidance each check comes from. After a fresh install:

```
PASS    Every running image is the one pinned in the component lock
PASS    Platform namespaces enforce the restricted Pod Security Standard
PASS    No platform service is exposed outside the cluster
FAIL    Platform namespaces deny all traffic by default
FAIL    Argo CD's built-in admin account is disabled
FAIL    Argo CD's default project allows nothing

3 of 6 checks passed.
```

The three failing checks are parts of the baseline the installer doesn't configure yet. Rather than leaving them out until they pass, the audit checks the full baseline from day one so the remaining gaps stay visible.

## Try it

This starts a throwaway k3s cluster in a container, installs Argo CD on it and runs the audit:

```bash
docker compose --profile e2e up -d --wait k3s
docker compose --profile e2e run --rm --build e2e-install
```

Next up: closing those three gaps, and letting Argo CD install the rest of the platform from Git.

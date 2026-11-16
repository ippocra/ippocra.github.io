---
title: "Bilbo: the sentinel on the mountain — a security system that never sleeps"
categories: security, ilai, automation
excerpt: "Every day someone publishes a vulnerability in your dependencies. Bilbo is the sentinel: it scans, proposes, verifies. And when the work goes beyond the deterministic, ILAI takes over."
permalink: /bilbo-the-sentinel-on-the-mountain
lang: en
description: "Bilbo: the deterministic process that runs daily, opens PRs, verifies tests, and logs everything in an immutable log. With ILAI, the system never blocks."
keywords: Bilbo, security sentinel, dependency security, CVE automated patching, ILAI, local security, audit trail, software vulnerabilities, autonomous patching, security for SMBs, vulnerability management, open source security, local AI security, software supply chain security
page_id: bilbo-sentinel
header:
    teaser: /assets/images/screenshots/bilbo-sentinel-cover.webp
classes: wide
tags: ilai, privacy
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/bilbo-sentinel-cover.webp" alt="Bilbo — The Watcher. A sentinel on top of a mountain peak, gazing at the horizon. The Ippocra logo in the corner." style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.9rem;">
  The sentinel does not sleep. It does not come down from the mountain. It does not ask for permission. It watches the horizon. And when it sees something, it does what it must: flags, proposes, verifies. And when morning comes, the valley is safer than it was.
</p>

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/fVBWs3PvCbE" title="Bilbo — the sentinel that never sleeps" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
</div>

Every piece of software in production is built on thousands of third-party libraries. And every day, somewhere, someone publishes a vulnerability in one of them. A CVE. A number. A door that stays open until you close it.

Patching is no longer a human decision. It's a process. And the gap between "vulnerability published" and "your server is patched" is exactly where the damage happens.

Bilbo is the sentinel. It stands on the mountain. It watches the horizon. And when it sees something, it acts.

## What Bilbo does on its own

Bilbo is deterministic software. It does not reason. It does not improvise. It does the same five things, in the same order, every time. And it does them well.

**1. It watches.** It scans your services' dependencies against the public vulnerability database (OSV) and the list of actively exploited vulnerabilities (CISA KEV). It doesn't scan at random: a CVE is relevant only if the package is declared as a dependency **and** the version you're using is actually in the vulnerable range. No false positives from transitive dependencies you never reach.

**2. It decides what matters.** It uses the real CVSS score. It assigns a severity: critical, high, medium, low. Not a made-up score. The score the CVE carries.

**3. It proposes.** It opens a PR. Not a ticket, not an email, not a "to do." A pull request with the lockfile bump, the advisory document, the severity, and the rationale. A PR that a human can read, approve, or reject.

**4. It verifies.** It runs the repository's tests — the repository's own tests, not its. It finds the test command from the CI, the documentation, the Makefile. It runs everything. If the tests are green, it opens the PR. If they're red, it opens nothing. **The PR is the output of a green run, not the input of a verification run.**

**5. It records.** It writes every action to an append-only, hash-chained log. Each entry is linked to the previous one with a hash. Modify a past entry and the chain breaks. It's a proof of integrity, not a database. You can't falsify the history.

What Bilbo does **not** do: it does not decide what to patch. It does not improvise a solution. It does not reason about a repository it has never seen. It does not repair a code-level break. It is a precise sentinel, not an engineer.

And that's the point. The deterministic is reliable, repeatable, and verifiable. But it stops when the work goes beyond the deterministic.

## What changes when it runs every day

Bilbo alone is a tool. Bilbo running every day, automatically, is a process.

The difference isn't the functionality. It's the time.

- **Every morning, a digest.** Not a report someone has to ask for. A message that arrives: what's new since yesterday, what's still open, what's been resolved. The delta, not the total.

- **The rollout is sequential.** One repository at a time. Vulnerabilities are patched in order of severity: criticals first, then highs, then mediums. One PR at a time. PR N+1 only opens when PR N is closed. No confusion.

- **The chain doesn't break.** Every day, the process runs. Every day, the log extends. Every day, the proof accumulates. There's no "remember to check the CVEs." There's a process that doesn't forget.

- **The resolved count.** The log knows which CVEs were flagged and which are no longer flagged by the current lockfiles. The difference is the honest number: "we closed N vulnerabilities." Not a claim. A calculation.

**Bilbo running every day is not a tool. It's a sentinel that doesn't sleep.**

And when the work goes beyond the deterministic — when the test command isn't found, when the bump broke the code, when the context isn't enough for the score — the sentinel stops.

Unless there's something that can reason.

## Bilbo + ILAI: where it becomes a power station

This is where it changes.

Bilbo is the deterministic core. ILAI is the generalizer.

ILAI is Ippocra's local agent. It runs on hardware you own. The data doesn't leave the building. And when Bilbo hits a problem the deterministic can't solve, the handoff is a structured packet: the context, the constraints, the resume command.

Three cases where the deterministic stops and the agent takes over:

**When the test isn't found.** Bilbo looks for the test command in the CI, the documentation, the Makefile. Most repositories have a clear signal. But not all. When it finds nothing, the work of figuring out "what's the command that runs the tests in this specific repo" is a reasoning task, not a parsing task. The agent reads the repository's files, looks at the structure, and decides. Like an engineer would.

**When the bump broke something.** The tests are red. The re-scan is clean. The bump is correct, but it broke the API. You have to look at the code, understand what changed, and repair it. This isn't a regex. It's an engineer who reads, reasons, and modifies. The agent repairs the application code — never the test suite — and re-runs the tests. Green: the work continues. Red: it retries. Budget exhausted: the CVE stays open, and you know.

**When the context isn't enough for the score.** A CVE has severity "unknown." The score says nothing. The context — which version, which package, which code uses it — is what decides if it's critical or noise. The agent reads the context and decides. Not a regex. A reasoning.

In all three cases, the pattern is the same: Bilbo does the work it knows, hits the limit, and passes the context to the agent. The agent reads, reasons, solves. Bilbo resumes where it left off.

**Bilbo is the deterministic core. ILAI is the generalizer. Together, the system doesn't block.** There's no point where the process says "I don't know how to do this" and stops. There's a handoff, and the work continues.

This is the difference between a tool and a system. The tool stops when it hits the limit. The system makes the limit a handoff, not a dead end.

## The human is at the wheel

The point that doesn't change, in any of the three phases: **the human approves.**

Bilbo opens PRs. It doesn't merge them. Human approval is the gate. There's no tier that bypasses this rule. Even if the severity is critical, even if the tests are green, even if the agent repaired the code — the PR stays there, waiting for a human to read it, understand it, and say "yes."

The process is automatic. The decision is human.

The code doesn't leave the machine. The data doesn't cross a border. The proof is in the log. And the final choice is yours.

## Where the others stop

There are great tools for finding vulnerabilities. Dependabot, Snyk, Trivy, OSV-Scanner. They scan, they find the CVEs, they give you a list. Sometimes they open a PR.

**But they stop here.**

- **The list isn't the action.** It gives you 751 CVEs and says "do something." Who decides which one is critical? Who decides which one actually touches the code I use? This question requires an engineer. And the engineer has 750 other questions in the queue.

- **The triage is in the cloud.** Snyk sends your lockfiles to its servers. Your dependency patterns, your lockfiles, your stack — they pass through a third party's infrastructure.

- **No one verifies.** The PR opens. Do the tests pass? Did the bump break something? Is the vulnerability actually closed? Most tools don't know.

- **No proof.** If an auditor asks "prove you're secure," what do you show them? A PDF report? A claim? That's not proof.

| | Dependabot / Snyk / Trivy | **Bilbo + ILAI** |
|---|---|---|
| Finds the CVEs | ✅ | ✅ |
| Closes the cycle (patch → verify) | partially | ✅ |
| Triage on real impact radius | ❌ | ✅ local |
| Code leaves the machine | usually yes | **no** |
| Repairs when the bump breaks | ❌ | ✅ (ILAI) |
| Discovers the test when not documented | ❌ | ✅ (ILAI) |
| Immutable audit trail | ❌ | ✅ hash-chained |

**We are not a better CVE list. We are the closed cycle, with the proof, and the agent that solves where the deterministic stops.**

## What it means for your business

If you have software running in production — a site, an app, a server, an API — Bilbo + ILAI gives you:

- **Visibility.** You know which vulnerabilities you have, since when, and what's been done. It's not a report. It's the log.
- **Automation.** The process runs every day. There's no "remember to check the CVEs." There's a digest that arrives every morning.
- **Verification.** Every patch is tested. Every PR is the output of a green run.
- **Proof.** The append-only, hash-chained log is the proof of integrity.
- **Locality.** The code doesn't leave the machine. The data doesn't cross a border.
- **Control.** The human approves. Always.

---

*Security isn't a project. It's a process. And the process doesn't run by itself — unless there's a system that runs it for you, an agent that solves where the system stops, and a human who says "yes."*

[As we saw in the post on [the real cost of a cloud AI subscription](/cloud-vs-local-cost-the-numbers), the question isn't "cloud or local." It's who owns what. Let's talk.](/en/ilai/)

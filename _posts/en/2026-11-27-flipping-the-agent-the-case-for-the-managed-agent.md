---
title: "Flipping the Agent: The Case for the Managed Agent"
categories: news
excerpt: "Agentic: the LLM drives, code is its tool. Managed agent: the direction is reversed, a deterministic core calls the LLM as a subroutine."
permalink: /flipping-the-agent-the-case-for-the-managed-agent
lang: en
description: "Agentic: the LLM drives, code is its tool. Managed agent: a deterministic core calls the LLM only where it can't proceed. Specialization without fine-tuning."
keywords: managed agent, agentic software, LLM deterministic core, AI harness, LLM specialization without fine-tuning, local AI, ILAI, AI architecture, code calls LLM, AI for small business
page_id: managed-agent-flip
header:
    teaser: /assets/images/screenshots/managed-agent-orchestra-director.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/managed-agent-orchestra-director.webp" alt="The orchestra director raising the baton: the moment the violin takes the solo. Flat vector, three colors." style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  The conductor doesn't play. He decides the moment the violin takes the solo. That is how a managed agent works.
</p>

# Two opposite directions

**In agentic software, the LLM is the driver and code is its toolbox.** The model reasons, decides, and calls functions — code is a specialized library the LLM uses to reach a goal.

**In a managed agent, the direction is reversed.** A deterministic core — code written to do one specific thing — is the driver. And the LLM doesn't lead: it's a subroutine the code calls at the exact moment the deterministic part alone isn't enough.

This isn't a nuance. It's an inversion of the architecture. Same model, same hardware, but the one in command is the other.

# A harness, not a framework

The deterministic core of a managed agent is not a framework. It doesn't try to generalize. It doesn't want to be reusable for "anything".

It's a harness: tight, purpose-built, made to do one specific thing reliably. There's a workflow to follow, a set of constraints to respect, and one exact point where a judgment is needed that the code can't produce on its own. The harness knows where that point is. Calling the LLM is its decision, not an exception.

This is the difference from agentic software, where the model decides *when* and *what* to call in an open space of possibilities. Here the space is closed: the code knows what it's doing, and asks for help only at the point where it can't proceed alone.

# Fine-tuned-model behavior, without the fine-tuning

This is the point that keeps us up at night.

A fine-tuned model *knows* the domain. Its internal distributions have been modified to respond in a certain way, in a certain register, for a certain task. But fine-tuning costs: data, GPUs, time, and a model that ages every time the base model changes.

A managed agent gets the same effect **without touching the weights.** The code builds the right context, sets constraints on the output, validates the result, and has a plan B if the LLM gets it wrong. The model doesn't *know* the domain: it gets *funneled into* it. Same specialized behavior at the output, zero training cost.

It's the difference between training a musician and giving an experienced musician a sheet, a part, and a conductor who keeps them in line.

# The honest limit

The analogy has an edge, and it's worth marking.

A fine-tune changes the model's *distribution*: the model changes. A harness changes nothing. It shapes the context, validates the output, and handles the fallback — but the model stays what it is. A fine-tuned model *knows* the domain. A model funneled by a harness is *guided into* the domain.

Which means a harness is only as good as its prompts, its validation, and its fallback plan. If the model answers badly and the validation doesn't catch it, the managed agent inherits the error. The resilience doesn't come from the model: it comes from the code around it.

This isn't a flaw. It's the point. The resilience of a managed agent doesn't lie in an intelligent model, but in the fact that the code calling it *knows what it's waiting for*, and knows what to do when it doesn't arrive.

# Who's in command?

In an orchestra the conductor doesn't play. He decides the moment the violin takes the solo, keeps the tempo, and makes sure the ensemble stays coherent. The solo belongs to the violin — but it's the conductor who makes it possible.

A managed agent is an orchestra. The deterministic core is the conductor. The LLM is the violin. And the rest of the ensemble is all the code doing the work, every day, without asking permission.

[Related: [Bilbo: the sentinel on the mountain](/bilbo-the-sentinel-on-the-mountain) · [Agent or chat: why it's not the same thing](/agent-or-chat)]

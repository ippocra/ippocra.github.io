---
title: "What cloud AI really costs vs a local box: the numbers"
categories: ai, business, cost
excerpt: "The honest spreadsheet: a subsidized chat subscription, a DIY API build, and a local agent that does the work. Three paths, three very different bills — and the one nobody puts on the comparison sheet."
permalink: /cloud-vs-local-cost
lang: en
description: "Cloud AI vs local AI: the real numbers. ChatGPT Business at €23/user, a DIY API build at €12K setup + ongoing token costs, and ILAI from €350/month. Three paths, three bills — and the hidden cost that doesn't show on the invoice."
keywords: cloud AI vs local AI cost, cloud AI vs on-premise cost, costo AI cloud vs locale, AI agent business cost, local AI agent pricing, AI locale per PMI, intelligenza artificiale locale aziende, AI cost for SME, on-premise AI cost, DIY AI agent cost
page_id: cloud-vs-local-cost
header:
    teaser: /assets/images/screenshots/cloud-vs-local-cost-teaser.webp
classes: wide
tags: ilai, ai, cost, business
---

**"Okay, I get the agent point. But what does it actually cost? Show me the numbers."**

Fair. This is the spreadsheet version of [the argument we made last time](/en/agent-or-chat): three ways to get AI doing work for your company, with the real bills. No hand-waving, no "it depends."

All prices are in euros. The US products (ChatGPT, Claude) are billed in dollars; we've converted at current rates so the comparison is on one currency.

## The three paths

| | **Path A: Subscribed chat** | **Path B: DIY API build** | **Path C: Local agent (ILAI)** |
|---|---|---|---|
| What you get | A text box you talk to | An API you wire into your systems yourself | An agent that does the work, on a machine where data stays |
| Setup cost | €0 — sign up | **€8,000–12,000** (dev time, integration, testing) | **€5,000** (on-cloud) / **€8,000** (on-prem) |
| Hardware | None (their cloud) | A server or cloud VM (~€5,000–7,000, you buy) | Included (on-prem) / included (on-cloud) |
| Monthly | €23–89 **per person** | Token costs: variable, scales with usage | **€350/month** (on-cloud, all users, skill included) |
| Who builds it | You prompt | You (or a dev shop) | We build the skill for your process |
| Where the data lives | Their cloud (US) | Wherever you point the API | In your office / Italian infrastructure |
| Time to first result | 5 minutes (a chat answer) | 6–12 weeks (build + test + train) | 2–4 weeks (onboarding + skill) |

## Path A: The subsidized chat

ChatGPT Business: **€23/user/month**. Claude Team: **€18/user/month** (annual billing). OpenAI's always-on agent (Dot): **€89/user/month**, included in Pro.

The math that looks good:

- 5-person company → 5 × €23 = **€115/month**. That's it.
- Add Dot for the one person who needs autonomy: €89 extra.

The math that doesn't look good:

- Every user who gets a chat box spends their day **talking to it and copy-pasting the answer into their system**. The work doesn't happen *in* the system. A person moves it.
- The data (your client names, your prices, your margins) goes to a US server on every prompt. The ToS says it's not used to train the model. Fine. But it's **outside your walls**, and that's not a cost you can line-item.
- Per-person pricing means the bill grows with headcount. Ten people → €890/month and you still have ten people copy-pasting.

**The real cost of Path A isn't the subscription. It's the person-hours you keep spending doing the work the chat was supposed to save.**

## Path B: The DIY build

This is what a technical team (or a dev agency) builds when they decide "we'll do it ourselves": pull the model API, write the integration layer, build the workflow, test it, maintain it.

The honest numbers:

- **Setup: €8,000–12,000** in dev time (or agency fees). This is the integration, the workflow logic, the testing. Not a weekend project.
- **Hardware: €5,000–7,000** if you go on-prem (GPU server). If you stay on their API, this is zero but the token bill is on you.
- **Token costs: ongoing.** A company that processes 200 documents a month through a GPT-4o-class API pays roughly **€150–400/month** in tokens. A company that does voice, OCR, and document processing at scale pays more. The bill grows with usage, and you're paying per page, per token, per hour of audio.
- **Maintenance: ongoing.** The API changes. The model changes. The integration breaks. Someone has to watch it.

The total first-year cost of a DIY build, done right: **€15,000–25,000** (setup + hardware + a year of tokens). And you've built a system that does *one* workflow, for *one* company, that you now own the maintenance of.

This path makes sense if you have an engineering team whose job is to build software. It doesn't make sense for a trading company, a workshop, or a professional practice that wants the work done, not a project managed.

## Path C: The local agent

This is ILAI. The numbers:

- **On-cloud: €5,000 setup + €350/month.** The skill is built for your process, the integration is done, the data stays on Italian infrastructure (Seeweb, Regolo Zero Data Retention). One agent serves the whole company — not per person.
- **On-prem: €8,000 setup + hardware (~€5,000, customer-bought) + maintenance.** Everything runs in your office. Voice, OCR, agent — no per-page, per-token, per-hour billing. The data never leaves the building.

What the €350/month gets you that the €23/chat doesn't:

- The work is **done**, not answered. Invoices reconciled, quotes prepared, CRM updated, documents processed — inside your systems, continuously.
- The bill doesn't grow with headcount. Five people or fifteen: same agent, same price.
- The capability is **yours**. The skill encodes your process. The machine is yours (on-prem) or yours (on-cloud, dedicated unit). When you stop paying, you stop the service — but the work pattern, the integration knowledge, the data: those are yours.
- Voice, OCR, video: **no per-unit API cost.** A cloud subscription charges per page, per token, per hour of audio. The local box runs them flat.

## The line nobody puts on the spreadsheet

There's a cost that doesn't appear on any invoice:

**The cost of the data being outside your walls.**

For most SMEs, this isn't a GDPR fine. It's: your client list, your pricing, your margins, your supplier terms — sitting in a US cloud, processed by a third party, governed by a ToS you didn't write. The risk is low if nothing leaks. The exposure is total if something does.

No cloud subscription offers a way around this at any price tier. The on-prem option isn't a premium add-on; it's the only configuration where the data physically doesn't leave.

## The honest comparison

| Your situation | The right path |
|---|---|
| You want a smart chat for yourself, personal use | **Path A.** It's cheaper, it's good enough, and it's not what we sell. |
| You have an engineering team that builds software for a living | **Path B.** You'll enjoy building it, and you'll own it. |
| You want the work done, in your systems, with your data, without managing a project | **Path C.** The agent is built, the integration is done, the data stays. |
| You want the work done AND you can't have data leaving the building | **Path C, on-prem.** The only configuration that guarantees it. |

The number that matters isn't the monthly fee. It's the question we started with: **who does the work.** The €23 chat answers. The €350 agent does.

## In short

- **Path A (chat):** €23–89/person/month. Cheap. You still do the work; the chat just gives you a faster answer.
- **Path B (DIY):** €15–25K first year. You build it, you own it, you maintain it. Makes sense if engineering is your business.
- **Path C (local agent):** €350/month, all users, skill included. The work is done, the data stays, the bill doesn't grow with headcount.
- **The hidden cost:** the data in someone else's cloud. Not on the invoice. On the risk register.

## FAQ

**Is the €23 chat really that much worse?**

For a person who wants to ask questions and get answers: no, it's fine. For a company whose work needs to be *executed* — invoices, quotes, documents, CRM — the chat is a step, not the finish line. You still move the pieces.

**Why is the DIY path €12K and not €500?**

Because "call the API" is 5% of the work. The other 95% is: understanding your process, building the integration into your specific ERP/gestionale, handling edge cases, testing with real data, and maintaining it when the API changes. That's weeks of engineering, not a weekend.

**Why is ILAI €350/month and not €35 per user?**

Because it's not a per-person tool. It's one agent doing the company's work. The skill is built once, for the company's process. Adding a user doesn't add work to the agent.

**What does "on-cloud" actually mean for my data?**

Dedicated unit on Italian infrastructure (Seeweb), Regolo Zero Data Retention certified inference. Your data doesn't go to a shared cloud, doesn't go to the US, isn't used to train a shared model. It's a private deployment, not a SaaS instance.

**Can I start on-cloud and move to on-prem later?**

Yes. The skill, the integration logic, and the work patterns transfer. The migration is a hardware + deployment step, not a rebuild.

---

[In the next post in this series](/en/build-vs-buy-agent), we'll look at the question that follows: build the agent yourself vs take it ready — the real cost in time, money, and the environmental bill of a GPU that runs 24/7 in your office.

[Want to see the numbers applied to your company's process? Let's talk.](/en/ilai/cloud/)

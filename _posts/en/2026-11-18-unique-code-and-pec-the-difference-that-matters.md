---
title: "Fattura-pec: the invoicing that doesn't detach from the rest"
categories: news
excerpt: "E-invoicing is detached from everything. PEC is the channel you already have — and with the right tools, the invoice sends itself."
lang: en
description: "Fattura-pec: send e-invoices via PEC without a separate billing system. The agent reads data from the CRM, builds the FatturaPA, validates it, and sends it."
keywords: fattura-pec, PEC, e-invoicing, SdI, FatturaPA, electronic invoice, send invoice via PEC, billing software, invoicing automation, accounting software, ILAI, Smart CRM, integrated invoicing
page_id: fattura-pec-unique-code
header:
    teaser: /assets/images/screenshots/fattura-pec-teaser.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/fattura-pec-teaser.webp" alt="A PEC envelope sealing itself on a wooden desk — the invoice that sends itself" style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  The PEC already exists. Today you don't just receive it: you send it. And an agent sends it.
</p>

**"But can't I already send invoices via PEC?"**

Yes. You can. If you have invoicing software, you fill in the FatturaPA, validate it, send it. It works.

The problem isn't that you *can't*. The problem is that invoicing is **detached from everything else**. A separate software to update, to query, to maintain. A system that doesn't talk to the CRM, to the accountant, to the data you already have. And you're stuck in the middle: copy, paste, re-check.

## Detached invoicing is the problem

Every company that invoices knows this: there's the CRM, there's the billing system, there's the accounting software, there's the PEC. And between each one there's always a copy, a check, a data point that doesn't match.

It's not a tool problem. It's a **discontinuity** problem. Invoicing isn't a process: it's an island. And every island has a bridge that someone has to cross by hand.

## PEC is the channel you already have

PEC is the certified electronic mailbox. Every company in Italy has one. Emails sent to that mailbox are verified and, by law, carry a certain type of legal value.

And the SdI accepts invoices via PEC. No accreditation. No certificate. No separate invoicing software to install.

If you already have a billing provider with SDICoop and it works for you, that's fine — use it. But if invoicing is still detached for you, PEC is the channel you already own.

And it has an advantage the SDICoop channel doesn't: it generates **acceptance and delivery receipts** with legal value. You don't just know the invoice reached the SdI — you have certified proof that the recipient received it.

## The story: we wanted invoicing inside

This was our situation. Every time we looked at the invoicing options, the result was the same: a system by itself. To be updated by itself, to be queried by itself, to be connected by itself. Detached from the CRM. Detached from the accountant. Detached from the flow that was already running.

We wanted invoicing *inside*: inside the CRM, inside the data we already had, inside the flow that already worked.

That's why we built fattura-pec. Not as an alternative to a billing system. As the way to have invoicing without detaching it from the rest.

## You say "make me the invoice." The rest, it does.

Say "make me the invoice," and the agent does this:

**Reads the starting data.** Takes the client card from the CRM (or the source you indicated). Extracts name, VAT number, fiscal code, address. If a data point is missing, it asks. It doesn't guess.

**Builds the FatturaPA file.** Maps the data into the XML format the SdI requires. The file is identical to the one any invoicing software would produce — the difference is that you didn't fill it in.

**Validates it. Before every send.** The file passes through a validation gate: structure, business rules, data consistency. If it's not valid, the agent doesn't send it. It corrects and retries.

**Sends it via PEC.** The PEC SMTP sends the XML to the correct SdI address. The first invoice goes to `sdi01@pec.fatturapa.it`; subsequent ones go to the dedicated address the SdI communicates. The agent learns that address and remembers it.

**Reconciles.** When the notification arrives in PEC, the agent reads it, associates it with the invoice, and updates the status: *issued → received by SdI → delivered to recipient*. If a rejection arrives, it reads the error code, corrects, and if within 5 days resubmits with the same sequential number.

**All of this without you filling in a form. Without you opening an invoicing software. Without you copying a data point from one sheet to another.**

## The state updates on its own

The point isn't "send the invoice." It's that **every invoice has a state, and the state updates on its own**.

When the agent sends the invoice, the client card in the CRM updates: number, date, amount, status. When the delivery receipt arrives: *delivered*, with date and time. If a rejection arrives: *rejected*, with the reason.

There's no sheet to update. There's no email to check. The state is the result of a process that reads the PEC, parses the file, and writes the data in the right place.

This applies to the **accounting software** too: invoices are already structured — dates, amounts, VAT, status — ready for import. The accountant doesn't start from scratch.

## All of this runs locally

The entire flow — reading data, building the file, validation, PEC send, reconciliation — runs on **dedicated hardware**. There's no cloud receiving client data. There's no intermediary that knows how much you invoice and to whom.

This isn't a technical detail. It's the difference between a system that tells you "the invoice was sent" and a system that *knows* — because the data was read, written, and reconciled by a process that runs inside your boundaries.

Invoicing isn't a form to fill in. It's not a software to update by itself. It's a state that updates on its own, inside the flow you already have. As we saw in the post on the [intelligent CRM](/the-smart-crm), the company's state isn't a database to feed: it's the result of a system that works.

[Let's talk.](/contacts)

---

<em>Related: [Welcome ILAI](/welcome-ilai) — the foundation: data doesn't leave. [Cloud vs local: the cost](/cloud-vs-local-cost) — why the cloud doesn't work for businesses.</em>

---
title: "Fattura-PEC: the invoice becomes agentic"
categories: news
excerpt: "Every company in Italy has a PEC. Today, via fattura-pec, you send it, not just receive it. An agent sends it, from the data you already have. The flow becomes operational."
lang: en
description: "Fattura-pec: send e-invoices via PEC, agentically. The agent reads CRM data, builds the FatturaPA, validates and sends. The flow becomes operational."
keywords: fattura-pec, PEC, e-invoicing, SdI, FatturaPA, electronic invoice, send invoice via PEC, agentic, ILAI, Smart CRM, invoicing automation, accounting software, sensitive data, privacy, unique code
page_id: fattura-pec-unique-code
header:
    teaser: /assets/images/screenshots/fattura-pec-teaser.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/fattura-pec-teaser.webp" alt="An electronic invoice that starts from a CRM data point and arrives as a certified PEC — no manual steps in between" style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  The PEC already exists. Today you don't just receive it: you send it. And an agent sends it.
</p>

**Every company in Italy has a PEC. Until now, in e-invoicing, the PEC was a destination: the place where invoices arrived. Today, it's also a starting point.**

With fattura-pec, the flow closes. You don't just receive invoices via PEC and parse them automatically: you *send* them via PEC too, agentically, starting from the data you already have.

## The starting point: the data you already have

To issue an e-invoice you need:
- the client's data (name, VAT number, address, unique code);
- the invoice items (description, quantity, price, VAT rate);
- the sequential number and the date.

In a manual flow, this data is scattered: in an Excel sheet, in an email, in a proposal you already sent, in the head of the person invoicing. Gathering it is the part that costs time — not the invoice itself.

In our case, the starting data is in the **Ippocra Smart CRM**: the client card already carries name, VAT number, unique code, and the interaction history. The agent reads it, without you having to copy it from anywhere else.

But the point isn't that the data is in our CRM specifically. It's that **the starting data can come from any source**: an accepted proposal, an order, a spreadsheet, an API. The agent knows where to look and how to map the data.

## What the agent does

Say "make me the invoice," and the agent does this, in sequence:

**1. Reads the starting data.**
Takes the client card from the CRM (or from the source you indicated). Extracts name, VAT number, unique code, address. If the unique code isn't there, it uses the VAT number — which for Italian recipients is the correct value in the `CodiceDestinatario` field.

**2. Builds the FatturaPA file.**
Maps the data into the XML format required by the SdI: `FatturaElettronica` with header, body, line items, VAT summary. The file is identical to the one any invoicing software would produce — the difference is that you didn't fill it in.

**3. Validates it locally.**
Before every send, the file passes through a gate: XSD validation (structure) + SdI rules (business rules). The gate catches the errors that cost the most in practice:
- **Code 00313** — `CodiceDestinatario=XXXXXXX` with an Italian recipient (must use the unique code or VAT number);
- **Code 00422** — `DatiRiepilogo` not matching the sum of line items;
- **Code 00472** — document type TD21/TD27 used for a B2B invoice (those are self-invoices).

If the file isn't VALID, the agent doesn't send it. It corrects and retries.

**4. Sends it via PEC.**
The PEC SMTP sends the XML as an attachment to the correct SdI address. The first invoice goes to `sdi01@pec.fatturapa.it`; subsequent ones go to the dedicated address the SdI communicates in the first response. The agent learns that address and remembers it.

**5. Reconciles.**
When the first notification arrives in PEC (RicevutaConsegna), the agent reads it, associates it with the sent invoice, and updates the status: *issued → received by SdI → delivered to recipient*. If a rejection notification arrives (RicevutaScarto), the agent reads the error code, corrects the invoice, and — if within 5 days — resubmits it with the same sequential number.

**All of this without you filling in a form. Without you opening an invoicing software. Without you copying a data point from one sheet to another.**

## Why PEC is the right transport

PEC isn't the only channel for sending invoices to the SdI. There's also the SDICoop channel, which requires a qualified PFX certificate and an accreditation as an AdE intermediary.

PEC requires **neither of those**:
- no accreditation;
- no certificate;
- just a PEC mailbox, which every company already has.

The FatturaPA file is identical across all channels — only the transport changes. Using PEC means using the channel you already own, without adding infrastructure.

And there's an advantage the SDICoop channel doesn't have: PEC generates **acceptance and delivery receipts** with legal value. You don't just know the invoice reached the SdI: you have certified proof that the recipient received it.

## The company's state, always current

The point isn't just "send the invoice." It's that **every invoice has a state, and the state updates on its own**.

When the agent sends the invoice, the client card in the CRM updates:
- invoice issued, number, date, amount;
- status: *sent to SdI*;
- when the RicevutaConsegna arrives: *delivered to recipient*, with date and time;
- if a rejection arrives: *rejected*, with the error code and reason.

There's no Excel sheet to update. There's no email to check. There's no question to ask someone. The state is the result of a process that reads the PEC, parses the file, and writes the data in the right place.

This applies to the **accounting software** too: parsed invoices are already structured — dates, amounts, VAT, corporate details, status — and ready for import or reconciliation. The accountant doesn't start from scratch: they start from clean, updated data, already associated with the client.

## Why all of this runs locally

The entire flow — reading data from the CRM, building the file, validation, PEC send, reconciliation — runs on **dedicated hardware**.

There's no cloud receiving client corporate details. There's no service reading the invoices. There's no intermediary that knows how much you invoice, to whom, and in what state.

This isn't a technical detail. It's the difference between a system that tells you "the invoice was sent" and a system that *knows* — because the data was read, written, and reconciled by a process that runs inside your boundaries.

[As we saw in the post on the [intelligent CRM](/the-smart-crm), the company's state isn't a database to feed: it's the result of a system that works. Invoicing is the same pattern, with an agent that closes the loop.](/the-smart-crm)

---

## Frequently Asked Questions

**What is fattura-pec?**

It's Ippocra's flow for issuing e-invoices via PEC agentically. The agent reads the starting data (from the CRM or another source), builds the FatturaPA file, validates it locally, sends it via PEC to the SdI, and reconciles the notifications that arrive. You say "make me the invoice" — the rest is done by the flow.

**Do I need invoicing software to use fattura-pec?**

No. The flow generates the FatturaPA file directly from the starting data. There's no form to fill in, no invoicing software to open. The file is identical to the one any software would produce — but you didn't fill it in.

**Can I use a source other than the CRM?**

Yes. The starting data can come from an accepted proposal, an order, a spreadsheet, an API. The agent knows how to map the data into FatturaPA format. The CRM is the most convenient source because the data is already structured, but it's not the only one.

**What happens if the SdI rejects the invoice?**

The agent receives the rejection notification (RicevutaScarto) in PEC, reads the error code (00313, 00422, 00472, etc.), corrects the invoice, and — if within 5 days — resubmits it with the same sequential number. The state in the CRM updates with the rejection reason, without you having to hunt for the error by hand.

**Do the data leave our environment?**

No. The entire flow runs on dedicated hardware. Client corporate details, amounts, invoices: everything stays inside. It's the same principle as [ILAI](/welcome-ilai): control over data isn't a feature, it's the foundation.

**Is PEC mandatory for e-invoicing?**

No. The SdI accepts invoices also via SDICoop. But PEC is the simplest channel for private companies: no accreditation or certificate required, and it generates acceptance and delivery receipts with legal value. It's the channel you already own.

**How does this relate to the accounting software?**

Issued and received invoices are parsed and structured: dates, amounts, VAT, corporate details, status. They're ready for import into the accounting software or for direct reconciliation. The accountant starts from clean, updated data — not an inbox to check.

---

<em>Related: [The Intelligent CRM: when a CRM becomes a system integrator](/the-smart-crm) — the pattern: the company's state isn't a database to feed, it's the result of a system that works. [Welcome ILAI](/welcome-ilai) — the foundation: control over data. And [Cloud vs local: the cost](/cloud-vs-local-cost) — why the cloud doesn't work for businesses.</em>

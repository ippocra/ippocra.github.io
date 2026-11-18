---
title: "Fattura-pec: the invoice that sends itself"
categories: news
excerpt: "Every company in Italy has a PEC. Until now you received it. Today you send it too — and an agent sends it, from the data you already have. The flow becomes operational."
lang: en
description: "Fattura-pec: the agent reads data from the CRM, builds the FatturaPA, validates it, and sends it via PEC. All local. The flow becomes operational, not a procedure."
keywords: fattura-pec, PEC, e-invoicing, SdI, FatturaPA, electronic invoice, send invoice via PEC, agentic, ILAI, Smart CRM, invoicing automation, accounting software, sensitive data, privacy, unique code
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

The problem isn't that you *can't*. The problem is that you have to *do it yourself*: open the software, copy the data from the CRM, fill in the form, validate, send, check the PEC inbox to see if it arrived. Every invoice. Every time.

We built fattura-pec to remove that "do it yourself."

## The starting point: the data you already have

To issue an invoice you need three things: the client's data, the invoice items, and the sequential number.

In a manual flow, this data is scattered: in an Excel sheet, in an email, in a proposal you already sent, in the head of the person invoicing. Gathering it is the part that costs time — not the invoice itself.

In our case, the starting data is in the **Ippocra Smart CRM**: the client card already carries name, VAT number, unique code, interaction history. The agent reads it, without you having to copy it from anywhere else.

But the point isn't our CRM. It's that **the data can come from wherever you want**: an accepted proposal, an order, a spreadsheet, an API. The agent knows where to look and how to map the data.

## You say "make me the invoice." The rest, it does.

Say "make me the invoice," and the agent does this:

**Reads the starting data.** Takes the client card from the CRM (or the source you indicated). Extracts name, VAT number, unique code, address. If the unique code isn't there, it uses the VAT number — which for Italian recipients is the correct value.

**Builds the FatturaPA file.** Maps the data into the XML format the SdI requires. The file is identical to the one any invoicing software would produce — the difference is that you didn't fill it in.

**Validates it. Before every send.** The file passes through a validation gate: structure, business rules, data consistency. If it's not valid, the agent doesn't send it. It corrects and retries.

**Sends it via PEC.** The PEC SMTP sends the XML to the correct SdI address. The first invoice goes to `sdi01@pec.fatturapa.it`; subsequent ones go to the dedicated address the SdI communicates. The agent learns that address and remembers it.

**Reconciles.** When the notification arrives in PEC, the agent reads it, associates it with the invoice, and updates the status: *issued → received by SdI → delivered to recipient*. If a rejection arrives, it reads the error code, corrects, and if within 5 days resubmits with the same sequential number.

**All of this without you filling in a form. Without you opening an invoicing software. Without you copying a data point from one sheet to another.**

## PEC is the channel you already have

The SdI accepts invoices via SDICoop too — but that requires a qualified PFX certificate and an accreditation as an AdE intermediary. If you have it, use it, it's fine.

If you don't, PEC is the channel you already own: every company in Italy has a PEC, it requires no certificates or accreditations. And it has an advantage SDICoop doesn't: it generates **acceptance and delivery receipts** with legal value. You don't just know the invoice reached the SdI — you have certified proof that the recipient received it.

## The state updates on its own

The point isn't "send the invoice." It's that **every invoice has a state, and the state updates on its own**.

When the agent sends the invoice, the client card in the CRM updates: number, date, amount, status. When the delivery receipt arrives: *delivered*, with date and time. If a rejection arrives: *rejected*, with the reason.

There's no sheet to update. There's no email to check. The state is the result of a process that reads the PEC, parses the file, and writes the data in the right place.

This applies to the **accounting software** too: invoices are already structured — dates, amounts, VAT, status — ready for import. The accountant doesn't start from scratch.

## All of this runs locally

The entire flow — reading data, building the file, validation, PEC send, reconciliation — runs on **dedicated hardware**. There's no cloud receiving client data. There's no intermediary that knows how much you invoice and to whom.

This isn't a technical detail. It's the difference between a system that tells you "the invoice was sent" and a system that *knows* — because the data was read, written, and reconciled by a process that runs inside your boundaries.

As we saw in the post on the [intelligent CRM](/the-smart-crm), the company's state isn't a database to feed: it's the result of a system that works. Invoicing is the same pattern, with an agent that closes the loop.

---

<em>Related: [Welcome ILAI](/welcome-ilai) — the foundation: data doesn't leave. [Cloud vs local: the cost](/cloud-vs-local-cost) — why the cloud doesn't work for businesses.</em>

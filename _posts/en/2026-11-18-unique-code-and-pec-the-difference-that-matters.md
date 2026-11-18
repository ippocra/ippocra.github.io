---
title: "Fattura-pec: why not give your unique code to a billing provider"
categories: news
excerpt: "Every billing system asks for your unique code. From that moment, your invoices flow through their system. PEC is the way out."
lang: en
description: "Fattura-pec: send e-invoices via PEC without giving your unique code to a billing provider. The agent reads data from the CRM, builds the FatturaPA, validates it, and sends it. All local."
keywords: fattura-pec, PEC, e-invoicing, SdI, FatturaPA, electronic invoice, send invoice via PEC, unique code, billing software, ILAI, Smart CRM, invoicing automation, accounting software, sensitive data, privacy
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

The problem isn't that you *can't*. The problem is that almost every billing system asks you for one thing first: **the unique code.** And from that moment, your invoices no longer flow through you. They flow through their system.

## The unique code is a choice you can't take back

The SdI accepts invoices via PEC or via unique code. It doesn't care which: it needs a way to deliver inbound invoices to you.

If you give the unique code to a billing provider — web, desktop, bank-integrated — inbound invoices arrive there. Not on your PEC. Inside their system. And you don't control that system.

If you switch providers, inbound invoices change destination. If the provider shuts down, inbound invoices stop arriving. If you want a second opinion, the data is in their database, not yours.

We chose not to make that choice. Not because billing providers are bad — because invoicing data shouldn't depend on a third-party provider you don't control.

## PEC is the channel you already have

PEC is the certified electronic mailbox. Every company in Italy has one. Emails sent to that mailbox are verified and, by law, carry a certain type of legal value.

And the SdI accepts invoices via PEC. No unique code to give to anyone. No accreditation. No certificate.

If you already have a billing provider with SDICoop and it works for you, that's fine — use it. But if you don't, or if you don't want to be tied to one, PEC is the channel you already own.

And it has an advantage the SDICoop channel doesn't: it generates **acceptance and delivery receipts** with legal value. You don't just know the invoice reached the SdI — you have certified proof that the recipient received it.

## The story: we didn't have a billing provider

This was our situation. We had chosen not to tie ourselves to a specific billing provider. Not on principle — because every time we looked at the options, invoicing became detached from everything else. A system by itself, to be updated by itself, to be queried by itself.

We wanted invoicing *inside*: inside the CRM, inside the data we already had, inside the flow that was already running.

That's why we built fattura-pec. Not as an alternative to a billing provider. As the way to have invoicing without having to hand it to a third-party provider.

## You say "make me the invoice." The rest, it does.

Say "make me the invoice," and the agent does this:

**Reads the starting data.** Takes the client card from the CRM (or the source you indicated). Extracts name, VAT number, unique code, address. If the unique code isn't there, it uses the VAT number — which for Italian recipients is the correct value.

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

The invoice isn't a form to fill in. It's a state that updates on its own. As we saw in the post on the [intelligent CRM](/the-smart-crm), the company's state isn't a database to feed: it's the result of a system that works.

[Let's talk.](/contacts)

---

<em>Related: [Welcome ILAI](/welcome-ilai) — the foundation: data doesn't leave. [Cloud vs local: the cost](/cloud-vs-local-cost) — why the cloud doesn't work for businesses.</em>

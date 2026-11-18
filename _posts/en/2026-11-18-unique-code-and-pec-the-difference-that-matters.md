---
title: "Unique Code and PEC: the difference that matters"
categories: news
excerpt: "The unique code is not the PEC. How PEC integrates into Ippocra's invoicing flow — and why the state stays current, all local with ILAI."
lang: en
description: "Unique code vs PEC: what it is, how it's used, and how it integrates into the invoicing flow. State, always current, all local with ILAI."
keywords: unique code, PEC, e-invoicing, SdI, FatturaPA, electronic invoice, corporate PEC, ILAI, Smart CRM, accounting software, sensitive data, privacy
page_id: fattura-pec-unique-code
header:
    teaser: /assets/images/screenshots/fattura-pec-teaser.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/fattura-pec-teaser.webp" alt="Unique code and PEC: two different keys to the same mailbox" style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  The mailbox already exists. The unique code is the address. The PEC is the mail that arrives.
</p>

**The unique code is not the PEC. They are two different things, and confusing them costs time — sometimes even rejected invoices.**

If you invoice in Italy, you hear these two words together. But they do two different jobs, and understanding the difference is the first step to keeping the flow clean.

## What the unique code is

The **Recipient Code** — commonly called the unique code — is an identifier that a company receives from the IndicePA. It tells the Sistema di Interscambio (SdI) *where* to deliver the invoice: the PEC address where the SdI must hand it to the recipient.

For public bodies, it's a 6-character code (e.g. `M5UXCR1`). For private B2B companies, the unique code can be replaced by the VAT number — but the `CodiceDestinatario` field in the FatturaPA file must still be filled, and the right value depends on the recipient.

**The unique code is a field in the file. It is not an email. It is not a mailbox.**

## What the PEC is

The **Certified Electronic Mail** (PEC) is an email system with legal value: the sender receives an acceptance receipt and a delivery receipt, which certify in a legally binding way that the message was sent and received.

For e-invoicing, the PEC is the **transport**: the channel through which the SdI delivers the invoice to the recipient, and the channel through which you can send the invoice *to* the SdI.

**The PEC is the mailbox. The unique code is the address written on the label.**

## Why the distinction matters in practice

When you fill in a FatturaPA file for an Italian recipient, the `CodiceDestinatario` field must contain:
- the **unique code** (7 characters) of the recipient, if they have one;
- the **VAT number** of the recipient, if they are a private company;
- `XXXXXXX` **only** for foreign recipients.

Using `XXXXXXX` for an Italian recipient is an error that the SdI rejects immediately (Code 00313). Using a wrong or outdated unique code means the invoice goes to a different mailbox than the right one — and the recipient doesn't get it, or gets it late.

The good news: in our Smart CRM, the unique code is a field on the client card. You enter it once, and every invoice generated from the CRM carries it.

## How PEC integrates into Ippocra's flow

Ippocra's invoicing flow runs on two rails:

**Inbound** — the system reads the corporate PEC automatically:
- Received invoices (FatturaPA XML) and SdI notifications (delivery receipts, rejections, outcomes) arrive in the PEC mailbox.
- The system downloads them, classifies them, parses them, and associates them with the correct client or outbound invoice.
- Every rejection notification (Code 00313, 00422, 00472) is flagged with the exact reason, so the invoice gets corrected and resubmitted without you having to hunt for the error by hand.

**Outbound** — the system sends the invoice to the SdI via PEC:
- The FatturaPA file is validated locally (XSD + SdI rules) before every send.
- The PEC SMTP sends the XML as an attachment to the correct SdI address.
- The first notification from the SdI (RicevutaConsegna) carries the file summary: the system reconciles it with the sent invoice and updates the status.

**All of this runs locally.** The PEC is a protocol, not a cloud service: the IMAP/SMTP server is ours, the parser is ours, the invoice database is ours. No data passes through an intermediary.

## Why the company's state stays current

The point isn't just "send the invoice." It's that **every invoice has a state, and the state is always updatable in one single place**.

In the Smart CRM of Ippocra, the client card carries:
- the unique code, the VAT number, the corporate details;
- the history of issued and received invoices;
- the status of each invoice: issued, received by SdI, delivered, rejected, corrected;
- the courtesy invoice PDF, generated from the same data.

When a rejection notification arrives in the PEC, the invoice status in the CRM updates on its own. There's no Excel sheet to update by hand, no email to check, no question to ask someone. The state is the result of a process that reads the PEC, parses the file, and writes the data in the right place.

The same applies to the **accounting software**: parsed invoices are already structured — dates, amounts, VAT, corporate details — and ready to be imported or reconciled. The accountant doesn't start from scratch: they start from clean data, already associated with the client, already with the updated status.

## Why all of this through ILAI

The part that really changes isn't the parser. It's that **the parser runs on hardware that is ours**.

With ILAI, the processing of invoices — reading the PEC, parsing the XML, reconciling with the CRM, generating the courtesy invoice — happens on our dedicated hardware, with our data kept safe. There's no cloud that receives the client corporate details, no service that reads the invoices, no intermediary that knows how much you invoice and to whom.

This isn't a technical detail. It's the difference between a system that tells you "this is your state" and a system that *knows* it, because the data was read and written by a process that runs inside your boundaries.

[As we saw in the post on the [intelligent CRM](/the-smart-crm), the company's state isn't a database to feed: it's the result of a system that works. Invoicing is the same pattern.](/the-smart-crm)

---

## Frequently Asked Questions

**Is the unique code the same for all invoices?**

No. The unique code is an identifier *of the recipient*, not of the sender. Each company has its own unique code, which goes into the `CodiceDestinatario` field of the FatturaPA file when you invoice *that company*. For Italian recipients without a unique code, the VAT number is used.

**Is PEC mandatory for e-invoicing?**

No. The SdI can deliver invoices through other channels (SDICoop, regular email in some cases). But the PEC is the most common channel for private companies, and in our flow it's the channel we use: it's the native transport of the system, with acceptance and delivery receipts.

**What happens when an invoice is rejected by the SdI?**

The system receives the rejection notification (RicevutaScarto) in the PEC, parses it, and updates the invoice status in the CRM with the exact error code (00313, 00422, 00472, etc.). If the rejection is within 5 days, the invoice can be resubmitted with the same sequential number. The CRM shows the status and the reason, without you having to hunt for the error by hand.

**Do the invoice data leave our environment?**

No. The entire flow — PEC reading, parsing, reconciliation, generation — runs on dedicated hardware. Client corporate details, amounts, invoices: everything stays inside. It's the same principle as [ILAI](/welcome-ilai): control over data isn't a feature, it's the foundation.

**How does this relate to the accounting software?**

Parsed invoices are already structured: dates, amounts, VAT, corporate details, status. They're ready for import into the accounting software, or for direct reconciliation. The accountant starts from clean, updated data — not from an inbox to check.

---

<em>Related: [The Intelligent CRM: when a CRM becomes a system integrator](/the-smart-crm) — the general pattern: the company's state isn't a database to feed, it's the result of a system that works. [Welcome ILAI](/welcome-ilai) — the foundation: control over data. And [Cloud vs local: the cost](/cloud-vs-local-cost) — why the cloud doesn't work for businesses, and what a subscription really costs.</em>

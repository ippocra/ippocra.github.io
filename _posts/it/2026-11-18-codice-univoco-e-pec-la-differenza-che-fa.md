---
title: "Codice univoco e PEC: la differenza che fa"
categories: news
excerpt: "Il codice univoco non è la PEC. Ecco come la PEC si integra nel flusso di fatturazione di Ippocra — e perché lo stato resta al punto, tutto in locale con ILAI."
lang: it
description: "Codice univoco e PEC: cos'è, come si usa, e come si integra nel flusso di fatturazione. Lo stato, sempre al punto, tutto in locale con ILAI."
keywords: codice univoco, PEC, fatturazione elettronica, SdI, FatturaPA, fattura elettronica, PEC aziendale, ILAI, Smart CRM, software contabile, dati sensibili, privacy
page_id: fattura-pec-unique-code
header:
    teaser: /assets/images/screenshots/fattura-pec-teaser.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/fattura-pec-teaser.webp" alt="Codice univoco e PEC: due chiavi diverse per la stessa cassetta delle lettere" style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  La cassetta delle lettere esiste già. Il codice univoco è l'indirizzo. La PEC è la posta che ci arriva.
</p>

**Il codice univoco non è la PEC. Sono due cose diverse, e confonderle costa tempo — a volte anche fatture respinte.**

Se fatturi in Italia, queste due parole le senti insieme. Ma fanno due lavori diversi, e capire la differenza è il primo passo per tenere il flusso pulito.

## Cos'è il codice univoco

Il **Codice di Destinatario** — comunemente detto codice univoco — è un identificativo che l'azienda riceve dall'IndicePA. Serve a dire al Sistema di Interscambio (SdI) *dove* recapitare la fattura: l'indirizzo PEC dove l'SdI deve consegnarla al destinatario.

Per le P.A. è un codice a 6 caratteri (es. `M5UXCR1`). Per le aziende private B2B, il codice univoco può essere sostituito dalla P.IVA — ma il campo `CodiceDestinatario` nel file FatturaPA va comunque compilato, e il valore giusto dipende dal destinatario.

**Il codice univoco è un campo del file. Non è un'email. Non è una cassetta.**

## Cos'è la PEC

La **Posta Elettronica Certificata** è un sistema di email con valore legale: il mittente riceve una ricevuta di accettazione e una di consegna, che attestano in modo certificato l'avvenuto invio e l'avvenuta ricezione.

Per la fatturazione elettronica, la PEC è il **trasporto**: il canale attraverso cui l'SdI recapita la fattura al destinatario, e il canale attraverso cui tu puoi inviare la fattura *a* l'SdI.

**La PEC è la cassetta. Il codice univoco è l'indirizzo scritto sull'etichetta.**

## Perché la distinzione conta in pratica

Quando compili un file FatturaPA per un destinatario italiano, il campo `CodiceDestinatario` deve contenere:
- il **codice univoco** (7 caratteri) del destinatario, se lo ha;
- la **P.IVA** del destinatario, se è un'azienda privata;
- `XXXXXXX` **solo** per destinatari esteri.

Usare `XXXXXXX` per un destinatario italiano è un errore che l'SdI respinge al volo (Codice 00313). Usare un codice univoco sbagliato, o non aggiornato, significa che la fattura va in una cassetta diversa da quella giusta — e il destinatario non la riceve, o la riceve con ritardo.

La buona notizia: nel nostro Smart CRM, il codice univoco è un campo della scheda cliente. Lo inserisci una volta, e ogni fattura generata dal CRM lo porta già.

## Come la PEC si integra nel flusso di Ippocra

Il flusso di fatturazione di Ippocra si muove su due binari:

**In entrata** — il sistema legge la PEC aziendale in modo automatico:
- Le fatture ricevute (XML FatturaPA) e le notifiche SdI (ricevute di consegna, scarti, esiti) arrivano nella casella PEC.
- Il sistema le scarica, le classifica, le parse, e le associa al cliente o alla fattura in uscita corretta.
- Ogni notifica di scarto (Codice 00313, 00422, 00472) viene segnalata con il motivo esatto, così la fattura viene corretta e risubmittata senza che tu debba cercare a mano l'errore.

**In uscita** — il sistema invia la fattura a SdI via PEC:
- Il file FatturaPA viene validato localmente (XSD + regole SdI) prima di ogni invio.
- L'SMTP PEC invia l'XML come allegato all'indirizzo SdI corretto.
- La prima notifica dall'SdI (RicevutaConsegna) riporta il file di riepilogo: il sistema la riconcilia con la fattura inviata e aggiorna lo stato.

**Tutto questo gira in locale.** La PEC è un protocollo, non un servizio cloud: il server IMAP/SMTP è il nostro, il parser è il nostro, il database delle fatture è il nostro. Nessun dato passa da un intermediario.

## Perché lo stato della compagnia resta al punto

Il punto non è solo "invia la fattura." È che **ogni fattura ha uno stato, e lo stato è sempre aggiornabile in un unico posto**.

Nel Smart CRM di Ippocra, la scheda cliente porta:
- il codice univoco, la P.IVA, i dati anagrafici;
- la cronologia delle fatture emesse e ricevute;
- lo stato di ogni fattura: emessa, ricevuta da SdI, consegnata, scartata, corretta;
- la fattura di cortesia PDF, generata dallo stesso dato.

Quando una notifica di scarto arriva in PEC, lo stato della fattura nel CRM si aggiorna da solo. Non c'è un foglio Excel da aggiornare a mano, non c'è una mail da controllare, non c'è una domanda da fare a qualcuno. Lo stato è il risultato di un processo che legge la PEC, parse il file, e scrive il dato nel posto giusto.

Questo vale anche per il **software contabile**: le fatture parseate sono già strutturate — date, importi, IVA, dati anagrafici — e pronte per essere importate o riconciliate. Il contabile non riparte da zero: parte da un dato pulito, già associato al cliente, già con lo stato aggiornato.

## Perché tutto questo tramite ILAI

La parte che cambia davvero non è il parser. È che **il parser gira su hardware che è nostro**.

Con ILAI, il trattamento delle fatture — la lettura della PEC, il parsing del XML, la riconciliazione con il CRM, la generazione della fattura di cortesia — avviene sul nostro hardware dedicato, con i nostri dati al sicuro. Non c'è un cloud che riceve i dati anagrafici dei clienti, non c'è un servizio che legge le fatture, non c'è un intermediario che sa quanto fatturi e a chi.

Questo non è un dettaglio tecnico. È la differenza tra un sistema che ti dice "il tuo stato è questo" e un sistema che lo *sa*, perché il dato è stato letto e scritto da un processo che gira dentro i tuoi confini.

[Come abbiamo visto nel post sul [CRM intelligente](/il-crm-intelligente), lo stato della compagnia non è un database da alimentare: è il risultato di un sistema che lavora. La fatturazione è lo stesso pattern.](/il-crm-intelligente)

---

## Domande Frequenti

**Il codice univoco è lo stesso per tutte le fatture?**

No. Il codice univoco è un identificativo *del destinatario*, non del mittente. Ogni azienda ha il proprio codice univoco, che va inserito nel campo `CodiceDestinatario` del file FatturaPA quando fatturi *a quell'azienda*. Per i destinatari italiani senza codice univoco, si usa la P.IVA.

**La PEC è obbligatoria per la fatturazione elettronica?**

No. L'SdI può recapitare le fatture anche tramite canali diversi (SDICoop, email ordinaria in alcuni casi). Ma la PEC è il canale più diffuso per le aziende private, e nel nostro flusso è il canale che usiamo: è il trasporto nativo del sistema, con ricevute di accettazione e consegna.

**Cosa succede se una fattura viene scartata dall'SdI?**

Il sistema riceve la notifica di scarto (RicevutaScarto) in PEC, la parse, e aggiorna lo stato della fattura nel CRM con il codice di errore esatto (00313, 00422, 00472, ecc.). Se lo scarto è entro 5 giorni, la fattura può essere risubmittata con lo stesso progressivo. Il CRM mostra lo stato e il motivo, senza che tu debba cercare l'errore a mano.

**I dati delle fatture escono dal nostro ambiente?**

No. L'intero flusso — lettura PEC, parsing, riconciliazione, generazione — gira su hardware dedicato. I dati anagrafici dei clienti, gli importi, le fatture: tutto resta dentro. È lo stesso principio di [ILAI](/benvenuto-ilai): il controllo sui dati non è una funzione, è il fondamento.

**Come si relaziona questo al software contabile?**

Le fatture parseate sono già strutturate: date, importi, IVA, dati anagrafici, stato. Sono pronte per l'importazione nel software contabile, o per la riconciliazione diretta. Il contabile parte da un dato pulito e aggiornato, non da una casella di posta da controllare.

---

<em>Correlato: [Il CRM intelligente: quando un CRM diventa un system integrator](/il-crm-intelligente) — il pattern generale: lo stato della compagnia non è un database da alimentare, è il risultato di un sistema che lavora. [Benvenuto ILAI](/benvenuto-ilai) — il fondamento: il controllo sui dati. E [Cloud vs locale: il costo](/cloud-vs-locale-cost) — perché il cloud non funziona per le imprese, e cosa costa davvero un abbonamento.</em>

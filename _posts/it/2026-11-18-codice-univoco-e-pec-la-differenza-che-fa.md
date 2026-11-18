---
title: "Fattura-pec: la fattura che si manda da sola"
categories: news
excerpt: "Ogni azienda ha una PEC. Finora la ricevi. Da oggi la mandi anche tu — e la manda un agente, dai dati che hai già. Il flusso diventa operativo."
lang: it
description: "Fattura-pec: l'agente legge i dati dal CRM, costruisce il FatturaPA, lo valida e lo invia via PEC. Tutto in locale. Il flusso diventa operativo, non una procedura."
keywords: fattura-pec, PEC, fatturazione elettronica, SdI, FatturaPA, fattura elettronica, inviare fattura via PEC, agentico, ILAI, Smart CRM, automazione fatturazione, software contabile, dati sensibili, privacy, codice univoco
page_id: fattura-pec-unique-code
header:
    teaser: /assets/images/screenshots/fattura-pec-teaser.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/fattura-pec-teaser.webp" alt="Una busta PEC che si chiude da sola su un tavolo di legno — la fattura che si manda da sola" style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  La PEC esiste già. Da oggi non la ricevi più solo: la mandi. E la manda un agente.
</p>

**"Ma non posso già mandare fatture via PEC?"**

Sì. Puoi. Se hai un software di fatturazione, compili il FatturaPA, lo validi, lo invii. Funziona.

Il problema non è che non si *può*. Il problema è che devi *farlo tu*: aprire il software, copiare i dati dal CRM, compilare il modulo, validare, inviare, controllare la PEC per vedere se è arrivata. Ogni fattura. Ogni volta.

Noi abbiamo costruito fattura-pec per togliere quel "farlo tu".

## Il punto di partenza: i dati che hai già

Per emettere una fattura servono tre cose: i dati del cliente, le voci della fattura, e il numero di progressivo.

In un flusso manuale, questi dati stanno sparsi: in un foglio Excel, in una mail, in una proposta che hai già inviato, nella testa di chi fattura. Raccoglierli è la parte che costa tempo — non la fattura in sé.

Nel nostro caso, i dati di partenza sono nel **Smart CRM di Ippocra**: la scheda cliente porta già denominazione, P.IVA, codice univoco, cronologia delle interazioni. L'agente li legge, senza che tu debba copiarli da nessun'altra parte.

Ma il punto non è il nostro CRM. È che **i dati possono venire da dove vuoi**: un preventivo accettato, un ordine, un foglio di calcolo, una API. L'agente sa dove guardare e come mappare il dato.

## Dici "fammi la fattura". Il resto lo fa lui.

Detto "fammi la fattura", l'agente fa questo:

**Legge i dati di partenza.** Prende la scheda cliente dal CRM (o dalla sorgente che gli hai indicato). Estrae denominazione, P.IVA, codice univoco, indirizzo. Se il codice univoco non c'è, usa la P.IVA — che per i destinatari italiani è il valore corretto.

**Costruisce il file FatturaPA.** Mappa i dati nel formato XML che lo SdI richiede. Il file è identico a quello che produrrebbe qualsiasi software di fatturazione — la differenza è che non l'hai compilato tu.

**Lo valida. Prima di ogni invio.** Il file passa attraverso un gate di validazione: struttura, regole di business, coerenza dei dati. Se non è valido, l'agente non lo invia. Lo corregge e riprova.

**Lo invia via PEC.** L'SMTP PEC invia l'XML all'indirizzo SdI corretto. La prima fattura va a `sdi01@pec.fatturapa.it`; le successive all'indirizzo dedicato che lo SdI comunica. L'agente impara quell'indirizzo e lo memorizza.

**Riconcilia.** Quando la notifica arriva in PEC, l'agente la legge, la associa alla fattura, e aggiorna lo stato: *emessa → ricevuta da SdI → consegnata al destinatario*. Se arriva uno scarto, legge il codice di errore, corregge, e se siamo entro i 5 giorni risubmette con lo stesso progressivo.

**Tutto questo senza che tu compili un modulo. Senza che tu apra un software di fatturazione. Senza che tu copi un dato da un foglio a un altro.**

## La PEC è il canale che già hai

Lo SdI accetta fatture anche tramite SDICoop — ma quello richiede un certificato PFX qualificato e un accreditamento come intermediario AdE. Se ce l'hai, usalo, va benissimo.

Se non ce l'hai, la PEC è il canale che già possiedi: ogni azienda in Italia ha una PEC, non richiede né certificati né accreditamenti. E ha un vantaggio che SDICoop non ha: genera **ricevute di accettazione e consegna** con valore legale. Non solo sai che la fattura è arrivata allo SdI — hai la prova certificata che il destinatario l'ha ricevuta.

## Lo stato si aggiorna da solo

Il punto non è "invia la fattura". È che **ogni fattura ha uno stato, e lo stato si aggiorna da solo**.

Quando l'agente invia la fattura, la scheda cliente nel CRM si aggiorna: numero, data, importo, stato. Quando la RicevutaConsegna arriva: *consegnata*, con data e ora. Se arriva uno scarto: *scartata*, con il motivo.

Non c'è un foglio da aggiornare. Non c'è una mail da controllare. Lo stato è il risultato di un processo che legge la PEC, parse il file, e scrive il dato nel posto giusto.

Questo vale anche per il **software contabile**: le fatture sono già strutturate — date, importi, IVA, stato — pronte per essere importate. Il contabile non riparte da zero.

## Tutto questo gira in locale

L'intero flusso — lettura dei dati, costruzione del file, validazione, invio PEC, riconciliazione — gira su **hardware dedicato**. Non c'è un cloud che riceve i dati dei clienti. Non c'è un intermediario che sa quanto fatturi e a chi.

Questo non è un dettaglio tecnico. È la differenza tra un sistema che ti dice "la fattura è stata inviata" e un sistema che *sa* — perché il dato è stato letto, scritto e riconciliato da un processo che gira dentro i tuoi confini.

Come abbiamo visto nel post sul [CRM intelligente](/il-crm-intelligente), lo stato della compagnia non è un database da alimentare: è il risultato di un sistema che lavora. La fatturazione è lo stesso pattern, con un agente che chiude il ciclo.

---

<em>Correlato: [Benvenuto ILAI](/benvenuto-ilai) — il fondamento: i dati non escono. [Cloud vs locale: il costo](/cloud-vs-locale-cost) — perché il cloud non funziona per le imprese.</em>

---
title: "Fattura-pec: perché non dare il codice univoco a un gestionale"
categories: news
excerpt: "Ogni gestionale ti chiede il codice univoco. Da quel momento le fatture girano nel loro sistema. La PEC è la via d'uscita."
lang: it
description: "Fattura-pec: invia fatture via PEC senza dare il codice univoco a un gestionale. L'agente legge i dati dal CRM, costruisce il FatturaPA, lo valida e lo invia. Tutto in locale."
keywords: fattura-pec, PEC, fatturazione elettronica, SdI, FatturaPA, fattura elettronica, inviare fattura via PEC, codice univoco, gestionale, ILAI, Smart CRM, automazione fatturazione, software contabile, dati sensibili, privacy
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

Il problema non è che non si *può*. Il problema è che quasi tutti i gestionali ti chiedono una cosa prima: **il codice univoco.** E da quel momento, le fatture non girano più da te. Girano nel loro sistema.

## Il codice univoco è una scelta che non puoi fare indietro

Lo SdI accetta fatture via PEC o via codice univoco. Non gli importa quale: gli serve un modo per consegnarti le fatture in entrata.

Se dai il codice univoco a un gestionale — web, desktop, integrato con la banca — le fatture in entrata arrivano lì. Non sulla tua PEC. Dentro il loro sistema. E tu non controlli quel sistema.

Se cambi gestionale, le fatture in entrata cambiano destinazione. Se il gestionale chiude, le fatture in entrata smettono di arrivare. Se vuoi un secondo parere, il dato sta nel loro database, non nel tuo.

Noi abbiamo scelto di non fare questa scelta. Non perché i gestionali siano cattivi — perché il dato della fatturazione non dovrebbe dipendere da un fornitore terzo che non controlli.

## La PEC è il canale che già hai

La PEC è la casella di posta elettronica certificata. Ogni azienda in Italia ne ha una. Le mail mandate a quella casella sono verificate e, per legge, hanno un certo tipo di valore.

E lo SdI accetta fatture via PEC. Niente codice univoco da dare a nessuno. Niente accreditamento. Niente certificato.

Se hai già un gestionale con SDICoop e funziona per te, va benissimo — usalo. Ma se non ce l'hai, o se non vuoi legarti, la PEC è il canale che già possiedi.

E ha un vantaggio che il canale SDICoop non ha: genera **ricevute di accettazione e consegna** con valore legale. Non solo sai che la fattura è arrivata allo SdI — hai la prova certificata che il destinatario l'ha ricevuta.

## La storia: non avevamo un gestionale

Questa era la nostra situazione. Avevamo scelto di non legarci a un gestore di fatturazione specifico. Non per principio — perché ogni volta che lo guardavamo, la fatturazione diventava staccata dal resto. Un sistema a sé, da aggiornare a sé, da interrogare a sé.

Volevamo la fatturazione *dentro*: dentro il CRM, dentro i dati che già avevamo, dentro il flusso che già girava.

Per questo abbiamo costruito fattura-pec. Non come un'alternativa al gestionale. Come il modo per avere la fatturazione senza doverla dare a un fornitore terzo.

## Dici "fammi la fattura". Il resto lo fa lui.

Detto "fammi la fattura", l'agente fa questo:

**Legge i dati di partenza.** Prende la scheda cliente dal CRM (o dalla sorgente che gli hai indicato). Estrae denominazione, P.IVA, codice univoco, indirizzo. Se il codice univoco non c'è, usa la P.IVA — che per i destinatari italiani è il valore corretto.

**Costruisce il file FatturaPA.** Mappa i dati nel formato XML che lo SdI richiede. Il file è identico a quello che produrrebbe qualsiasi software di fatturazione — la differenza è che non l'hai compilato tu.

**Lo valida. Prima di ogni invio.** Il file passa attraverso un gate di validazione: struttura, regole di business, coerenza dei dati. Se non è valido, l'agente non lo invia. Lo corregge e riprova.

**Lo invia via PEC.** L'SMTP PEC invia l'XML all'indirizzo SdI corretto. La prima fattura va a `sdi01@pec.fatturapa.it`; le successive all'indirizzo dedicato che lo SdI comunica. L'agente impara quell'indirizzo e lo memorizza.

**Riconcilia.** Quando la notifica arriva in PEC, l'agente la legge, la associa alla fattura, e aggiorna lo stato: *emessa → ricevuta da SdI → consegnata al destinatario*. Se arriva uno scarto, legge il codice di errore, corregge, e se siamo entro i 5 giorni risubmette con lo stesso progressivo.

**Tutto questo senza che tu compili un modulo. Senza che tu apra un software di fatturazione. Senza che tu copi un dato da un foglio a un altro.**

## Lo stato si aggiorna da solo

Il punto non è "invia la fattura". È che **ogni fattura ha uno stato, e lo stato si aggiorna da solo**.

Quando l'agente invia la fattura, la scheda cliente nel CRM si aggiorna: numero, data, importo, stato. Quando la RicevutaConsegna arriva: *consegnata*, con data e ora. Se arriva uno scarto: *scartata*, con il motivo.

Non c'è un foglio da aggiornare. Non c'è una mail da controllare. Lo stato è il risultato di un processo che legge la PEC, parse il file, e scrive il dato nel posto giusto.

Questo vale anche per il **software contabile**: le fatture sono già strutturate — date, importi, IVA, stato — pronte per essere importate. Il contabile non riparte da zero.

## Tutto questo gira in locale

L'intero flusso — lettura dei dati, costruzione del file, validazione, invio PEC, riconciliazione — gira su **hardware dedicato**. Non c'è un cloud che riceve i dati dei clienti. Non c'è un intermediario che sa quanto fatturi e a chi.

Questo non è un dettaglio tecnico. È la differenza tra un sistema che ti dice "la fattura è stata inviata" e un sistema che *sa* — perché il dato è stato letto, scritto e riconciliato da un processo che gira dentro i tuoi confini.

La fattura non è un modulo da compilare. È uno stato che si aggiorna da solo. Come abbiamo visto nel post sul [CRM intelligente](/il-crm-intelligente), lo stato della compagnia non è un database da alimentare: è il risultato di un sistema che lavora.

[Parliamo.](/contatti)

---

<em>Correlato: [Benvenuto ILAI](/benvenuto-ilai) — il fondamento: i dati non escono. [Cloud vs locale: il costo](/cloud-vs-locale-cost) — perché il cloud non funziona per le imprese.</em>

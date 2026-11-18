---
title: "Fattura-PEC: la fattura diventa agentica"
categories: news
excerpt: "Ogni azienda ha una PEC. Da oggi, via fattura-pec, la mandi, non solo la ricevi. E la manda un agente, dai dati che hai già. Il flusso diventa operativo."
lang: it
description: "Fattura-pec: inviare fatture via PEC in modo agentico. L'agente legge i dati dal CRM, costruisce il FatturaPA, lo valida e lo invia. Il flusso diventa operativo."
keywords: fattura-pec, PEC, fatturazione elettronica, SdI, FatturaPA, fattura elettronica, inviare fattura via PEC, agentico, ILAI, Smart CRM, automazione fatturazione, software contabile, dati sensibili, privacy, codice univoco
page_id: fattura-pec-unique-code
header:
    teaser: /assets/images/screenshots/fattura-pec-teaser.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/fattura-pec-teaser.webp" alt="Una fattura elettronica che parte da un dato nel CRM e arriva come PEC certificata — senza passaggi manuali" style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  La PEC esiste già. Da oggi non la ricevi più solo: la mandi. E la manda un agente.
</p>

**Ogni azienda in Italia ha una PEC. Finora, nella fatturazione elettronica, la PEC era un punto di arrivo: il posto dove le fatture entravano. Da oggi, è anche un punto di partenza.**

Con fattura-pec, il flusso si chiude. Non solo ricevi le fatture via PEC e le parsei automaticamente: le *invi* anche tu via PEC, in modo agentico, partendo dai dati che hai già.

## Il punto di partenza: i dati che hai già

Per emettere una fattura elettronica servono:
- i dati del cliente (denominazione, P.IVA, indirizzo, codice univoco);
- le voci della fattura (descrizione, quantità, prezzo, aliquota IVA);
- il numero di progressivo e la data.

In un flusso manuale, questi dati stanno sparsi: in un foglio Excel, in una mail, in una proposta che hai già inviato, nella testa di chi fattura. Raccoglierli è la parte che costa tempo — non la fattura in sé.

Nel nostro caso, i dati di partenza sono nel **Smart CRM di Ippocra**: la scheda cliente porta già denominazione, P.IVA, codice univoco, e la cronologia delle interazioni. L'agente li legge, senza che tu debba copiarli da nessun'altra parte.

Ma il punto non è che i dati siano nel nostro CRM specificamente. È che **i dati di partenza possono venire da qualsiasi sorgente**: un preventivo accettato, un ordine, un foglio di calcolo, una API. L'agente sa dove guardare e come mappare il dato.

## Cosa fa l'agente

Detto "fammi la fattura", l'agente fa questo, in sequenza:

**1. Legge i dati di partenza.**
Prende la scheda cliente dal CRM (o dalla sorgente che gli hai indicato). Estrae denominazione, P.IVA, codice univoco, indirizzo. Se il codice univoco non c'è, usa la P.IVA — che per i destinatari italiani è il valore corretto nel campo `CodiceDestinatario`.

**2. Costruisce il file FatturaPA.**
Mappa i dati nel formato XML richiesto dallo SdI: `FatturaElettronica` con header, corpo, righe, riepilogo IVA. Il file è identico a quello che produrrebbe qualsiasi software di fatturazione — la differenza è che non l'hai compilato tu.

**3. Lo valida localmente.**
Prima di ogni invio, il file passa attraverso un gate: validazione XSD (struttura) + regole SdI (business rules). Il gate cattura gli errori che costano di più in pratica:
- **Codice 00313** — `CodiceDestinatario=XXXXXXX` con destinatario italiano (va usato il codice univoco o la P.IVA);
- **Codice 00422** — `DatiRiepilogo` non corrispondente alla somma delle righe;
- **Codice 00472** — tipo documento TD21/TD27 usato per una fattura B2B (sono autofatture).

Se il file non è VALID, l'agente non lo invia. Lo corregge e riprova.

**4. Lo invia via PEC.**
L'SMTP PEC invia l'XML come allegato all'indirizzo SdI corretto. La prima fattura va a `sdi01@pec.fatturapa.it`; le successive all'indirizzo dedicato che lo SdI comunica nella prima risposta. L'agente impara quell'indirizzo e lo memorizza.

**5. Riconcilia.**
Quando la prima notifica arriva in PEC (RicevutaConsegna), l'agente la legge, la associa alla fattura inviata, e aggiorna lo stato: *emessa → ricevuta da SdI → consegnata al destinatario*. Se arriva una notifica di scarto (RicevutaScarto), l'agente legge il codice di errore, corregge la fattura, e — se siamo entro i 5 giorni — la risubmette con lo stesso progressivo.

**Tutto questo senza che tu compili un modulo. Senza che tu apri un software di fatturazione. Senza che tu copi un dato da un foglio a un altro.**

## Perché la PEC è il trasporto giusto

La PEC non è l'unico canale per inviare fatture allo SdI. Esiste anche il canale SDICoop, che richiede un certificato PFX qualificato e un accreditamento come intermediario AdE.

La PEC richiede **nessun requisito in più**:
- nessuna accreditazione;
- nessun certificato;
- solo una casella PEC, che ogni azienda ha già.

Il file FatturaPA è identico in tutti i canali — cambia solo il trasporto. Usare la PEC significa usare il canale che già possiedi, senza aggiungere infrastruttura.

E c'è un vantaggio che il canale SDICoop non ha: la PEC genera **ricevute di accettazione e consegna** con valore legale. Non solo sai che la fattura è arrivata allo SdI: hai la prova certificata che il destinatario l'ha ricevuta.

## Lo stato della compagnia, sempre al punto

Il punto non è solo "invia la fattura." È che **ogni fattura ha uno stato, e lo stato si aggiorna da solo**.

Quando l'agente invia la fattura, la scheda cliente nel CRM si aggiorna:
- fattura emessa, numero, data, importo;
- stato: *inviata a SdI*;
- quando la RicevutaConsegna arriva: *consegnata al destinatario*, con data e ora;
- se arriva uno scarto: *scartata*, con il codice di errore e la motivazione.

Non c'è un foglio Excel da aggiornare. Non c'è una mail da controllare. Non c'è una domanda da fare a qualcuno. Lo stato è il risultato di un processo che legge la PEC, parse il file, e scrive il dato nel posto giusto.

Questo vale anche per il **software contabile**: le fatture parseate sono già strutturate — date, importi, IVA, dati anagrafici, stato — e pronte per essere importate o riconciliate. Il contabile non riparte da zero: parte da un dato pulito, già associato al cliente, già aggiornato.

## Perché tutto questo gira in locale

L'intero flusso — lettura dei dati dal CRM, costruzione del file, validazione, invio PEC, riconciliazione — gira su **hardware dedicato**.

Non c'è un cloud che riceve i dati anagrafici dei clienti. Non c'è un servizio che legge le fatture. Non c'è un intermediario che sa quanto fatturi, a chi, e con quale stato.

Questo non è un dettaglio tecnico. È la differenza tra un sistema che ti dice "la fattura è stata inviata" e un sistema che *sa* — perché il dato è stato letto, scritto e riconciliato da un processo che gira dentro i tuoi confini.

[Come abbiamo visto nel post sul [CRM intelligente](/il-crm-intelligente), lo stato della compagnia non è un database da alimentare: è il risultato di un sistema che lavora. La fatturazione è lo stesso pattern, con un agente che chiude il ciclo.](/il-crm-intelligente)

---

## Domande Frequenti

**Cos'è fattura-pec?**

È il flusso di Ippocra per emettere fatture elettroniche via PEC in modo agentico. L'agente legge i dati di partenza (dal CRM o da altra sorgente), costruisce il file FatturaPA, lo valida localmente, lo invia via PEC allo SdI, e riconcilia le notifiche che arrivano. L'utente dice "fammi la fattura" — il resto lo fa il flusso.

**Devo avere un software di fatturazione per usare fattura-pec?**

No. Il flusso genera il file FatturaPA direttamente dai dati di partenza. Non c'è un modulo da compilare, non c'è un software di fatturazione da aprire. Il file è identico a quello che produrrebbe qualsiasi software — ma non l'hai compilato tu.

**Posso usare un'altra sorgente oltre al CRM?**

Sì. I dati di partenza possono venire da un preventivo accettato, un ordine, un foglio di calcolo, una API. L'agente sa come mappare il dato nel formato FatturaPA. Il CRM è la sorgente più comoda perché ha già i dati strutturati, ma non è l'unica.

**Cosa succede se lo SdI scarta la fattura?**

L'agente riceve la notifica di scarto (RicevutaScarto) in PEC, legge il codice di errore (00313, 00422, 00472, ecc.), corregge la fattura e — se siamo entro 5 giorni — la risubmette con lo stesso progressivo. Lo stato nel CRM si aggiorna con il motivo dello scarto, senza che tu debba cercare l'errore a mano.

**I dati escono dal nostro ambiente?**

No. L'intero flusso gira su hardware dedicato. I dati anagrafici dei clienti, gli importi, le fatture: tutto resta dentro. È lo stesso principio di [ILAI](/benvenuto-ilai): il controllo sui dati non è una funzione, è il fondamento.

**La PEC è obbligatoria per la fatturazione elettronica?**

No. Lo SdI accetta fatture anche tramite SDICoop. Ma la PEC è il canale più semplice per le aziende private: non richiede accreditamenti né certificati, e genera ricevute di accettazione e consegna con valore legale. È il canale che già possiedi.

**Come si relaziona questo al software contabile?**

Le fatture emesse e ricevute sono parseate e strutturate: date, importi, IVA, dati anagrafici, stato. Sono pronte per l'importazione nel software contabile o per la riconciliazione diretta. Il contabile parte da un dato pulito e aggiornato, non da una casella di posta da controllare.

---

<em>Correlato: [Il CRM intelligente: quando un CRM diventa un system integrator](/il-crm-intelligente) — il pattern: lo stato della compagnia non è un database da alimentare, è il risultato di un sistema che lavora. [Benvenuto ILAI](/benvenuto-ilai) — il fondamento: il controllo sui dati. E [Cloud vs locale: il costo](/cloud-vs-locale-cost) — perché il cloud non funziona per le imprese.</em>

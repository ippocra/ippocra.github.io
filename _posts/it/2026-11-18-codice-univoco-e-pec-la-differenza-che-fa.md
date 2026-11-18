---
title: "Fattura-pec: la fatturazione che non si stacca dal resto"
categories: news
excerpt: "La fatturazione è staccata dal resto. La PEC è il canale che già hai — e con gli strumenti giusti, la fattura si manda da sola."
lang: it
description: "Fattura-pec: invia fatture via PEC senza un gestionale separato. L'agente legge i dati dal CRM, costruisce il FatturaPA, lo valida e lo invia."
keywords: fattura-pec, PEC, fatturazione elettronica, SdI, FatturaPA, fattura elettronica, inviare fattura via PEC, gestionale, automazione fatturazione, software contabile, ILAI, Smart CRM, fatturazione integrata
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
  Ogni azienda ha bisogno di avere una PEC per legge. E' possibile sia ricevere che mandare fatture tramite PEC. Da 
  oggi è diventato molto piú facile grazie a fatture-pec. Giá pronto per essere utilizzato in maniera agentica.
</p>


Ogni Azienda italiana o ogni professionista ha bisogno di una PEC per legge. Per fare la fatturazione è possibile utilizzare la PEC, sia per riceverle che per mandarle.

Ricevere le fatture è abbastanza semplice, invece per mandarle il processo è piú complesso. Per questo molte soluzioni
ricadono nel, o utilizzare il sistema offerto dall'agenzia delle entrate direttamente, o quello di affidarsi ad un 
gestionale per la fatturazione elettronica.

Forse conoscete come funziona, una volta che avete scelto un gestionale per la fatturazione, questo vi affida un codice univoco, che diventa il metodo da segnalare in tutte le fatture che riceverete, in maniera tale da averle tutte all'interno di quel sistema. Inoltre questo sistema si occuperá di creare le fatture in formato XML e mandarle 
attraverso il sistema SDI.


Il problema classico è che la fatturazione è **staccata dal resto**. Un software a sé, da aggiornare a sé, da interrogare a sé. Un sistema che non parla con il CRM, con il contabile, con i dati che già hai. E tu ci stai dentro: copi, trasferisci i dati, ricontrolli.

## La fatturazione staccata è il problema

Ogni azienda che fattura lo sa: c'è il CRM, c'è il gestionale, c'è il software contabile, c'è la PEC. E tra uno e l'altro c'è sempre una copia, un controllo, un dato che non torna.

Non è un problema di tool. È un problema di **discontinuità**. La fatturazione non è un processo: è un'isola. E ogni isola ha un ponte che qualcuno deve attraversare a mano.

## La PEC è il canale che già hai

Lo SdI accetta fatture via PEC. Niente accreditamento. Niente certificato. Niente software di fatturazione da installare a sé.

Se hai già un gestionale con SDICoop e funziona per te, va benissimo — usalo. Ma se la fatturazione per te è ancora staccata, la PEC è il canale che già possiedi. Hai giá i dati. Bisogna in qualche modo unirli.

## La storia: volevamo la fatturazione dentro

Questa era la nostra situazione. Ogni volta che guardavamo le opzioni per la fatturazione, il risultato era lo stesso: un sistema a sé. Da aggiornare a sé, da interrogare a sé, da collegare a sé. Staccato dal CRM. Staccato dal contabile. Staccato dal flusso che già girava.

Volevamo la fatturazione *dentro*: dentro il CRM, dentro i dati che già avevamo, dentro il flusso che già funzionava.

Per questo abbiamo costruito fattura-pec. Non come un'alternativa al gestionale. Come il modo per avere la fatturazione senza doverla staccare dal resto.

## Dici "fammi la fattura". Il resto lo fa lui.

Detto "fammi la fattura", l'agente fa questo:

**Legge i dati di partenza.** Prende la scheda cliente dal CRM (o dalla sorgente che gli hai indicato). Estrae denominazione, P.IVA, codice fiscale, indirizzo e PEC o codice unico. Se manca un dato, lo chiede. Non lo inventa.

**Costruisce il file FatturaPA.** Mappa i dati nel formato XML che lo SdI richiede. Il file è identico a quello che produrrebbe qualsiasi software di fatturazione — la differenza è che viene generato da fattura-pec.

**Lo valida. Prima di ogni invio.** Il file passa attraverso un gate di validazione: struttura, regole di business, coerenza dei dati. Se non è valido, l'agente non lo invia. Lo corregge e lo valida.

**Lo invia via PEC.** Avendo a disposizione sia la capacitá di leggere le email che quello per inviarle, l'agente 
lo invia all'indirizzo SdI corretto. La prima fattura va a `sdi01@pec.fatturapa.it`; le successive all'indirizzo dedicato che lo SdI comunica. L'agente impara quell'indirizzo e lo memorizza.

**Riconcilia.** Quando la notifica arriva in PEC, l'agente la legge, la associa alla fattura, e aggiorna lo stato: *emessa → ricevuta da SdI → consegnata al destinatario*. Se arriva uno scarto, legge il codice di errore, corregge, e se siamo entro i 5 giorni la rinvia con lo stesso progressivo.

**Tutto questo senza che tu compili un modulo. Senza che tu apra un software di fatturazione. Senza che tu copi un dato da un foglio a un altro.**

## Lo stato si aggiorna da solo

Il punto non è "invia la fattura". È che **ogni fattura ha uno stato, e lo stato si aggiorna da solo**.

Quando l'agente invia la fattura, la scheda cliente nel CRM si aggiorna: numero, data, importo, stato. Quando la RicevutaConsegna arriva: *consegnata*, con data e ora. Se arriva uno scarto: *scartata*, con il motivo.

Non c'è un foglio da aggiornare. Non c'è una mail da controllare. Lo stato è il risultato di un processo che legge la PEC, parse il file, e scrive il dato nel posto giusto.

Questo vale anche per il **software contabile**: le fatture sono già strutturate — date, importi, IVA, stato — pronte per essere importate. Il contabile non riparte da zero.

## Tutto questo gira in locale

L'intero flusso — lettura dei dati, costruzione del file, validazione, invio PEC, riconciliazione — gira su ILAI. 

Questo non è un dettaglio tecnico. È la differenza tra un sistema che ti dice "la fattura è stata inviata" e un sistema che *sa* — perché il dato è stato letto, scritto e riconciliato da un processo che gira dentro i tuoi confini.

La fatturazione non è un modulo da compilare. Non è un software da aggiornare a sé. È uno stato che si aggiorna da solo, dentro il flusso che già hai. Come abbiamo visto nel post sul [CRM intelligente](/il-crm-intelligente), lo stato della compagnia non è un database da alimentare: è il risultato di un sistema che lavora.

ILAI, come al solito, è quel collega di lavoro a vui puoi dire, mi fai la fattura di X EUR per il cliente Y. Trovi
i dati nel nostro CRM. Quando è pronta fammela ricontrollare. Poi creami la copia di cortesia, e manda la fattura allo
SDI via PEC.

Visto che ci sei, mi fai anche la previsione di cassa per il prossimo mese, partendo dai dati della banca? Perche' 
quando tutto è connesso, diventa parte di un flusso, ed hai la capacitá di andare piú veloce, e sapere esattamente
quello che succede all'interno della tua azienda.

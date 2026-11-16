---
title: "Bilbo: la sentinella sulla montagna"
categories: security, ilai, automation
excerpt: "Ogni giorno qualcuno pubblica una vulnerabilità nelle tue dipendenze. Bilbo è la sentinella: scansa, propone, verifica. E quando il lavoro va oltre il deterministico, ILAI prende il sopravvento."
permalink: /bilbo-lasentinella-sulla-montagna
lang: it
description: "Bilbo: il processo deterministico che gira ogni giorno, apre PR, verifica i test, e registra tutto in un log immutabile. Con ILAI, il sistema non si blocca."
keywords: Bilbo, sentinella sicurezza, sicurezza dipendenze, CVE patching automatico, ILAI, sicurezza locale, audit trail, vulnerabilità software, patching autonomo, sicurezza per PMI, gestione vulnerabilità, sicurezza open source, AI locale sicurezza
page_id: bilbo-sentinella
header:
    teaser: /assets/images/screenshots/bilbo-sentinel-cover.webp
classes: wide
tags: ilai, privacy
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/bilbo-sentinel-cover.webp" alt="Bilbo — The Watcher. Una sentinella sulla cima di una montagna, che guarda l'orizzonte. Il logo Ippocra nell'angolo." style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.9rem;">
  La sentinella non dorme. Non scende in valle. Non ti chiede permesso. Guarda l'orizzonte. E quando vede qualcosa, fa quello che deve: segnala, propone, verifica. E quando arriva il mattino, la valle è più sicura di prima.
</p>

<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;margin:1.5rem 0;">
  <iframe src="https://www.youtube.com/embed/p9wd16fk2Q8" title="Bilbo — The Watcher" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
</div>

# Un mondo nuovo

Con l'avanzamento degli agenti AI e dei tools, abbiamo visto crescere il rischio sicurezza. In particolare, abbiamo anche assistito alla riduzione del lag tra una vulnerabilità segnalata e il suo sfruttamento.

Questo perché gli attaccanti stanno impiegando agenti AI per colpire i sistemi, non appena c'è una possibilità. Questo significa che i team devono reagire molto più velocemente di prima.

Bilbo è stato creato per risolvere questo problema. Il loop è semplice:

  - Bilbo capisce i requisiti e le dipendenze che usi nel tuo repository
  - Bilbo le confronta con i database CVE e vede se c'è qualcosa di applicabile
  - Bilbo propone una patch che risolve quella CVE, e poi gira i test localmente per assicurarsi che tutto sia pronto
  - Bilbo apre una PR (su GitHub o dove tieni il tuo codice), così un essere umano può rivederla e decidere di mergiare.

Quello che rende il tutto molto efficace è che Bilbo è stato scritto per essere guidato da un agente, che può intervenire quando l'approccio deterministico non può risolvere il problema attuale. Bilbo è costruito per essere guidato da ILAI, e per girare ogni giorno — sempre in allerta, a patchare le nuove CVE che vengono scoperte.

Questo ti dà un modo per tenere traccia di cosa sta succedendo, mantenere il tuo codice privato, e integrarlo nel tuo deployment ILAI. Come abbiamo esplorato in [Benvenuto ILAI](/benvenuto-ilai), l'agente locale gira su hardware che possiedi — e Bilbo è il primo workload di sicurezza costruito per esso.

Ogni software che gira in produzione è costruito su migliaia di librerie di terze parti. E ogni giorno, da qualche parte, qualcuno pubblica una vulnerabilità in una di quelle librerie. Un CVE. Un numero. Una porta aperta che, finché non la chiudi, resta aperta.

La patching non è più una decisione umana. È un processo. E il gap tra "vulnerabilità pubblicata" e "il tuo server è patchato" è esattamente dove succede il danno.

Bilbo è la sentinella. Sta sulla montagna. Guarda l'orizzonte. E quando vede qualcosa, agisce.

## Cosa fa Bilbo da solo

Bilbo è un software deterministico. Non ragiona. Non improvvisa. Fa le stesse cinque cose, nello stesso ordine, ogni volta. E le fa bene.

**1. Guarda.** Scansiona le dipendenze dei tuoi servizi contro il database pubblico delle vulnerabilità (OSV) e la lista delle vulnerabilità attivamente sfruttate (CISA KEV). Non scansiona a caso: un CVE è rilevante solo se il pacchetto è dichiarato come dipendenza **e** la versione che usi è effettivamente nel range vulnerabile. Niente falsi positivi da dipendenze transitive che non raggiungi mai.

**2. Decide cosa conta.** Usa il punteggio CVSS reale. Assegna una severità: critico, alto, medio, basso. Non un punteggio inventato. Il punteggio che il CVE porta.

**3. Propone.** Apre una PR. Non un ticket, non una email, non un "da fare." Una pull request con il bump del lockfile, il documento dell'avvisoria, la severità, e la motivazione. Una PR che un essere umano può leggere, approvare, o rifiutare.

**4. Verifica.** Gira i test del repository — i test del repository stesso, non i suoi. Trova il comando di test dalla CI, dalla documentazione, dal Makefile. Gira tutto. Se i test sono verdi, apre la PR. Se sono rossi, non apre niente. **La PR è l'output di una run verde, non l'input di una run di verifica.**

**5. Registra.** Scrive ogni azione in un log append-only, hash-chained. Ogni entry è collegata all'entry precedente con un hash. Modificare un'entry passata rompe la catena. È una prova di integrità, non un database. Non puoi falsificare la storia.

Quello che Bilbo **non** fa: non decide cosa patchare. Non improvvisa una soluzione. Non ragiona su un repository che non ha mai visto. Non ripara una rottura a livello di codice. È una sentinella precisa, non un ingegnere.

E questo è il punto. Il deterministico è affidabile, ripetibile, e verificabile. Ma si ferma quando il lavoro va oltre il deterministico.

## Cosa cambia quando gira ogni giorno

Bilbo da solo è uno strumento. Bilbo che gira ogni giorno, in automatico, è un processo.

La differenza non è la funzionalità. È il tempo.

- **Ogni mattina, un digest.** Non un report che qualcuno deve chiedere. Un messaggio che arriva: cosa è nuovo da ieri, cosa è ancora aperto, cosa è stato risolto. Il delta, non il totale.

- **Il rollout è sequenziale.** Un repository alla volta. Le vulnerabilità si patchano in ordine di severità: prima i critici, poi gli alti, poi i medi. Una PR alla volta. La PR N+1 si apre solo quando la PR N è chiusa. Niente confusione.

- **La catena non si spezza.** Ogni giorno, il processo gira. Ogni giorno, il log si estende. Ogni giorno, la prova si accumula. Non c'è un "ricordati di controllare i CVE." C'è un processo che non dimentica.

- **Il resolved conta.** Il log sa quali CVE sono stati segnalati e quali non vengono più flaggati dai lockfile attuali. La differenza è il numero onesto: "abbiamo chiuso N vulnerabilità." Non un claim. Un calcolo.

**Bilbo che gira ogni giorno non è un tool. È una sentinella che non dorme.**

E quando il lavoro va oltre il deterministico — quando il comando di test non si trova, quando il bump ha rotto il codice, quando il contesto non basta al punteggio — la sentinella si ferma.

A meno che non ci sia qualcosa che può ragionare.

## Bilbo + ILAI: dove diventa una power station

Qui è dove la cosa cambia.

Bilbo è il core deterministico. ILAI è il generalizer.

ILAI è l'agente locale di Ippocra — [quello che abbiamo presentato a giugno](/benvenuto-ilai). Gira su hardware che possiedi. I dati non escono dall'edificio. E quando Bilbo incontra un problema che il deterministico non risolve, il handoff è un packet strutturato: il contesto, i vincoli, il comando per riprendere.

Tre casi in cui il deterministico si ferma e l'agente prende il sopravvento:

**Quando il test non si trova.** Bilbo cerca il comando di test nella CI, nella documentazione, nel Makefile. La maggior parte dei repository ha un segnale chiaro. Ma non tutti. Quando non trova niente, il lavoro di capire "qual è il comando che gira i test in questo repo specifico" è un lavoro di ragionamento, non di parsing. L'agente legge i file del repository, guarda la struttura, e decide. Come farebbe un ingegnere.

**Quando il bump ha rotto qualcosa.** I test sono rossi. Il re-scan è pulito. Il bump è corretto, ma ha rotto l'API. Bisogna guardare il codice, capire cosa è cambiato, e riparare. Questo non è un regex. È un ingegnere che legge, ragiona, e modifica. L'agente ripara il codice dell'applicazione — mai la suite di test — e rigira i test. Verde: il lavoro continua. Rosso: si riprova. Budget esaurito: il CVE resta aperto, e lo sai.

**Quando il contesto non basta al punteggio.** Un CVE ha severità "unknown." Il punteggio non dice nulla. Il contesto — che versione, che pacchetto, che codice lo usa — è ciò che decide se è critico o se è rumore. L'agente legge il contesto e decide. Non un regex. Un ragionamento.

In tutti e tre i casi, il pattern è lo stesso: Bilbo fa il lavoro che sa fare, incontra il limite, e passa il contesto all'agente. L'agente legge, ragiona, risolve. Bilbo riprende da dove si era fermato.

**Bilbo è il core deterministico. ILAI è il generalizer. Insieme, il sistema non si blocca.** Non c'è un punto in cui il processo dice "non so fare questo" e si ferma. C'è un handoff, e il lavoro continua.

Questa è la differenza tra un tool e un sistema. Il tool si ferma quando incontra il limite. Il sistema rende il limite un handoff, non una dead end.

## L'essere umano è al volante

Il punto che non cambia, in nessuna delle tre fasi: **l'essere umano approva.**

Bilbo apre PR. Non le merge. L'approvazione umana è il gate. Non esiste un tier che aggira questa regola. Anche se la severità è critica, anche se i test sono verdi, anche se l'agente ha riparato il codice — la PR resta lì, in attesa di un essere umano che la legga, la capisca, e dica "sì."

Il processo è automatico. La decisione è umana.

Il codice non esce dalla macchina. I dati non attraversano un confine. La prova è nel log. E la scelta finale è tua.

## Dove si fermano gli altri

Esistono ottimi strumenti per trovare le vulnerabilità. Dependabot, Snyk, Trivy, OSV-Scanner. Scano, trovano i CVE, ti fanno una lista. A volte aprono una PR.

**Ma si fermano qui.**

- **La lista non è l'azione.** Ti dà 751 CVE e ti dice "fai tu." Chi decide quale è critico? Chi decide quale tocca davvero il codice che uso? Questa domanda richiede un ingegnere. E l'ingegnere ha altre 750 domande in coda.

- **Il triage è in cloud.** Snyk manda i tuoi lockfile ai suoi server. I tuoi pattern di dipendenza, i tuoi lockfile, il tuo stack — passano da un'infrastruttura di terzi. [Come abbiamo analizzato nel post sui costi](/cloud-vs-locale-cost), il modello cloud non costa solo di più — dà a qualcun altro una copia dei tuoi dati.

- **Nessuno verifica.** La PR si apre. I test girano? Il bump ha rotto qualcosa? La vulnerabilità è davvero chiusa? La maggior parte degli strumenti non lo sa.

- **Nessuna prova.** Se un auditor ti chiede "dimostra che sei al sicuro," cosa gli mostri? Un report PDF? Un claim? Non è una prova.

| | Dependabot / Snyk / Trivy | **Bilbo + ILAI** |
|---|---|---|
| Trova i CVE | ✅ | ✅ |
| Chiude il ciclo (patch → verifica) | in parte | ✅ |
| Triage sul raggio d'impatto reale | ❌ | ✅ locale |
| Il codice esce dalla macchina | di solito sì | **no** |
| Ripara quando il bump rompe | ❌ | ✅ (ILAI) |
| Scopre il test quando non è documentato | ❌ | ✅ (ILAI) |
| Traccia di audit immutabile | ❌ | ✅ hash-chained |

**Noi non siamo un CVE list migliore. Siamo il ciclo chiuso, con la prova, e l'agente che risolve dove il deterministico si ferma.**

## Cosa significa per la tua azienda

Se hai software che gira in produzione — un sito, un'app, un server, una API — Bilbo + ILAI ti dà:

- **Visibilità.** Sai quali vulnerabilità hai, da quando le hai, e cosa è stato fatto. Non è un report. È il log.
- **Automazione.** Il processo gira ogni giorno. Non c'è un "ricordati di controllare i CVE." C'è un digest che arriva ogni mattina.
- **Verifica.** Ogni patch è testata. Ogni PR è l'output di una run verde.
- **Prova.** Il log append-only, hash-chained, è la prova di integrità.
- **Località.** Il codice non esce dalla macchina. I dati non attraversano un confine.
- **Controllo.** L'essere umano approva. Sempre.

---

*La sicurezza non è un progetto. È un processo. E il processo non si fa da solo — a meno che non ci sia un sistema che lo fa per te, un agente che risolve dove il sistema si ferma, e un essere umano che dice "sì."*

[Come abbiamo visto nel post sul [costo vero di un'AI in cloud](/cloud-vs-locale-cost), la domanda non è "cloud o locale". È chi possiede cosa.](/it/ilai/)

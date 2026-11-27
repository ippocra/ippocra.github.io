---
title: "Capovolgere l'agente: il caso per il managed agent"
categories: news
excerpt: "Nell'agentic software l'LLM guida, il codice è il suo strumento. Nel managed agent il verso è rovesciato: è il codice a chiamare l'LLM."
permalink: /capovolgere-lagente-il-caso-per-il-managed-agent
lang: it
description: "Nel managed agent non è l'LLM a guidare: è un nucleo deterministico a chiamarlo, solo dove non basta. Specializzazione senza fine-tuning."
keywords: managed agent, agente gestito, agentic software, LLM, nucleo deterministico, specializzazione LLM senza fine-tuning, intelligenza artificiale locale, ILAI, architettura AI, AI per PMI
page_id: managed-agent-flip
header:
    teaser: /assets/images/screenshots/managed-agent-orchestra-director.webp
classes: wide
tags: ilai, ai
---

<p style="text-align:center;">
  <img src="/assets/images/screenshots/managed-agent-orchestra-director.webp" alt="Il direttore d'orchestra che alza la bacchetta: il momento in cui il violino prende il solo. Illustrazione piatta, tre colori." style="max-width:920px;width:100%;border-radius:12px;box-shadow:0 4px 24px rgba(15,59,46,0.10);margin:1.5rem 0;"/>
</p>
<p style="text-align:center;font-size:0.92rem;color:#5b6b63;margin-top:-0.6rem;">
  Il direttore non suona. Decide il momento in cui il violino prende il solo. È così che funziona un managed agent.
</p>

# Due direzioni opposte

**Nell'agentic software il protagonista è l'LLM, e il codice è il suo strumento.** Il modello ragiona, decide, e chiama le funzioni che gli servono: il codice è una libreria specializzata, a sua disposizione.

**Nel managed agent il verso è rovesciato.** A guidare è un nucleo deterministico, codice scritto per fare una cosa precisa. E l'LLM non comanda: lo si chiama quando serve, nel momento esatto in cui il deterministico da solo non basta.

Non è una sfumatura. È il rovesciamento dell'architettura. Stesso modello, stesso hardware, ma chi dà le indicazioni è l'altro.

# Uno scrigno, non una piattaforma

Il nucleo deterministico di un managed agent non è una piattaforma. Non cerca di generalizzare, non vuole essere riutilizzato per qualsiasi cosa.

È uno scrigno: stretto, su misura, costruito per fare una cosa specifica in modo affidabile. C'è un flusso di lavoro da seguire, una serie di vincoli da rispettare, e un punto esatto in cui serve un giudizio che il codice da solo non sa dare. Lo scrigno sa dov'è quel punto. Chiamare l'LLM è una sua decisione, non un'eccezione.

La differenza con l'agentic software è proprio qui: lì il modello decide *quando* e *cosa* chiamare, dentro uno spazio di possibilità aperto; qui lo spazio è chiuso, il codice sa cosa sta facendo e chiede aiuto soltanto quando non può procedere da solo. È il rovescio di un [agente o una chat](/agente-o-chat): non il modello che corre libero, ma il lavoro che segue un percorso e che, nei punti giusti, si affida a un'intelligenza.

# Comportamento da modello addestrato, senza addestrarlo

Questo è il punto che ci tiene svegli.

Un modello addestrato per un compito *conosce* il dominio: le sue risposte sono state modellate per rispondere in un certo modo, con un certo registro, per un certo scopo. Ma addestrarlo costa: dati, GPU, tempo, e un modello che invecchia ogni volta che il modello di base cambia.

Il managed agent ottiene lo stesso effetto **senza toccare il modello.** Il codice costruisce il contesto giusto, fissa i vincoli sulla risposta, valida il risultato e ha già pronto un piano alternativo se l'LLM sbaglia. Il modello non *conosce* il dominio: ci viene *condotto*. Stesso comportamento specializzato in uscita, zero costi di addestramento.

È la differenza tra formare un musicista e dare a un musicista esperto il coperto, la partitura e un direttore che lo tiene in linea.

# Il limite, detto chiaro

L'analogia ha un bordo, e vale la pena segnalarlo.

Addestrare un modello cambia la sua *natura*: il modello cambia. Lo scrigno non cambia nulla. Forma il contesto, valida la risposta, gestisce la via d'uscita — ma il modello resta quello che è. Un modello addestrato *conosce* il dominio; un modello condotto da uno scrigno *viene guidato dentro* il dominio.

Il che significa che uno scrigno è buono solo quanto i suoi prompt, la sua validazione e la sua via d'uscita. Se il modello risponde male e la validazione non se ne accorge, il managed agent eredita l'errore. La robustezza non viene dal modello: viene dal codice che lo circonda.

Questo non è un difetto. È il punto. La robustezza di un managed agent non sta nel modello che è intelligente, ma nel fatto che il codice che lo chiama *sa cosa si aspetta*, e sa cosa fare quando non arriva. Ed è proprio così che funziona [Bilbo](/bilbo-lasentinella-sulla-montagna): un processo deterministico che ogni giorno fa il suo giro, e che quando il lavoro va oltre ciò che il codice sa fare, lascia prendere il sopravvento a [ILAI](/benvenuto-ilai).

# Chi guida?

In un'orchestra il direttore non suona. Decide il momento in cui il violino prende il solo, tiene il tempo, e assicura che l'insieme resti coeso. Il solo è del violino — ma è il direttore che lo rende possibile.

Un managed agent è un'orchestra. Il nucleo deterministico è il direttore. L'LLM è il violino. E il resto dell'insieme è tutto il codice che fa il lavoro, ogni giorno, senza chiedere permesso.

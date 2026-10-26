---
title: "Cosa costa davvero l'AI cloud rispetto a un box locale: i numeri"
categories: ai, business, cost
excerpt: "Lo spreadsheet onesto: un'abbonamento chat sovvenzionato, una build DIY su API, e un agente locale che fa il lavoro. Tre strade, tre fatture molto diverse — e quella che nessuno mette nel foglio di confronto."
permalink: /cloud-vs-locale-cost
lang: it
description: "AI cloud vs AI locale: i numeri veri. ChatGPT Business a €23/utente, una build DIY con setup da €12K + costi token ricorrenti, e ILAI da €350/mese. Tre strade, tre fatture — e il costo nascosto che non c'è in fattura."
keywords: costo AI cloud vs locale, AI locale per PMI, intelligenza artificiale locale aziende, costo agente AI, AI locale costo, confronto cloud on-premise, costo AI per piccola azienda, build vs buy agente AI, costo infrastruttura AI locale, AI per PMI Italia
page_id: cloud-vs-locale-cost
header:
    teaser: /assets/images/screenshots/cloud-vs-local-cost-teaser.webp
classes: wide
tags: ilai, ai, cost, business
---

**"Ok, il concetto di agente lo capisco. Ma quanto costa davvero? Mostrami i numeri."**

Giusto. Questa è la versione-spreadsheet di [l'argomento che abbiamo fatto l'altra volta](/it/agente-o-chat): tre strade per far sì che un'AI faccia il lavoro della tua azienda, con le fatture vere. Nessuna fumisteria, nessun "dipende"."
keywords: costo AI cloud vs locale, AI locale per PMI, intelligenza artificiale locale aziende, costo agente AI, AI locale costo, confronto cloud on-premise, costo AI per piccola azienda, build vs buy agente AI, costo infrastruttura AI locale, AI per PMI Italia
page_id: cloud-vs-locale-cost
header:
    teaser: /assets/images/screenshots/cloud-vs-local-cost-teaser.webp
classes: wide
tags: ilai, ai, cost, business
---

**"Ok, il concetto di agente lo capisco. Ma quanto costa davvero? Mostrami i numeri."**

Giusto. Questa è la versione-spreadsheet di [l'argomento che abbiamo fatto l'altra volta](/it/agente-o-chat): tre strade per far sì che un'AI faccia il lavoro della tua azienda, con le fatture vere. Nessuna fumisteria, nessun "dipende".

Tutti i prezzi sono in euro. I prodotti USA (ChatGPT, Claude) sono fatturati in dollari; abbiamo convertito ai tassi correnti così il confronto è su un'unica valuta.

## Le tre strade

| | **Strada A: Chat in abbonamento** | **Strada B: Build DIY su API** | **Strada C: Agente locale (ILAI)** |
|---|---|---|---|
| Cosa ottieni | Un box di testo a cui parli | Un'API che colleghi ai tuoi sistemi da solo | Un agente che fa il lavoro, su una macchina dove i dati restano |
| Costo di setup | €0 — ti iscrivi | **€8.000–12.000** (tempo dev, integrazione, test) | **€5.000** (on-cloud) / **€8.000** (on-prem) |
| Hardware | Nessuno (il loro cloud) | Un server o VM cloud (~€5.000–7.000, lo compri tu) | Incluso (on-prem) / incluso (on-cloud) |
| Mensile | €23–89 **a persona** | Costi token: variabili, crescono con l'uso | **€350/mese** (on-cloud, tutti gli utenti, skill inclusa) |
| Chi lo costruisce | Tu fai prompt | Tu (o uno studio di sviluppo) | Costruiamo la skill per il tuo processo |
| Dove stanno i dati | Nel loro cloud (USA) | Dove punti tu l'API | Nel tuo ufficio / infrastruttura italiana |
| Tempo al primo risultato | 5 minuti (una risposta in chat) | 6–12 settimane (build + test + training) | 2–4 settimane (onboarding + skill) |

## Strada A: La chat sovvenzionata

ChatGPT Business: **€23/utente/mese**. Claude Team: **€18/utente/mese** (fatturazione annuale). L'agente sempre-acceso di OpenAI (Dot): **€89/utente/mese**, incluso in Pro.

La matematica che sembra buona:

- Azienda da 5 persone → 5 × €23 = **€115/mese**. Tutto qui.
- Aggiungi Dot per la persona che ha bisogno di autonomia: €89 in più.

La matematica che non sembra buona:

- Ogni utente che ha un box di chat passa la giornata **a parlarci e a copiare-incollare la risposta nel proprio sistema**. Il lavoro non succede *nel* sistema. Una persona lo sposta.
- I dati (i nomi dei tuoi clienti, i tuoi prezzi, i tuoi margini) vanno su un server USA a ogni prompt. I ToS dicono che non servono ad addestrare il modello. Va bene. Ma stanno **fuori dalle tue mura**, e quello non è un costo che puoi mettere in un conto.
- Il prezzo a persona significa che la fattura cresce con l'organico. Dieci persone → €890/mese e hai ancora dieci persone che copiano-incollano.

**Il vero costo della Strada A non è l'abbonamento. Sono le ore di persona che continui a spendere a fare il lavoro che la chat avrebbe dovuto risparmiare.**

## Strada B: La build fai-da-te

Questo è quello che fa un team tecnico (o un'agenzia di sviluppo) quando decide "ce la facciamo da soli": prendere l'API del modello, scrivere lo strato di integrazione, costruire il workflow, testarlo, mantenerlo.

I numeri onesti:

- **Setup: €8.000–12.000** in tempo di sviluppo (o onorari di agenzia). Questo è l'integrazione, la logica del workflow, i test. Non un progetto da weekend.
- **Hardware: €5.000–7.000** se vai on-prem (server GPU). Se resti sulla loro API, questo è zero ma la fattura token è tua.
- **Costi token: ricorrenti.** Un'azienda che processa 200 documenti al mese su un'API di classe GPT-4o paga circa **€150–400/mese** in token. Un'azienda che fa voice, OCR e processing documentale su larga scala paga di più. La fattura cresce con l'uso, e paghi a pagina, a token, a ora di audio.
- **Manutenzione: ricorrente.** L'API cambia. Il modello cambia. L'integrazione si rompe. Qualcuno deve tenerla d'occhio.

Il costo totale del primo anno di una build DIY, fatta bene: **€15.000–25.000** (setup + hardware + un anno di token). E hai costruito un sistema che fa *un* workflow, per *una* azienda, questo è zero ma la fattura token è tua.
- **Costi token: ricorrenti.** Un'azienda che processa 200 documenti al mese su un'API di classe GPT-4o paga circa **€150–400/mese** in token. Un'azienda che fa voice, OCR e processing documentale su larga scala paga di più. La fattura cresce con l'uso, e paghi a pagina, a token, a ora di audio.
- **Manutenzione: ricorrente.** L'API cambia. Il modello cambia. L'integrazione si rompe. Qualcuno deve tenerla d'occhio.

Il costo totale del primo anno di una build DIY, fatta bene: **€15.000–25.000** (setup + hardware + un anno di token). E hai costruito un sistema che fa *un* workflow, per *una* azienda, di cui ora possiedi la manutenzione.

Questa strada ha senso se hai un team di ingegneria il cui lavoro è costruire software. Non ha senso per un'azienda commerciale, un'officina, o un professionista che vuole il lavoro fatto, non un progetto da gestire.

## Strada C: L'agente locale

Questo è ILAI. I numeri:

- **On-cloud: €5.000 di setup + €350/mese.** La skill è costruita per il tuo processo, l'integrazione è fatta, i dati restano su infrastruttura italiana (Seeweb, Regolo Zero Data Retention). Un agente serve tutta l'azienda — non a persona.
- **On-prem: €8.000 di setup + hardware (~€5.000, acquistato dal cliente) + manutenzione.** Tutto gira nel tuo ufficio. Voice, OCR, agente — niente fatturazione a pagina, a token, a ora. I dati non escono mai dall'edificio.

Quello che i €350/mese ti danno che i €23 della chat non danno:

- Il lavoro è **fatto**, non risposto. Fatture riconciliate, preventivi preparati, CRM aggiornato, documenti processati — dentro i tuoi sistemi, in continuo.
- La fattura non cresce con l'organico. Cinque persone o quindici: stesso agente, stesso prezzo.
- La capacità è **tua**. La skill codifica il tuo processo. La macchina è tua (on-prem) o tua (on-cloud, unità dedicata). Quando smetti di pagare, fermi il servizio — ma il pattern di lavoro, la conoscenza dell'integrazione, i dati: sono tuoi.
- Voice, OCR, video: **nessun costo API a unità.** Un abbonamento cloud ti fattura a pagina, a token, a ora di audio. Il box locale li fa in blocco.

## La voce che nessuno mette sullo spreadsheet

C'è un costo che non compare su nessuna fattura:

**Il costo dei dati fuori dalle tue mura.**

Per la maggior parte delle PMI, non è una sanzione GDPR. È: la tua lista clienti, i tuoi prezzi, i tuoi margini, i tuoi termini con i fornitori — seduti in un cloud USA, processati da un terzo, governati da un ToS che non hai scritto tu. Il rischio è basso se non filtra niente. L'esposizione è totale se filtra qualcosa.

Nessun abbonamento cloud offre un modo per evitarlo a qualsiasi fascia di prezzo. L'opzione on-prem non è un add-on premium; è l'unica configurazione in cui i dati fisicamente non escono.

## Il confronto onesto

| La tua situazione | La strada giusta |
|---|---|
| Vuoi una chat intelligente per te, uso personale | **Strada A.** È più economica, è abbastanza buona, e non è quello che vendiamo. |
| Hai un team di ingegneria che costruisce software di mestiere | **Strada B.** Ti godrai il build, e sarà tuo. |
| Vuoi il lavoro fatto, nei tuoi sistemi, con i tuoi dati, senza gestire un progetto | **Strada C.** L'agente è costruito, l'integrazione è fatta, i dati restano. |
| Vuoi il lavoro fatto E i dati non possono uscire dall'edificio | **Strada C, on-prem.** L'unica configurazione che lo garantisce. |

Il numero che conta non è la fee mensile. È la domanda da cui siamo partiti: **chi fa il lavoro.** La chat a €23 risponde. L'agente a €350 lo fa.

## In sintesi

- **Strada A (chat):** €23–89 a persona/mese. Economica. Ma il lavoro lo fai ancora tu; la chat ti dà solo una risposta più veloce.
- **Strada B (DIY):** €15–25K il primo anno. Lo costruisci tu, è tuo, lo mantieni tu. Ha senso se l'ingegneria è il tuo mestiere.
- **Strada C (agente locale):** €350/mese, tutti gli utenti, skill inclusa. Il lavoro è fatto, i dati restano, il conto non cresce con l'organico.
- **Il costo nascosto:** i dati nel cloud di qualcun altro. Non in fattura. Nel registro dei rischi.

## FAQ

**La chat a €23 è davvero così tanto peggio?**

Per una persona che vuole fare domande e avere risposte: no, va bene. Per un'azienda il cui lavoro va *eseguito* — fatture, preventivi, documenti, CRM — la chat è un passaggio, non l'arrivo. Le mosse le fai ancora tu.

**Perché la strada DIY è €12K e non €500?**

Perché "chiamare l'API" è il 5% del lavoro. L'altro 95% è: capire il tuo processo, costruire l'integrazione nel tuo specifico ERP/gestionale, gestire i casi limite, testare con dati reali, e mantenerlo quando l'API cambia. Sono settimane di ingegneria, non un weekend.

**Perché ILAI è €350/mese e non €35 a utente?**

Perché non è uno strumento a persona. È un agente che fa il lavoro dell'azienda. La skill si costruisce una volta, per il processo dell'azienda. Aggiungere un utente non aggiunge lavoro all'agente.

**Cosa significa concretamente "on-cloud" per i miei dati?**

Unità dedicata su infrastruttura italiana (Seeweb), inferenza certificata Regolo Zero Data Retention. I tuoi dati non vanno in un cloud condiviso, non vanno negli USA, non servono ad addestrare un modello condiviso. È un deployment privato, non un'istanza SaaS.

**Posso partire on-cloud e passare on-prem più tardi?**

Sì. La skill, la logica dell'integrazione, i pattern di lavoro si trasferiscono. La migrazione è un passo hardware + deployment, non una ricostruzione.

---

[Nel prossimo post di questa serie](/it/build-vs-buy-agente), guarderemo la domanda che segue: costruire l'agente da soli vs prenderlo pronto — il costo reale in tempo, denaro, e la bolletta ambientale di una GPU che gira 24/7 nel tuo ufficio.

[Vuoi vedere i numeri applicati al processo della tua azienda? Parliamone.](/it/ilai/cloud/)

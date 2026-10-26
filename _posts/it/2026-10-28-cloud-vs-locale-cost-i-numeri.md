---
title: "Quanto costa davvero un'AI in cloud vs una AI locale: i numeri"
categories: ai, business, costo
excerpt: "La tabella onesta: la chat in abbonamento, la build DIY con API, e l'agente locale che fa il lavoro. Tre strade, tre fatture molto diverse — e il costo che nessuno mette sul foglio di confronto."
permalink: /cloud-vs-locale-cost
lang: it
description: "AI cloud vs AI locale: i numeri reali. ChatGPT Business a $25/utente, una build DIY con API a €12K di setup + token in corso, e ILAI da €350/mese. Tre strade, tre fatture — e il costo nascosto che non compare in fattura."
keywords: costo AI cloud vs locale, cloud AI vs on-premise cost, costo AI on-premise, agente AI costo, AI locale per PMI, intelligenza artificiale locale aziende, costo AI per PMI, AI agent business cost, on-premise AI cost, costo agente AI fai-da-te
page_id: cloud-vs-locale-cost
header:
    teaser: /assets/images/screenshots/agent-vs-chat-teaser.webp
classes: wide
tags: ilai, ai, costo, business
---

**"Ok, il punto dell'agente lo ho capito. Ma quanto costa davvero? Mostrami i numeri."**

Giusto. Questa è la versione-spreadsheet di [l'argomento che abbiamo fatto l'altra volta](/it/agente-o-chat): tre strade per far sì che un'AI faccia il lavoro della tua azienda, con le fatture vere. Nessuna fumisteria, nessun "dipende".

## Le tre strade

| | **Strada A: Chat in abbonamento** | **Strada B: Build DIY con API** | **Strada C: Agente locale (ILAI)** |
|---|---|---|---|
| Cosa ottieni | Un box di testo con cui parlare | Un'API che tu cabli nei tuoi sistemi | Un agente che fa il lavoro, su una macchina dove i dati restano |
| Costo di setup | €0 — ti iscrivi | **€8.000–12.000** (tempo dev, integrazione, test) | **€5.000** (on-cloud) / **€8.000** (on-prem) |
| Hardware | Nessuno (il loro cloud) | Un server o VM cloud (~€5.000–7.000, lo compri tu) | Incluso (on-prem) / incluso (on-cloud) |
| Mensile | $25–100 **a persona** | Costi token: variabili, crescono con l'uso | **€350/mese** (on-cloud, tutti gli utenti, skill inclusa) |
| Chi lo costruisce | Tu fai prompt | Tu (o una software house) | Noi costruiamo la skill per il tuo processo |
| Dove stanno i dati | Nel loro cloud (USA) | Dove punti tu l'API | Nel tuo ufficio / infrastruttura italiana |
| Tempo al primo risultato | 5 minuti (una risposta di chat) | 6–12 settimane (build + test + tuning) | 2–4 settimane (onboarding + skill) |

## Strada A: La chat sussidiata

ChatGPT Business: **$25/utente/mese**. Claude Team: **$20/utente/mese**. L'agente always-on di OpenAI (Dot): **$100/utente/mese**, incluso nel piano Pro.

Il conto che sembra buono:

- Azienda di 5 persone → 5 × $25 = **$125/mese**. Tutto qui.
- Aggiungi Dot per la persona che ha bisogno di autonomia: $100 in più.

Il conto che non sembra buono:

- Ogni utente che ha un box di chat passa la giornata a **parlarci e copiare-incollare la risposta nel suo sistema**. Il lavoro non succede *nel* sistema. Lo muove una persona.
- I dati (nomi dei clienti, prezzi, margini) vanno su un server USA a ogni prompt. Il ToS dice che non vengono usati per addestrare il modello. Bene. Ma sono **fuori dalle tue mura**, e questo non è un costo che puoi mettere in fattura.
- Il prezzo a persona fa crescere il conto con l'organico. Dieci persone → $1.000/mese e hai ancora dieci persone che copiano-incollano.

**Il costo reale della Strada A non è l'abbonamento. È il tempo che continui a spendere a fare il lavoro che la chat avrebbe dovuto risparmiarti.**

## Strada B: La build fai-da-te

È quello che fa un team tecnico (o una software house) quando decide "ce la facciamo da soli": prende l'API del modello, scrive il layer di integrazione, costruisce il workflow, lo testa, lo mantiene.

I numeri onesti:

- **Setup: €8.000–12.000** in tempo dev (o fee di agenzia). È l'integrazione, la logica del workflow, i test. Non un progetto da weekend.
- **Hardware: €5.000–7.000** se vai on-prem (server GPU). Se resti sulla loro API, è zero ma la fattura dei token è tua.
- **Costi token: in corso.** Un'azienda che processa 200 documenti al mese tramite un'API GPT-4o-class paga circa **€150–400/mese** in token. Un'azienda che fa voce, OCR e processing documentale su scala paga di più. Il conto cresce con l'uso, e paghi per pagina, per token, per ora di audio.
- **Manutenzione: in corso.** L'API cambia. Il modello cambia. L'integrazione si rompe. Qualcuno deve starci sopra.

Il costo totale del primo anno di una build DIY, fatta bene: **€15.000–25.000** (setup + hardware + un anno di token). E hai costruito un sistema che fa *un* workflow, per *un'azienda*, di cui ora ti occupi tu la manutenzione.

Questa strada ha senso se hai un team ingegneristico il cui lavoro è costruire software. Non ha senso per un'azienda di commercio, un'officina, o uno studio professionale che vuole il lavoro fatto, non un progetto da gestire.

## Strada C: L'agente locale

È ILAI. I numeri:

- **On-cloud: €5.000 setup + €350/mese.** La skill è fatta per il tuo processo, l'integrazione è pronta, i dati restano su infrastruttura italiana (Seeweb, Regolo Zero Data Retention). Un agente serve tutta l'azienda — non a persona.
- **On-prem: €8.000 setup + hardware (~€5.000, comprato dal cliente) + manutenzione.** Tutto gira nel tuo ufficio. Voce, OCR, agente — niente billing per-pagina, per-token, per-ora. I dati non lasciano l'edificio.

Cosa ti dà il €350/mese che il $25/chat non ti dà:

- Il lavoro viene **fatto**, non risposto. Fatture riconciliate, preventivi preparati, CRM aggiornato, documenti processati — dentro i tuoi sistemi, in modo continuo.
- Il conto non cresce con l'organico. Cinque persone o quindici: stesso agente, stesso prezzo.
- La capacità è **tua**. La skill incapsula il tuo processo. La macchina è tua (on-prem) o tua (on-cloud, unità dedicata). Quando smetti di pagare, smetti il servizio — ma il pattern di lavoro, la conoscenza dell'integrazione, i dati: sono tuoi.
- Voce, OCR, video: **niente costo API per unità.** Un abbonamento cloud addebita per pagina, per token, per ora di audio. La box locale li gira in fisso.

## La riga che nessuno mette sullo spreadsheet

C'è un costo che non compare in nessuna fattura:

**Il costo dei dati fuori dalle tue mura.**

Per la maggior parte delle PMI non è una multa GDPR. È: la tua lista clienti, i tuoi prezzi, i tuoi margini, i termini dei tuoi fornitori — su un cloud USA, processati da un terzo, governati da un ToS che non hai scritto tu. Il rischio è basso se non succede nulla. L'esposizione è totale se succede qualcosa.

Nessun abbonamento cloud offre un modo per evitarlo, a nessun livello di prezzo. L'opzione on-prem non è un upgrade premium: è l'unica configurazione in cui i dati fisicamente non escono.

## Il confronto onesto

| La tua situazione | La strada giusta |
|---|---|
| Vuoi una chat intelligente per te, uso personale | **Strada A.** Costa meno, basta e avanza, e non è quello che vendiamo. |
| Hai un team ingegneristico che costruisce software di mestiere | **Strada B.** Ti divertirai a costruirlo, e sarà tuo. |
| Vuoi il lavoro fatto, nei tuoi sistemi, con i tuoi dati, senza gestire un progetto | **Strada C.** L'agente è fatto, l'integrazione è pronta, i dati restano. |
| Vuoi il lavoro fatto E non puoi avere i dati fuori dalla sede | **Strada C, on-prem.** L'unica configurazione che lo garantisce. |

Il numero che conta non è il canone mensile. È la domanda con cui abbiamo cominciato: **chi fa il lavoro.** La chat da $25 risponde. L'agente da €350 fa.

## In sintesi

- **Strada A (chat):** $25–100 a persona/mese. Economica. Ma il lavoro lo fai ancora tu; la chat ti dà solo una risposta più veloce.
- **Strada B (DIY):** €15–25K il primo anno. Lo costruisci tu, è tuo, lo mantieni tu. Ha senso se l'ingegneria è il tuo mestiere.
- **Strada C (agente locale):** €350/mese, tutti gli utenti, skill inclusa. Il lavoro è fatto, i dati restano, il conto non cresce con l'organico.
- **Il costo nascosto:** i dati nel cloud di qualcun altro. Non in fattura. Nel registro dei rischi.

## FAQ

**La chat da $25 è davvero così tanto peggio?**

Per una persona che vuole fare domande e ricevere risposte: no, va bene. Per un'azienda il cui lavoro deve essere *eseguito* — fatture, preventivi, documenti, CRM — la chat è un passo, non il traguardo. I pezzi li muovi ancora tu.

**Perché la build DIY costa €12K e non €500?**

Perché "chiama l'API" è il 5% del lavoro. L'altro 95% è: capire il tuo processo, costruire l'integrazione nel tuo specifico gestionale, gestire i casi limite, testare con dati reali, e mantenere il tutto quando l'API cambia. Sono settimane di ingegneria, non un weekend.

**Perché ILAI costa €350/mese e non €35 a persona?**

Perché non è un tool a persona. È un agente che fa il lavoro dell'azienda. La skill si costruisce una volta, per il processo aziendale. Aggiungere un utente non aggiunge lavoro all'agente.

**Cosa significa "on-cloud" per i miei dati, in pratica?**

Unità dedicata su infrastruttura italiana (Seeweb), inference certificato Regolo Zero Data Retention. I tuoi dati non vanno su un cloud condiviso, non vanno negli USA, non vengono usati per addestrare un modello condiviso. È un deployment privato, non un'istanza SaaS.

**Posso partire on-cloud e spostarmi on-prem più tardi?**

Sì. La skill, la logica di integrazione e i pattern di lavoro si trasferiscono. La migrazione è un passo di hardware + deployment, non una ricostruzione.

---

[Nel prossimo post della serie](/it/costruire-o-prendere-lagente) guarderemo la domanda che viene dopo: costruire l'agente da soli vs prenderlo pronto — il costo reale in tempo, in soldi e nella bolletta ambientale di una GPU che gira 24/7 nel tuo ufficio.

[Vuoi vedere i numeri applicati al processo della tua azienda? Parliamo.](/it/ilai/cloud/)

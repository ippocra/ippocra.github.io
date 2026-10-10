---
layout: landing_page
lang: it
permalink: /ippo/checklist-emergenza
nav_type: ippo
title: "Checklist documenti medici da portare al pronto soccorso"
description: "Scarica la checklist gratuita con tutti i documenti medici da portare al pronto soccorso: allergie, farmaci in uso, gruppo sanguigno, diagnosi, contatti. Prepara l'elenco in 2 minuti."
keywords: "checklist pronto soccorso, documenti emergenza medica, elenco farmaci allergie, scheda emergenza sanitaria, cosa portare al pronto soccorso"
---

<div class="page__inner-wrap" style="max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem 4rem;">

  <h1>Checklist documenti medici da portare al pronto soccorso</h1>

  <p style="font-size: 1.1rem; color: #444;">
    Quando succede l'imprevisto, ogni minuto conta. Questa checklist ti aiuta a preparare
    in <strong>2 minuti</strong> l'elenco dei dati medici essenziali da mostrare al personale
    sanitario in caso di emergenza.
  </p>

  <p style="color: #666; font-size: 0.95rem;">
    Compila i campi, poi <strong>scarica il PDF</strong> e tienilo sempre con te (borsellino,
    portafoglio, borsa dell'auto). Aggiornalo ogni volta che cambi medico o farmaco.
  </p>

  <form id="checklist-form" action="#" onsubmit="return false;" style="margin-top: 1.5rem;">

    <h2>Dati personali</h2>
    <div class="form-row">
      <label for="nome">Nome e cognome</label>
      <input type="text" id="nome" name="nome" placeholder="Mario Rossi" required>
    </div>
    <div class="form-row">
      <label for="nascita">Data di nascita</label>
      <input type="date" id="nascita" name="nascita">
    </div>
    <div class="form-row">
      <label for="codice-fiscale">Codice fiscale</label>
      <input type="text" id="codice-fiscale" name="codice-fiscale" placeholder="RSSMRA85A01H501U" maxlength="16" style="text-transform: uppercase;">
    </div>
    <div class="form-row">
      <label for="gruppo-sanguigno">Gruppo sanguigno</label>
      <select id="gruppo-sanguigno" name="gruppo-sanguigno">
        <option value="">— seleziona —</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>AB+</option><option>AB-</option>
        <option>O+</option><option>O-</option>
        <option value="sconosciuto">Non lo so</option>
      </select>
    </div>
    <div class="form-row">
      <label for="allergie">Allergie (alimentari, farmaci, altre)</label>
      <textarea id="allergie" name="allergie" rows="2" placeholder="Es. penicillina, arachidi, lattice…"></textarea>
    </div>
    <div class="form-row">
      <label for="farmaci">Farmaci in uso</label>
      <textarea id="farmaci" name="farmaci" rows="3" placeholder="Es. omeprazolo 20mg mattina, metformina 500mg…"></textarea>
    </div>
    <div class="form-row">
      <label for="patologie">Patologie croniche / precedenti chirurgici</label>
      <textarea id="patologie" name="patologie" rows="2" placeholder="Es. diabete tipo 2, ipertensione, intervento al cuore…"></textarea>
    </div>

    <h2>Contatti</h2>
    <div class="form-row">
      <label for="medico">Medico di fiducia</label>
      <input type="text" id="medico" name="medico" placeholder="Dr. Bianchi — 051 123456">
    </div>
    <div class="form-row">
      <label for="contatto">Persona di contatto in emergenza</label>
      <input type="text" id="contatto" name="contatto" placeholder="Nome e telefono">
    </div>
    <div class="form-row">
      <label for="assicurazione">ASL / Assicurazione sanitaria</label>
      <input type="text" id="assicurazione" name="assicurazione" placeholder="Es. ASL Bologna / assicurazione integrativa">
    </div>

    <div id="preview" class="preview" style="display: none; margin-top: 2rem;">
      <h2>Anteprima</h2>
      <div id="preview-content" class="preview-content"></div>
    </div>

    <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
      <button type="button" id="btn-generate" class="btn btn--primary">Genera PDF</button>
      <a id="btn-download" href="#" download="checklist-emergenza.pdf" class="btn btn--inverse" style="display: none;">Scarica PDF</a>
    </div>

    <p style="margin-top: 1.5rem; font-size: 0.85rem; color: #777;">
      Il PDF viene generato direttamente nel tuo browser: i dati non vengono inviati a nessun server.
    </p>
  </form>

  <h2 style="margin-top: 3rem;">Come usare la checklist</h2>
  <ol>
    <li><strong>Compila i campi</strong> con i dati reali (nome, allergie, farmaci, contatti).</li>
    <li><strong>Clicca "Genera PDF"</strong> per vedere l'anteprima.</li>
    <li><strong>Scarica il PDF</strong> e salvalo sul telefono, nel cloud e su una chiavetta.</li>
    <li><strong>Stampa una copia</strong> e tienila nel borsellino, nella borsa dell'auto e in casa.</li>
    <li><strong>Aggiorna</strong> ogni volta che cambi farmaco, medico o diagnosi.</li>
  </ol>

  <div class="cta-box" style="margin-top: 3rem; padding: 2rem; background: #f0f7f4; border-radius: 12px; text-align: center;">
    <h2 style="margin-top: 0;">Hai i referti sparsi tra app, email e cartelle?</h2>
    <p style="max-width: 500px; margin: 0.75rem auto 1.5rem;">
      Con <strong>Ippo</strong> riuni in un unico posto sicuro tutti i documenti sanitari
      della tua famiglia — referti, ricette, certificati — e li condividi in un tap
      con il medico che ti segue.
    </p>
    <a href="https://app.ippocra.com/register" class="btn btn--primary">Prova Ippo gratis</a>
  </div>

  <h2 style="margin-top: 3rem;">Domande frequenti</h2>

  <details>
    <summary>Chi può usare questa checklist?</summary>
    <p>
      Tutti: adulti, anziani, genitori con figli minori. Per i bambini, aggiungi
      le allergie, i farmaci pediatrici e i contatti dei genitori.
    </p>
  </details>

  <details>
    <summary>Devo portare anche i referti cartacei?</summary>
    <p>
      Se possibile, sì. La checklist è l'indice: indica <em>cosa</em> portare.
      In emergenza, i medici apprezzeranno avere a portata di mano le analisi
      recenti, le radiografie e le cartelle cliniche.
    </p>
  </details>

  <details>
    <summary>I dati che compilo vengono salvati da qualche parte?</summary>
    <p>
      No. Il PDF viene generato interamente nel tuo browser con JavaScript:
      nessun dato viene inviato a un server. Una volta scaricato, il file
      è solo tuo.
    </p>
  </details>

  <details>
    <summary>Con che frequenza devo aggiornare la checklist?</summary>
    <p>
      Ogni volta che cambi medico, aggiungi o smetti un farmaco, scopri un'allergia
      o ricevi una nuova diagnosi. Una volta all'anno, rifai il punto.
    </p>
  </details>

</div>

<link rel="stylesheet" href="/assets/css/checklist-emergenza.css">
<script src="/assets/js/checklist-emergenza.js" defer></script>

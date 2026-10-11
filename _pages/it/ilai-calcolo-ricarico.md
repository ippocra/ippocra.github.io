---
layout: landing_page
lang: it
permalink: /ilai/calcolo-ricarico-artigiano/
title: "Calcolo ricarico artigiano — Calcolatore gratuito"
description: "Calcolatore gratuito per artigiani e PMI: inserisci materiali, manodopera e costi fissi, ottieni il prezzo corretto del preventivo in 30 secondi. Niente signup, funziona subito."
nav_type: gateway
classes: ["page--calcolo-ricarico"]
---

<section class="section section--hero">
  <div class="container">
    <p class="section-label">Strumento gratuito</p>
    <h1 class="section-title">Calcolo ricarico artigiano</h1>
    <p class="section-sub">
      Inserisci materiali, manodopera e costi fissi. Il calcolatore restituisce il
      prezzo corretto del preventivo in 30 secondi. Gratuito, senza registrazione,
      funziona subito nel browser.
    </p>
  </div>
</section>

<section class="section section--calculator">
  <div class="container">
    <div class="calc-grid">
      <!-- Input panel -->
      <div class="calc-panel">
        <h2 class="calc-panel-title">Dati del lavoro</h2>

        <div class="calc-field">
          <label for="desc">Descrizione lavoro <span class="req">*</span></label>
          <input type="text" id="desc" placeholder="Es. Sostituzione lavandino cucina" />
        </div>

        <div class="calc-field">
          <label for="settore">Settore</label>
          <select id="settore">
            <option value="generico" selected>Generale</option>
            <option value="termoidraulica">Termoidraulica</option>
            <option value="elettrico">Elettrico</option>
            <option value="carpenteria">Carpenteria / falegnameria</option>
            <option value="tinteggiatura">Tinteggiatura / imbiancatura</option>
            <option value="muratura">Muratura / ristrutturazione</option>
            <option value="pulizie">Pulizie / manutenzione</option>
            <option value="altro">Altro</option>
          </select>
          <small class="calc-hint" id="settore-hint">Il margine suggerito si adatta al settore selezionato.</small>
        </div>

        <div class="calc-field">
          <label for="materiali">Costo materiali (€) <span class="req">*</span></label>
          <input type="number" id="materiali" min="0" step="0.01" placeholder="0.00" />
        </div>

        <div class="calc-field">
          <label for="ore">Ore di manodopera</label>
          <input type="number" id="ore" min="0" step="0.5" placeholder="0" value="1" />
        </div>

        <div class="calc-field">
          <label for="costo-orario">Costo orario (€/h)</label>
          <input type="number" id="costo-orario" min="0" step="0.50" placeholder="25.00" value="25.00" />
        </div>

        <div class="calc-field">
          <label for="spese">Costi fissi / oneri generali (€)</label>
          <input type="number" id="spese" min="0" step="0.01" placeholder="0.00" value="0" />
          <small class="calc-hint">Affitto, utenze, assicurazione, ammortamento attrezzi. Regola empirica: 10–15% del costo materiali.</small>
        </div>

        <div class="calc-field">
          <label for="margine">Margine (%)</label>
          <div class="calc-range-row">
            <input type="range" id="margine" min="0" max="100" value="30" />
            <span id="margine-val" class="calc-range-val">30%</span>
          </div>
          <small class="calc-hint" id="margine-hint">Margine tipico: 20–40%</small>
        </div>

        <div class="calc-field">
          <label for="iva">IVA (%)</label>
          <select id="iva">
            <option value="0">0%</option>
            <option value="5">5% (ridotta)</option>
            <option value="10">10% (intermedia)</option>
            <option value="22" selected>22% (ordinaria)</option>
          </select>
        </div>

        <button class="btn btn--primary btn--full" id="btn-calc" type="button">Calcola prezzo</button>
      </div>

      <!-- Result panel -->
      <div class="calc-panel calc-panel--result">
        <h2 class="calc-panel-title">Risultato</h2>

        <div id="result-empty" class="calc-empty">
          <p>Inserisci i dati e clicca <strong>Calcola prezzo</strong>.</p>
        </div>

        <div id="result-box" style="display:none;">
          <div class="result-row result-row--label">
            <span>Descrizione</span>
            <span id="r-desc">—</span>
          </div>
          <div class="result-row">
            <span>Materiali</span>
            <span id="r-materiali">€ 0.00</span>
          </div>
          <div class="result-row">
            <span>Manodopera</span>
            <span id="r-manodopera">€ 0.00</span>
          </div>
          <div class="result-row">
            <span>Oneri generali</span>
            <span id="r-spese">€ 0.00</span>
          </div>
          <div class="result-row result-row--subtotal">
            <span>Subtotale</span>
            <span id="r-subtotale">€ 0.00</span>
          </div>
          <div class="result-row">
            <span>Margine (<span id="r-margine-pct">30</span>%)</span>
            <span id="r-margine">€ 0.00</span>
          </div>
          <div class="result-row result-row--total">
            <span>Totale + IVA</span>
            <span id="r-totale">€ 0.00</span>
          </div>
          <div class="result-row result-row--pre-iva">
            <span>Importo netto</span>
            <span id="r-imponibile">€ 0.00</span>
          </div>
          <div class="result-row">
            <span>IVA</span>
            <span id="r-iva">€ 0.00</span>
          </div>
        </div>

        <!-- Breakdown bar -->
        <div id="result-bar" style="display:none;">
          <div class="bar">
            <div class="bar-segment bar--materiali" id="bar-materiali"></div>
            <div class="bar-segment bar--manodopera" id="bar-manodopera"></div>
            <div class="bar-segment bar--spese" id="bar-spese"></div>
            <div class="bar-segment bar--margine" id="bar-margine"></div>
          </div>
          <div class="bar-legend">
            <span class="legend-item"><span class="legend-dot" style="background:#2563eb"></span>Materiali</span>
            <span class="legend-item"><span class="legend-dot" style="background:#60a5fa"></span>Manodopera</span>
            <span class="legend-item"><span class="legend-dot" style="background:#5a5a6a"></span>Oneri</span>
            <span class="legend-item"><span class="legend-dot" style="background:#e8a838"></span>Margine</span>
          </div>
        </div>

        <!-- Optional email capture -->
        <div id="email-capture" style="display:none;" class="email-capture">
          <p class="email-capture-title">Vuoi una copia di questo calcolo?</p>
          <p class="email-capture-sub">Inserisci la tua email e ti inviamo il riepilogo.</p>
          <form id="email-form" class="email-form">
            <input type="email" id="email" placeholder="La tua email" required />
            <button type="submit" class="btn btn--secondary">Invia</button>
          </form>
          <p id="email-success" class="email-success" style="display:none;">✓ Grazie, invieremo il riepilogo a breve.</p>
          <p id="email-error" class="email-error" style="display:none;">Ops, qualcosa è andato storto. Riprova.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section section--cta">
  <div class="container cta-box">
    <h2 class="section-title section-title--sm">Stanco di fare i conti a mano?</h2>
    <p class="section-sub">
      Con <strong>ILAI</strong> i preventivi si scrivono da soli. ILAI legge i tuoi
      documenti, applica i tuoi costi e genera il preventivo in secondi.
      Niente calcoli manuali, niente errori.
    </p>
    <a href="/ippo" class="btn btn--primary btn--lg">Scopri ILAI</a>
  </div>
</section>

<!-- FAQ -->
<section class="section section--faq" id="faq">
  <div class="container">
    <h2 class="section-title">Domande frequenti</h2>
    <div class="faq-list">
      <details>
        <summary>Come si calcola il ricarico su un preventivo?</summary>
        <p>
          Il ricarico si calcola sommando materiali, costi di manodopera e costi fissi
          aziendali (affitto, utenze, assicurazione, ammortamento attrezzi), poi applicando
          il margine desiderato. Formula:
          <strong>Prezzo = (Materiali + Manodopera + Oneri) × (1 + Margine%)</strong>.
          Il calcolatore sopra fa tutto automaticamente.
        </p>
      </details>
      <details>
        <summary>Quale margine dovrebbe usare un artigiano?</summary>
        <p>
          I margini tipici per gli artigiani in Italia variano dal 20% al 40%, a seconda
          del settore. Per lavori specializzati o ad alta qualifica, il margine può
          arrivare al 50% o oltre. Per lavori standard o mercati molto competitivi,
          scende al 15–20%. Usa il calcolatore per vedere come cambia il prezzo
          finale a diversi livelli di margine.
        </p>
      </details>
      <details>
        <summary>Dovrei includere i costi fissi?</summary>
        <p>
          Sì. I costi fissi (affitto, utenze, assicurazione, commercialista,
          ammortamento attrezzi) vanno sempre inclusi nel costo base. Il calcolatore
          ha un campo dedicato. Se non sei sicuro, una regola empirica è il 10–15%
          del costo dei materiali.
        </p>
      </details>
      <details>
        <summary>Come uso questo calcolatore per i miei preventivi?</summary>
        <p>
          Inserisci i dati del lavoro (materiali, ore, costo orario, oneri) e il
          calcolatore restituisce il prezzo totale con margine applicato. Puoi
          salvare, stampare o condividere il risultato. Per gestire i preventivi
          in modo professionale e automatico, dai un'occhiata a ILAI.
        </p>
      </details>
    </div>
  </div>
</section>

<style>
/* Calculator styles — inlined for no-JS visibility */
.section--hero { padding: 48px 0 32px; }
.section--calculator { padding: 32px 0 48px; }
.section--cta { padding: 48px 0; }
.section--faq { padding: 48px 0; }

.section-label {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
  margin-bottom: 8px;
}

.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
  color: #111;
}

.section-title--sm { font-size: clamp(22px, 4vw, 32px); }

.section-sub {
  font-size: 16px;
  color: #444;
  line-height: 1.6;
  max-width: 640px;
}

.calc-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 768px) {
  .calc-grid { grid-template-columns: 1fr; }
}

.calc-panel {
  background: #f8f9fa;
  border: 1px solid #e2e5e9;
  border-radius: 12px;
  padding: 28px;
}

.calc-panel--result { background: #f0f2f5; }

.calc-panel-title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2563eb;
  margin-bottom: 20px;
}

.calc-field { margin-bottom: 16px; }

.calc-field label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.calc-field .req { color: #dc2626; }

.calc-field input[type="text"],
.calc-field input[type="number"],
.calc-field select {
  width: 100%;
  padding: 10px 14px;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  color: #111;
  box-sizing: border-box;
}

.calc-field input:focus,
.calc-field select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
}

.calc-field input[type="range"] {
  width: 100%;
  accent-color: #2563eb;
}

.calc-range-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.calc-range-val {
  font-size: 14px;
  font-weight: 600;
  color: #2563eb;
  min-width: 40px;
}

.calc-hint {
  display: block;
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: background 0.2s, transform 0.1s;
}

.btn--primary { background: #2563eb; color: #fff; }
.btn--primary:hover { background: #1d4ed8; }
.btn--secondary { background: #e2e5e9; color: #333; }
.btn--secondary:hover { background: #d1d5db; }
.btn--full { width: 100%; }
.btn--lg { padding: 16px 32px; font-size: 16px; }

.calc-empty {
  color: #888;
  font-size: 14px;
  text-align: center;
  padding: 40px 0;
}

.result-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e5e9;
  font-size: 14px;
}

.result-row:last-child { border-bottom: none; }
.result-row span:first-child { color: #666; }
.result-row span:last-child { font-weight: 500; color: #111; }
.result-row--label span:last-child { font-weight: 600; }

.result-row--subtotal {
  border-top: 2px solid #d1d5db;
  margin-top: 4px;
  padding-top: 12px;
}
.result-row--subtotal span { font-weight: 600; }

.result-row--total {
  border-top: 2px solid #2563eb;
  margin-top: 8px;
  padding-top: 12px;
}
.result-row--total span { font-size: 18px; font-weight: 700; color: #2563eb; }
.result-row--pre-iva { font-size: 13px; }

.bar {
  display: flex;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 16px;
  background: #e2e5e9;
}

.bar-segment { height: 100%; transition: width 0.4s ease; }
.bar--materiali { background: #2563eb; }
.bar--manodopera { background: #60a5fa; }
.bar--spese { background: #5a5a6a; }
.bar--margine { background: #e8a838; }

.bar-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #666;
}

.legend-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* CTA */
.cta-box { text-align: center; max-width: 600px; }

/* FAQ */
.faq-list { max-width: 700px; }

.faq-list details {
  background: #f8f9fa;
  border: 1px solid #e2e5e9;
  border-radius: 8px;
  margin-bottom: 8px;
}

.faq-list details summary {
  padding: 16px 20px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  list-style: none;
  color: #111;
}

.faq-list details summary::-webkit-details-marker { display: none; }
.faq-list details[open] summary { border-bottom: 1px solid #e2e5e9; }

.faq-list details p {
  padding: 16px 20px;
  font-size: 14px;
  color: #555;
  line-height: 1.7;
}

/* Email capture */
.email-capture {
  margin-top: 24px;
  padding: 20px;
  background: #fff;
  border: 1px solid #e2e5e9;
  border-radius: 8px;
}

.email-capture-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #111;
}

.email-capture-sub {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.email-form {
  display: flex;
  gap: 8px;
}

.email-form input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.email-form input:focus {
  outline: none;
  border-color: #2563eb;
}

.email-success { color: #16a34a; font-size: 14px; margin-top: 8px; }
.email-error { color: #dc2626; font-size: 14px; margin-top: 8px; }
</style>

<script src="/assets/js/calcolo-ricarico.js" defer></script>

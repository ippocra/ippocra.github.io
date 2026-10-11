/**
 * Calcolo ricarico artigiano — client-side calculator
 *
 * Features:
 * - Real-time calculation (materials + labor + overhead + margin + VAT)
 * - Sector-based margin hints
 * - Optional email capture (POSTs to ilai.ippocra.com/api/submit)
 * - Umami event tracking for analytics
 */
(function () {
  'use strict';

  var btnCalc = document.getElementById('btn-calc');
  var margineRange = document.getElementById('margine');
  var margineVal = document.getElementById('margine-val');
  var margineHint = document.getElementById('margine-hint');
  var settoreSelect = document.getElementById('settore');
  if (!btnCalc) return;

  // --- Sector-based margin hints ---
  var SECTOR_MARGINS = {
    termoidraulica: { min: 30, max: 50, label: '30–50%' },
    elettrico: { min: 30, max: 50, label: '30–50%' },
    carpenteria: { min: 25, max: 45, label: '25–45%' },
    tinteggiatura: { min: 20, max: 35, label: '20–35%' },
    muratura: { min: 20, max: 40, label: '20–40%' },
    pulizie: { min: 20, max: 35, label: '20–35%' },
    altro: { min: 20, max: 40, label: '20–40%' }
  };

  function updateSectorHint() {
    var sector = settoreSelect ? settoreSelect.value : 'generico';
    var m = SECTOR_MARGINS[sector];
    if (m && margineHint) {
      margineHint.textContent = 'Margine tipico: ' + m.label;
      // Set range to the midpoint of the suggested range
      var mid = Math.round((m.min + m.max) / 2);
      margineRange.value = mid;
      margineVal.textContent = mid + '%';
    }
  }

  if (settoreSelect) {
    settoreSelect.addEventListener('change', updateSectorHint);
  }

  // --- Margin slider display ---
  margineRange.addEventListener('input', function () {
    margineVal.textContent = margineRange.value + '%';
  });

  // --- Format currency ---
  function fmt(n) {
    return '€ ' + n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // --- Umami tracking ---
  function track(name, data) {
    if (typeof window.umami === 'undefined') {
      window.umami = window.umami || [];
      window.umami.push(['track', name, data]);
      return;
    }
    try {
      window.umami.track(name, data || {});
    } catch (e) {
      console.warn('[Calc Tracking] Failed to track:', name, e);
    }
  }

  function getLang() {
    var html = document.documentElement.lang || '';
    if (html === 'it') return 'it';
    if (html === 'en') return 'en';
    return 'en';
  }

  // --- Calculation ---
  var lastResult = null;

  function calc() {
    var desc = document.getElementById('desc').value.trim();
    var materiali = parseFloat(document.getElementById('materiali').value) || 0;
    var ore = parseFloat(document.getElementById('ore').value) || 0;
    var costoOrario = parseFloat(document.getElementById('costo-orario').value) || 0;
    var spese = parseFloat(document.getElementById('spese').value) || 0;
    var margine = parseFloat(margineRange.value) || 0;
    var iva = parseFloat(document.getElementById('iva').value) || 0;
    var settore = settoreSelect ? settoreSelect.value : 'generico';

    // Validation
    if (!desc) {
      var msg = getLang() === 'it' ? 'Inserisci la descrizione del lavoro.' : 'Please enter a job description.';
      alert(msg);
      return;
    }
    if (materiali === 0 && ore === 0) {
      var msg2 = getLang() === 'it' ? 'Inserisci almeno un costo (materiali o manodopera).' : 'Please enter at least one cost (materials or labor).';
      alert(msg2);
      return;
    }

    var manodopera = ore * costoOrario;
    var subtotale = materiali + manodopera + spese;
    var margineVal = subtotale * (margine / 100);
    var imponibile = subtotale + margineVal;
    var ivaVal = imponibile * (iva / 100);
    var totale = imponibile + ivaVal;

    lastResult = {
      desc: desc, settore: settore,
      materiali: materiali, ore: ore, costoOrario: costoOrario,
      manodopera: manodopera, spese: spese, subtotale: subtotale,
      margine: margine, margineVal: margineVal,
      imponibile: imponibile, iva: iva, ivaVal: ivaVal, totale: totale
    };

    // Update result panel
    document.getElementById('result-empty').style.display = 'none';
    document.getElementById('result-box').style.display = 'block';
    document.getElementById('result-bar').style.display = 'block';
    document.getElementById('email-capture').style.display = 'block';

    document.getElementById('r-desc').textContent = desc;
    document.getElementById('r-materiali').textContent = fmt(materiali);
    document.getElementById('r-manodopera').textContent = fmt(manodopera);
    document.getElementById('r-spese').textContent = fmt(spese);
    document.getElementById('r-subtotale').textContent = fmt(subtotale);
    document.getElementById('r-margine-pct').textContent = margine;
    document.getElementById('r-margine').textContent = fmt(margineVal);
    document.getElementById('r-totale').textContent = fmt(totale);
    document.getElementById('r-imponibile').textContent = fmt(imponibile);
    document.getElementById('r-iva').textContent = fmt(ivaVal);

    // Update breakdown bar
    var baseTotal = materiali + manodopera + spese + margineVal || 1;
    document.getElementById('bar-materiali').style.width = (materiali / baseTotal * 100) + '%';
    document.getElementById('bar-manodopera').style.width = (manodopera / baseTotal * 100) + '%';
    document.getElementById('bar-spese').style.width = (spese / baseTotal * 100) + '%';
    document.getElementById('bar-margine').style.width = (margineVal / baseTotal * 100) + '%';

    // Track calculation event
    track('calculation-completed', {
      language: getLang(),
      sector: settore,
      margin: margine,
      vat: iva,
      total: Math.round(totale * 100) / 100,
      path: window.location.pathname
    });
  }

  btnCalc.addEventListener('click', calc);

  // Allow Enter key to trigger calculation
  var inputs = document.querySelectorAll('.calc-field input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); calc(); }
    });
  }

  // --- Email capture (optional) ---
  var emailForm = document.getElementById('email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = document.getElementById('email').value.trim();
      if (!email) return;

      var payload = {
        source: 'calcolo-ricarico-artigiano',
        page: window.location.pathname,
        language: getLang(),
        email: email,
        name: document.getElementById('desc').value.trim() || '',
        data: lastResult || {}
      };

      var success = document.getElementById('email-success');
      var error = document.getElementById('email-error');
      var submitBtn = emailForm.querySelector('button[type="submit"]');

      // Disable button while submitting
      submitBtn.disabled = true;
      submitBtn.textContent = getLang() === 'it' ? 'Invio...' : 'Sending...';

      // POST to the lead intake API on ilai.ippocra.com
      fetch('https://ilai.ippocra.com/api/calc-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (res) {
        if (res.ok) {
          emailForm.style.display = 'none';
          success.style.display = 'block';
          track('email-capture-success', { language: getLang(), path: window.location.pathname });
        } else {
          throw new Error('API returned ' + res.status);
        }
      })
      .catch(function () {
        error.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = getLang() === 'it' ? 'Invia' : 'Send';
        track('email-capture-failed', { language: getLang(), path: window.location.pathname });
      });
    });
  }

  // --- Track page engagement ---
  setTimeout(function () {
    track('calc-page-10s', { language: getLang(), path: window.location.pathname });
  }, 10000);

})();

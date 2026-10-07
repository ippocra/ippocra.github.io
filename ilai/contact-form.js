/**
 * ILAI — Contact form handler.
 *
 * The contact forms on ilai.ippocra.com (and, cross-site, on
 * ideallab.ippocra.com) used to POST to a mailto: URI, which browsers
 * cannot handle — submissions were silently discarded. This script
 * intercepts the form and forwards name/email/message to the intake API
 * at /api/contact (on ilai.ippocra.com), which emails info@ippocra.com.
 *
 * Usage: include after script.js, before </body>.
 *   <script src="/contact-form.js"></script>
 * Cross-site pages may pass the endpoint via data-api on the form.
 */
(function () {
  'use strict';

  var DEFAULT_ENDPOINT = '/api/contact';
  var EMAIL_RE = /^\w[\w.\-+]*@[\w.\-]+\.\w{2,}$/;

  function t(form, key) {
    var el = form.querySelector('.contact-form-msg-' + key);
    if (!el) return null;
    el.style.display = '';
    el.textContent = '';
    return el;
  }

  function showSuccess(form) {
    var ok = form.querySelector('.contact-form-success');
    var err = form.querySelector('.contact-form-error');
    if (err) err.style.display = 'none';
    if (ok) {
      ok.style.display = 'block';
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showError(form, message) {
    var el = t(form, 'error');
    if (el) {
      el.style.display = 'block';
      el.textContent = message;
    } else {
      window.alert(message);
    }
  }

  function initForm(form) {
    var endpoint = form.getAttribute('data-api') || DEFAULT_ENDPOINT;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (form.elements.name ? form.elements.name.value : '').trim();
      var email = (form.elements.email ? form.elements.email.value : '').trim().toLowerCase();
      var message = (form.elements.message ? form.elements.message.value : '').trim();
      var isItalian = (document.documentElement.lang || '').toLowerCase().indexOf('it') === 0;

      if (!name || !email || !message) {
        showError(form, isItalian ? 'Per favore compila tutti i campi.' : 'Please fill in all fields.');
        return;
      }
      if (!EMAIL_RE.test(email)) {
        showError(form, isItalian ? 'Per favore inserisci un indirizzo email valido.' : 'Please enter a valid email address.');
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var originalLabel = btn ? btn.textContent : '';
      if (btn) {
        btn.disabled = true;
        btn.textContent = isItalian ? 'Invio…' : 'Sending…';
      }

      var payload = {
        name: name,
        email: email,
        message: message,
        page: window.location.origin + window.location.pathname
      };

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().catch(function () { return {}; }); })
        .then(function (data) {
          if (data && data.ok) {
            form.reset();
            showSuccess(form);
          } else {
            showError(form, isItalian ? "Si è verificato un errore. Per favore riprova o scrivi a info@ippocra.com." : "Something went wrong. Please try again or email info@ippocra.com.");
            if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
          }
        })
        .catch(function () {
          showError(form, isItalian ? "Si è verificato un errore di rete. Per favore riprova o scrivi a info@ippocra.com." : "Network error. Please try again or email info@ippocra.com.");
          if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var forms = document.querySelectorAll('form.contact-form');
    for (var i = 0; i < forms.length; i++) {
      initForm(forms[i]);
    }
  });
})();

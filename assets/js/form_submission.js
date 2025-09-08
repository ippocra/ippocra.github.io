    /* -------------------------------------------------
       1️⃣ Funzione di utilità per utm_source
       ------------------------------------------------- */
    function setUtmSourceIfEmpty(fallbackValue) {
      const el = document.getElementById('utm_source');
      if (!el) return;
      if (el.value.trim() !== '') return;   // già valorizzato → non toccare
      el.value = fallbackValue;
    }

    /* -------------------------------------------------
       2️⃣ Popolamento UTM (con fallback per utm_source)
       ------------------------------------------------- */
    (() => {
      const url = new URL(window.location);

      const setHidden = (id, param) => {
        const el = document.getElementById(id);
        if (el) el.value = url.searchParams.get(param) || '';
      };

      // UTM diversi da source
      setHidden('utm_medium',   'utm_medium');
      setHidden('utm_campaign', 'utm_campaign');
      setHidden('utm_content',  'utm_content');

      // ----- utm_source -----
      const qsUtmSource = url.searchParams.get('utm_source') || '';
      if (qsUtmSource) {
        document.getElementById('utm_source').value = qsUtmSource;
      } else {
        // Qui scegli il valore di fallback che preferisci.
        // Puoi anche prendere da un'altra query string, da una variabile globale, ecc.
        // Esempio statico:
        setUtmSourceIfEmpty('default-source');

        // Esempio dinamico (se avessi una variabile globale):
        // setUtmSourceIfEmpty(window.myFallbackUtmSource);
      }
    })();

    /* -------------------------------------------------
       3️⃣ Gestione submit + reCAPTCHA v3
       ------------------------------------------------- */
    const form   = document.getElementById('ippocraForm');
    const btn    = form.querySelector('button[type="submit"]');
    const thanks = document.getElementById('thanksMsg');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-2 inline-block"
             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"/>
        </svg> Verificando…`;

      try {
        // 3.1 Ottieni il token da reCAPTCHA v3
        const token = await grecaptcha.execute(
          '6LfhA8ErAAAAAH-lPKmj2J_KglSFM6r-Sti3Vc8_',
          {action: 'submit_form'}
        );

        // 3.2 Aggiungi il token al FormData
        const fd = new FormData(form);
        fd.append('g-recaptcha-response', token);

        // 3.3 Invio al webhook (Make)
        const response = await fetch(form.action, {
          method: 'POST',
          body: fd,
        });

        if (!response.ok) {
          const txt = await response.text();
          throw new Error(`Server ha risposto ${response.status}: ${txt}`);
        }

        // (opzionale) consuma eventuale JSON
        const ct = response.headers.get('content-type') || '';
        if (ct.includes('application/json')) await response.json();

        // 3.4 UI di successo
        form.reset();
        thanks.classList.remove('hidden');
        setTimeout(() => thanks.classList.add('hidden'), 5000);
      } catch (err) {
        console.error('Errore invio form:', err);
        alert(err.message || 'Problema durante l\'invio. Riprova più tardi.');
      } finally {
        btn.disabled = false;
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"/>
          </svg>
          Invia la richiesta`;
      }
    });
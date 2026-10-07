/**
 * ILAI — Custom event tracking for Umami analytics
 * 
 * Tracks: CTA clicks, form submissions, video plays, scroll depth,
 * page engagement, and contact interactions.
 * 
 * Usage: Include after script.js, before </body>
 *        <script src="tracking.js"></script>
 */

(function() {
  'use strict';

  // --- Helpers ---
  function track(name, data) {
    if (typeof window.umami === 'undefined') {
      // Umami not loaded yet — try queueing
      window.umami = window.umami || [];
      window.umami.push(['track', name, data]);
      return;
    }
    try {
      window.umami.track(name, data || {});
    } catch(e) {
      console.warn('[ILAI Tracking] Failed to track:', name, e);
    }
  }

  function getSection(el) {
    const section = el.closest('section');
    return section ? section.querySelector('h2')?.textContent?.trim() || 'unknown-section' : 'unknown-section';
  }

  function getLang() {
    const html = document.documentElement.lang;
    return html === 'it' ? 'it' : 'en';
  }

  function getURLPath() {
    return window.location.pathname;
  }

  // --- CTA Button Tracking ---
  function trackCTAs() {
    const ctas = document.querySelectorAll(
      'a.btn, button[type="submit"], a[href="#contact"], ' +
      'a[href*="mailto:"], ' +
      'a[href*="capabilities"], a[href*="capacita"]'
    );

    ctas.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        const href = btn.getAttribute('href') || '';

        // Explicit waitlist CTA (path B entry point)
        if (btn.hasAttribute('data-track') && btn.getAttribute('data-track') === 'waitlist-cta') {
          track('waitlist-cta', {
            section: getSection(btn),
            language: getLang(),
            path: getURLPath()
          });
          return;
        }

        let action = 'cta-click';
        let label = '';

        if (href.includes('mailto:')) {
          action = 'cta-email-click';
          label = 'info@ippocra.com';
        } else if (href.includes('contact') || href === '#contact') {
          action = 'cta-scroll-to-contact';
        } else if (href.includes('capabilities') || href.includes('capacita')) {
          action = 'cta-to-capabilities';
        } else if (btn.closest('a')) {
          action = 'cta-main';
        }

        track(action, {
          section: getSection(btn),
          language: getLang(),
          path: getURLPath()
        });

        // Add a small delay to ensure event is sent before form navigation
        if (action === 'cta-email-click' && btn.getAttribute('href').includes('mailto:')) {
          e.preventDefault();
          setTimeout(function() {
            window.location.href = btn.getAttribute('href');
          }, 500);
        }
      });
    });
  }

  // --- Form Submission Tracking ---
  function trackForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
      form.addEventListener('submit', function() {
        // Small delay to ensure event is captured
        setTimeout(function() {
          track('form-submission', {
            form: 'contact',
            section: getSection(form),
            language: getLang(),
            path: getURLPath()
          });
        }, 100);
      });
    });
  }

  // --- Video Play Tracking ---
  function trackVideos() {
    const videoIframes = document.querySelectorAll('iframe[src*="youtube"], iframe[src*="youtu.be"]');
    videoIframes.forEach(function(iframe) {
      // Track initial interaction with video (user clicks play)
      // We can't intercept YouTube clicks directly, so track page view with video
      iframe.addEventListener('load', function() {
        // Only track if video is in viewport
        const rect = iframe.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          track('video-visible', {
            url: iframe.src,
            section: 'hero-video',
            language: getLang(),
            path: getURLPath()
          });
        }
      });
    });
  }

  // --- Scroll Depth Tracking ---
  function trackScrollDepth() {
    let tracked = { 25: false, 50: false, 75: false, 90: false };
    const thresholds = Object.keys(tracked).map(Number);

    function check() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      thresholds.forEach(function(th) {
        if (depth >= th && !tracked[th]) {
          tracked[th] = true;
          track('scroll-depth-' + th + 'pct', {
            section: getSection(document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2) || document.body),
            language: getLang(),
            path: getURLPath()
          });
        }
      });
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          check();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Page Engagement (time on page) ---
  function trackEngagement() {
    // Track users who stay >10s, >30s, >60s
    setTimeout(function() {
      track('engagement-10s', { language: getLang(), path: getURLPath() });
    }, 10000);
    setTimeout(function() {
      track('engagement-30s', { language: getLang(), path: getURLPath() });
    }, 30000);
    setTimeout(function() {
      track('engagement-60s', { language: getLang(), path: getURLPath() });
    }, 60000);
  }

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      trackCTAs();
      trackForms();
      trackVideos();
      trackScrollDepth();
      trackEngagement();

      // Also track page view with language
      track('pageview', { language: getLang() });
    }, 500); // Slight delay to ensure Umami is fully loaded
  });

})();

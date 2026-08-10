/**
 * Ippocra — Custom event tracking for Umami analytics
 * 
 * Tracks: product CTAs (ILAI/Ippo/Ideallab), demo requests,
 * blog engagement, scroll depth, and navigation patterns.
 * 
 * Included via layout default.html (body-end) or inline in pages.
 */

(function() {
  'use strict';

  var TRACKED = false;

  function track(name, data) {
    if (typeof window.umami === 'undefined') {
      window.umami = window.umami || [];
      window.umami.push(['track', name, data]);
      return;
    }
    try {
      window.umami.track(name, data || {});
    } catch(e) {
      console.warn('[Ippocra Tracking] Failed to track:', name, e);
    }
  }

  function getPageLang() {
    var html = document.documentElement.lang || '';
    if (html === 'it') return 'it';
    if (html === 'el') return 'el';
    return 'en';
  }

  function getCurrentPath() {
    return window.location.pathname;
  }

  // --- Product CTA Tracking ---
  function trackProductCTAs() {
    var ilaiCtas = document.querySelectorAll(
      'a[href*="ilai"], a[href*="ILAI"], a:contains("Discover ILAI"), ' +
      'a:contains("ILAI use cases"), .gateway-card-ilai a'
    );

    // More reliable: find all CTA buttons in gateway cards
    var gatewayCards = document.querySelectorAll('.gateway-card');
    gatewayCards.forEach(function(card) {
      var brand = card.querySelector('.gateway-brand-mark') || card.querySelector('.gateway-brand');
      var brandName = brand ? (brand.textContent || '').trim() : 'unknown';
      if (brandName === 'IPPOCRA PRODUCT') brandName = 'ILAI';

      var cta = card.querySelector('a[href]');
      if (cta) {
        cta.addEventListener('click', function(e) {
          track('product-cta', {
            product: brandName,
            target: cta.getAttribute('href') || '',
            language: getPageLang(),
            path: getCurrentPath()
          });

          // Delay for email/contact CTAs
          if (cta.getAttribute('href') && cta.getAttribute('href').includes('mailto:')) {
            e.preventDefault();
            setTimeout(function() {
              window.location.href = cta.getAttribute('href');
            }, 500);
          }
        });
      }
    });

    // Also track main nav ILAI link clicks
    var ilaiLinks = document.querySelectorAll('a[href*="ilai"]');
    ilaiLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        track('nav-to-ilai', {
          from: getCurrentPath(),
          language: getPageLang()
        });
      });
    });
  }

  // --- Blog Reading Tracking ---
  function trackBlogEngagement() {
    var isBlogPost = document.querySelector('.post, .post-preview, .single') ||
                     document.querySelector('article.post') ||
                     document.querySelector('.post-header');
    if (!isBlogPost) return;

    setTimeout(function() {
      track('blog-10s', { language: getPageLang(), path: getCurrentPath() });
    }, 10000);
    setTimeout(function() {
      track('blog-30s', { language: getPageLang(), path: getCurrentPath() });
    }, 30000);
    setTimeout(function() {
      track('blog-60s', { language: getPageLang(), path: getCurrentPath() });
    }, 60000);
  }

  // --- Scroll Depth ---
  function trackScrollDepth() {
    var tracked = { 25: false, 50: false, 75: false, 90: false };
    var thresholds = [25, 50, 75, 90];

    function check() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      thresholds.forEach(function(th) {
        if (depth >= th && !tracked[th]) {
          tracked[th] = true;
          track('scroll-depth-' + th + 'pct', {
            language: getPageLang(),
            path: getCurrentPath()
          });
        }
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(check);
        ticking = true;
      }
    });
  }

  // --- Language Switch Tracking ---
  function trackLanguageSwitch() {
    var langSelects = document.querySelectorAll(
      'select[name="lang"], .lang-switcher select, ' +
      'select.polyglot-select, a[hreflang]'
    );
    langSelects.forEach(function(el) {
      el.addEventListener('change', function() {
        track('lang-switch', {
          from: getPageLang(),
          to: el.value || el.getAttribute('hreflang') || 'unknown',
          path: getCurrentPath()
        });
      });
      el.addEventListener('click', function() {
        track('lang-switch', {
          from: getPageLang(),
          to: el.value || el.getAttribute('hreflang') || 'unknown',
          path: getCurrentPath()
        });
      });
    });
  }

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function() {
    if (TRACKED) return;
    TRACKED = true;

    setTimeout(function() {
      trackProductCTAs();
      trackBlogEngagement();
      trackScrollDepth();
      trackLanguageSwitch();

      // Page view with language
      track('pageview', {
        language: getPageLang(),
        path: getCurrentPath()
      });
    }, 500);
  });

})();

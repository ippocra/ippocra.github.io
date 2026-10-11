/**
 * Ippocra — Custom event tracking for Umami analytics
 *
 * Tracks per-product (Ippo, ILAI, Ippocra) CTA clicks, registration
 * funnel, scroll depth, blog engagement, and navigation patterns.
 *
 * Product detection is path-based:
 *   /ippo*   → ippo
 *   /ilai*   → ilai
 *   everything else → ippocra
 *
 * Included via layout default.html (body-end) or inline in pages.
 */

(function() {
  'use strict';

  var TRACKED = false;

  // --- Utilities ---

  function track(name, data) {
    if (typeof window.umami === 'undefined') {
      window.umami = window.umami || [];
      window.umami.push(['track', name, data]);
      return;
    }
    try {
      window.umami.track(name, data || {});
    } catch (e) {
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

  // Detect which product section the visitor is on
  function getProduct() {
    var path = getCurrentPath();
    if (path.indexOf('/ippo') === 0 || path.indexOf('/el/ippo') === 0 || path.indexOf('/en/ippo') === 0) return 'ippo';
    if (path.indexOf('/ilai') === 0 || path.indexOf('/el/ilai') === 0 || path.indexOf('/en/ilai') === 0) return 'ilai';
    return 'ippocra';
  }

  // Classify what a CTA does based on its href
  function classifyCTA(href) {
    if (!href) return 'unknown';
    if (href.indexOf('app.ippocra.com/register') !== -1 || href.indexOf('app.ippocra.com/a/en/register') !== -1) return 'register';
    if (href.indexOf('app.ippocra.com/login') !== -1) return 'login';
    if (href.indexOf('mailto:') !== -1) return 'mailto';
    if (href.indexOf('#') === 0) return 'anchor';
    if (href.indexOf('http') === 0) return 'external';
    return 'internal';
  }

  // Check if an element looks like a CTA button (not a nav link)
  function isCTA(el) {
    if (el.tagName !== 'A') return false;
    var cls = el.className || '';
    return cls.indexOf('main-color-button') !== -1 ||
           cls.indexOf('hero-button') !== -1 ||
           cls.indexOf('wide-button') !== -1 ||
           cls.indexOf('corp-btn') !== -1 ||
           cls.indexOf('secondary-button') !== -1;
  }

  // --- CTA + Register Tracking ---

  function trackCTAs() {
    // Product-level CTA tracking on all button-style links
    var ctas = document.querySelectorAll('a[href]');
    ctas.forEach(function(el) {
      if (!isCTA(el)) return;

      el.addEventListener('click', function() {
        var href = el.getAttribute('href') || '';
        var product = getProduct();
        var ctaType = classifyCTA(href);

        // Main CTA event
        track('cta-click', {
          product: product,
          page: getCurrentPath(),
          cta: ctaType,
          target: href,
          text: (el.textContent || '').trim().substring(0, 60),
          language: getPageLang()
        });

        // Register-specific event (ippocra.com → app.ippocra.com funnel)
        if (ctaType === 'register') {
          track('register-click', {
            product: product,
            page: getCurrentPath(),
            language: getPageLang()
          });
        }

        // Mailto tracking (ILAI "Parlaci" / contact)
        if (ctaType === 'mailto') {
          track('contact-click', {
            product: product,
            page: getCurrentPath(),
            language: getPageLang()
          });
        }
      });
    });

    // Cross-product navigation tracking
    var navLinks = document.querySelectorAll('a[href*="ilai"], a[href*="ippo"]');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        var from = getProduct();
        var href = link.getAttribute('href') || '';
        var to = 'ippocra';
        if (href.indexOf('/ilai') !== -1) to = 'ilai';
        if (href.indexOf('/ippo') !== -1) to = 'ippo';

        if (from !== to) {
          track('nav-cross-product', {
            from: from,
            to: to,
            page: getCurrentPath(),
            language: getPageLang()
          });
        }
      });
    });
  }

  // --- Blog Reading Tracking ---

  function trackBlogEngagement() {
    var isBlogPost = document.querySelector('.post, .post-preview, .single, article.post, .post-header');
    if (!isBlogPost) return;

    var product = getProduct();

    setTimeout(function() {
      track('blog-10s', { product: product, language: getPageLang(), path: getCurrentPath() });
    }, 10000);
    setTimeout(function() {
      track('blog-30s', { product: product, language: getPageLang(), path: getCurrentPath() });
    }, 30000);
    setTimeout(function() {
      track('blog-60s', { product: product, language: getPageLang(), path: getCurrentPath() });
    }, 60000);
  }

  // --- Scroll Depth ---

  function trackScrollDepth() {
    var tracked = { 25: false, 50: false, 75: false, 90: false };
    var thresholds = [25, 50, 75, 90];
    var product = getProduct();

    function check() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var depth = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      thresholds.forEach(function(th) {
        if (depth >= th && !tracked[th]) {
          tracked[th] = true;
          track('scroll-depth-' + th + 'pct', {
            product: product,
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
      'select[name="lang"], .lang-switcher select, select.polyglot-select, a[hreflang]'
    );
    langSelects.forEach(function(el) {
      var handler = function() {
        track('lang-switch', {
          from: getPageLang(),
          to: el.value || el.getAttribute('hreflang') || 'unknown',
          page: getCurrentPath(),
          product: getProduct()
        });
      };
      el.addEventListener('change', handler);
      el.addEventListener('click', handler);
    });
  }

  // --- Initialize ---

  document.addEventListener('DOMContentLoaded', function() {
    if (TRACKED) return;
    TRACKED = true;

    setTimeout(function() {
      trackCTAs();
      trackBlogEngagement();
      trackScrollDepth();
      trackLanguageSwitch();

      // Page view with product context
      track('pageview', {
        product: getProduct(),
        language: getPageLang(),
        path: getCurrentPath()
      });
    }, 500);
  });

})();

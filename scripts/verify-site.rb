#!/usr/bin/env ruby
# verify-site.rb — Post-build verification for ippocra.github.io
#
# Checks masthead selection, page content, and redirect coverage
# across all site categories. Exits 1 on any failure.
#
# Usage (after `bundle exec jekyll build`):
#   ruby scripts/verify-site.rb
#
# In CI (called by .github/workflows/verify.yml)

require 'fileutils'
require 'set'

SITE_DIR = Dir.pwd
# SOURCE_ROOT: where _pages/ lives. Can be passed as first arg or auto-detected.
SOURCE_ROOT = if ARGV[0]
                File.expand_path(ARGV[0])
              elsif File.directory?(File.join(Dir.pwd, '_pages'))
                Dir.pwd
              else
                File.expand_path('..', Dir.pwd)
              end

# ── helpers ──────────────────────────────────────────────────────────────────

$failures = []
$passes   = 0

def check(desc, condition)
  if condition
    $passes += 1
  else
    $failures << desc
    puts "  ✗ FAIL: #{desc}"
  end
end

def read_page(rel_path)
  full = File.join(SITE_DIR, rel_path)
  return nil unless File.exist?(full)
  File.read(full)
end

def has?(html, substring)
  !html.nil? && html.include?(substring)
end

def extract_masthead_logo_href(html)
  return nil if html.nil?
  m = html.match(/class="site-logo"[^>]*href="([^"]*)"/)
  m&.[](1)
end

def extract_nav_hrefs(html)
  return [] if html.nil?
  nav_match = html.match(/<nav[^>]*id="site-nav"[^>]*>(.*?)<\/nav>/m)
  return [] if nav_match.nil?
  nav_match[1].scan(/href="([^"]*)"/).flatten
end

# ── 1. MASTHEAD VERIFICATION ─────────────────────────────────────────────────

puts "\n[1/4] Masthead checks"

# General masthead (masthead-general.html via default.html layout):
#   logo → / (or /en/, /el/), nav: ILAI, Ippo, Blog, Company
# Used by: /, /en/, /el/
general_pages = [
  ['index.html',    '/'],
  ['en/index.html', '/en/'],
  ['el/index.html', '/el/'],
]

general_pages.each do |page, expected_logo|
  html = read_page(page)
  check("#{page}: page exists", !html.nil?)
  next if html.nil?

  logo = extract_masthead_logo_href(html)
  check("#{page}: logo href = #{expected_logo} (got #{logo.inspect})", logo == expected_logo)

  nav = extract_nav_hrefs(html)
  check("#{page}: nav has /ilai/",  nav.any? { |h| h.include?('/ilai/') })
  check("#{page}: nav has /ippo",   nav.any? { |h| h.end_with?('/ippo') })
  check("#{page}: nav has /posts/", nav.any? { |h| h.include?('/posts/') })
  # Company nav: IT/EN use /company-profile/, EL uses /about
  if page.start_with?('el/')
    check("#{page}: nav has company page (/about or /company-profile/)",
          nav.any? { |h| h.include?('/about') || h.include?('/company-profile/') })
  else
    check("#{page}: nav has /company-profile/", nav.any? { |h| h.include?('/company-profile/') })
  end
  # General masthead must NOT have Ippo sub-nav items
  check("#{page}: no /ippo/security in nav", !nav.any? { |h| h.include?('/ippo/security') })
  check("#{page}: no /ippo/medici in nav",   !nav.any? { |h| h.include?('/ippo/medici') })
  check("#{page}: no /ippo/prezzi in nav",   !nav.any? { |h| h.include?('/ippo/prezzi') })
end

# Ippo masthead (masthead-ippo.html via landing_page.html layout):
#   logo → /ippo (or /en/ippo, /el/ippo), nav: Sicurezza, Medici, Imaging, Prezzi + CTA buttons
# Used by: /ippo, /ippo/*, /en/ippo*, /el/ippo*
ippo_pages = [
  ['ippo.html',             '/ippo'],
  ['en/ippo.html',          '/en/ippo'],
  ['el/ippo.html',          '/el/ippo'],
  ['ippo/security.html',    '/ippo'],
  ['ippo/medici.html',      '/ippo'],
  ['ippo/imaging.html',     '/ippo'],
  ['ippo/prezzi.html',      '/ippo'],
  ['en/ippo/security.html', '/en/ippo'],
  ['en/ippo/medici.html',   '/en/ippo'],
  ['en/ippo/imaging.html',  '/en/ippo'],
  ['en/ippo/prezzi.html',   '/en/ippo'],
  ['el/ippo/security.html', '/el/ippo'],
  ['el/ippo/medici.html',   '/el/ippo'],
  ['el/ippo/imaging.html',  '/el/ippo'],
  ['el/ippo/prezzi.html',   '/el/ippo'],
]

ippo_pages.each do |page, expected_logo|
  html = read_page(page)
  check("#{page}: page exists", !html.nil?)
  next if html.nil?

  logo = extract_masthead_logo_href(html)
  check("#{page}: logo href = #{expected_logo} (got #{logo.inspect})", logo == expected_logo)

  nav = extract_nav_hrefs(html)
  check("#{page}: nav has /ippo/security", nav.any? { |h| h.include?('/ippo/security') })
  check("#{page}: nav has /ippo/medici",   nav.any? { |h| h.include?('/ippo/medici') })
  check("#{page}: nav has /ippo/imaging",  nav.any? { |h| h.include?('/ippo/imaging') })
  check("#{page}: nav has /ippo/prezzi",   nav.any? { |h| h.include?('/ippo/prezzi') })
  check("#{page}: has Register CTA", has?(html, 'btn-register') || has?(html, 'app.ippocra.com/register'))
end

# Gateway/ILAI masthead (masthead-ilai.html via landing_page.html layout, else branch):
#   logo → /, nav: ILAI, Ippo, Blog, Company (same links as general)
# Used by: /posts/ (landing_page layout, not ippo, not posts-category)
gateway_pages = [
  ['posts/index.html',    '/'],
  ['en/posts/index.html', '/en/'],
  ['el/posts/index.html', '/el/'],
]

gateway_pages.each do |page, expected_logo|
  html = read_page(page)
  check("#{page}: page exists", !html.nil?)
  next if html.nil?

  logo = extract_masthead_logo_href(html)
  check("#{page}: logo href = #{expected_logo} (got #{logo.inspect})", logo == expected_logo)

  nav = extract_nav_hrefs(html)
  check("#{page}: nav has /ilai/",  nav.any? { |h| h.include?('/ilai/') })
  check("#{page}: nav has /ippo",   nav.any? { |h| h.end_with?('/ippo') })
  check("#{page}: nav has /posts/", nav.any? { |h| h.include?('/posts/') })
end

# ── 2. CONTENT CHECKS ────────────────────────────────────────────────────────

puts "\n[2/4] Content checks"

content_checks = [
  ['index.html',                 'Innovation',        'home has "Innovation"'],
  ['index.html',                 'Agency',            'home has "Agency"'],
  ['index.html',                 'ILAI',              'home mentions ILAI'],
  ['index.html',                 'Ippo',              'home mentions Ippo'],
  ['en/index.html',              'Innovation',        'EN home has "Innovation"'],
  ['el/index.html',              'Innovation',        'EL home has "Innovation"'],
  ['404.html',                   'Page not found',    '404 has "Page not found"'],
  ['404.html',                   '404',               '404 has "404"'],
  ['en/404.html',                'Page not found',    'EN 404 has "Page not found"'],
  ['el/404.html',                'Page not found',    'EL 404 has "Page not found"'],
  ['ippo.html',                  'salute digitale',   '/ippo has "salute digitale"'],
  ['ippo.html',                  'referti',           '/ippo mentions "referti"'],
  ['en/ippo.html',               'medical',           '/en/ippo mentions "medical"'],
  ['ippo/security.html',         'Sicurezza',         '/ippo/security has "Sicurezza"'],
  ['ippo/medici.html',           'medici',            '/ippo/medici mentions "medici"'],
  ['ippo/prezzi.html',           'Prezzi',            '/ippo/prezzi has "Prezzi"'],
  ['posts/index.html',           'Blog',              '/posts/ has "Blog"'],
  ['company-profile/index.html', 'Ippocra',           '/company-profile/ mentions Ippocra'],
  ['company-profile/index.html', 'Company Profile',   '/company-profile/ has "Company Profile"'],
  ['ilai/index.html',            'ILAI',              '/ilai/ mentions ILAI'],
]

content_checks.each do |page, needle, desc|
  html = read_page(page)
  check(desc, has?(html, needle) || has?(html, needle.downcase))
end

# ── 3. REDIRECT CHECKS ───────────────────────────────────────────────────────

puts "\n[3/4] Redirect checks"

# /ippo/ must redirect to /ippo (jekyll-redirect-from generates meta refresh)
# Check the main ippo page for redirect_from-generated meta refresh tags
ippo_redirect_pages = [
  ['ippo.html',    '/ippo/'],
  ['en/ippo.html', '/en/ippo/'],
  ['el/ippo.html', '/el/ippo/'],
]

ippo_redirect_pages.each do |page, from_path|
  # Check for a redirect stub: the directory version of the page should
  # have an index.html with a meta refresh pointing to the canonical URL
  stub_rel = page.sub('.html', '/index.html')
  stub_exists = File.exist?(File.join(SITE_DIR, stub_rel))
  if stub_exists
    stub_content = File.read(File.join(SITE_DIR, stub_rel))
    has_refresh = stub_content.include?('http-equiv="refresh"')
    check("#{stub_rel}: redirect stub exists with meta refresh", has_refresh)
  else
    check("#{page}: redirect stub at #{stub_rel} exists", false)
  end
end

# Check sitemap: should have /ippo but NOT /ippo/
sitemap = read_page('sitemap.xml')
if sitemap
  sitemap_locs = sitemap.scan(/<loc>(.*?)<\/loc>/).flatten
  check("sitemap: has /ippo",       sitemap_locs.any? { |u| u.end_with?('/ippo') })
  # Only flag the EXACT trailing-slash root (/ippo/), not sub-pages or tag pages
  ippo_root_trailing = sitemap_locs.select { |u|
    path = u.sub(%r{^https://ippocra\.com}, '')
    path =~ %r{^(/en|/el)?/ippo/$}
  }
  check("sitemap: no /ippo/ root (trailing slash)", ippo_root_trailing.empty?)
  check("sitemap: has /ilai/",      sitemap_locs.any? { |u| u.include?('/ilai/') })
  # /company-profile/ is a hidden page (not in sitemap) — check file exists instead
  true
else
  check("sitemap.xml: exists", false)
end

# Sitemap completeness: every non-hidden built page must be in the sitemap
# Walk _pages/ source files, exclude hidden: true, check sitemap has the URL
if File.directory?(File.join(SOURCE_ROOT, '_pages'))
  puts "\n[5/5] Sitemap completeness (all non-hidden pages indexed)"
  missing_from_sitemap = []
  seen = sitemap_locs.to_set if sitemap

  Dir.glob(File.join(SOURCE_ROOT, '_pages', '**', '*.md')).sort.each do |src|
    content = File.read(src)
    # Skip hidden pages
    next if content =~ /^hidden:\s*true/m

    # Extract permalink from front matter
    permalink_match = content.match(/^permalink:\s*(.+)$/)
    next unless permalink_match
    permalink = permalink_match[1].strip.gsub(/["']/, '')
    next if permalink.empty?

    # Build expected URL (strip .html, ensure leading /)
    url = permalink.sub(/\.html$/, '')
    url = "/#{url}" unless url.start_with?('/')

    # Check sitemap (absolute or relative)
    found = seen&.any? { |u| u.end_with?(url) || u.end_with?("#{url}/") }
    missing_from_sitemap << url unless found
  end

  if missing_from_sitemap.empty?
    check("sitemap: all non-hidden pages are indexed (#{(seen&.size || 0)} URLs in sitemap)", true)
  else
    missing_from_sitemap.sort.each do |url|
      check("sitemap: #{url} is indexed", false)
    end
  end
end

# ── 4. PAGE INVENTORY ────────────────────────────────────────────────────────

puts "\n[4/5] Page inventory"

required_pages = [
  'index.html',
  'en/index.html',
  'el/index.html',
  '404.html',
  'en/404.html',
  'el/404.html',
  'ippo.html',
  'en/ippo.html',
  'el/ippo.html',
  'ippo/security.html',
  'ippo/medici.html',
  'ippo/imaging.html',
  'ippo/prezzi.html',
  'en/ippo/security.html',
  'en/ippo/medici.html',
  'en/ippo/imaging.html',
  'en/ippo/prezzi.html',
  'el/ippo/security.html',
  'el/ippo/medici.html',
  'el/ippo/imaging.html',
  'el/ippo/prezzi.html',
  'posts/index.html',
  'en/posts/index.html',
  'el/posts/index.html',
  'company-profile/index.html',
  'ilai/index.html',
  'en/ilai/index.html',
  'sitemap.xml',
  'assets/css/main.css',
]

required_pages.each do |page|
  check("exists: #{page}", File.exist?(File.join(SITE_DIR, page)))
end

# ── SUMMARY ───────────────────────────────────────────────────────────────────

puts "\n" + "=" * 60
if $failures.empty?
  puts "✅  ALL #{$passes} CHECKS PASSED"
  exit 0
else
  puts "❌  #{$failures.size} FAILURE(S), #{$passes} passed"
  puts "=" * 60
  $failures.each { |f| puts "  - #{f}" }
  exit 1
end

#!/usr/bin/env ruby
# Post-build script: add ILAI and Ippo standalone pages to sitemap.xml
# These pages are copied HTML files without front matter, so Jekyll's
# sitemap template (which requires node.layout) skips them.
#
# Run after `jekyll build` in CI:
#   bundle exec jekyll build && ruby scripts/fix-sitemap.rb

require 'fileutils'
require 'set'

site_dir = File.expand_path(ARGV[0] || File.join('..', '_site'), __dir__)
sitemap_path = File.join(site_dir, 'sitemap.xml')

abort "Sitemap not found at #{sitemap_path}" unless File.exist?(sitemap_path)

# Read existing URLs
doc_content = File.read(sitemap_path)
existing_urls = Set.new(doc_content.scan(/<loc>(.*?)<\/loc>/).flatten)

# Find ILAI and Ippo pages in _site
# Pattern: ilai/**/*.html, en/ilai/**/*.html, ippo/**/*.html
missing = []

['ilai', 'en/ilai', 'ippo'].each do |prefix|
  Dir.glob(File.join(site_dir, prefix, '**', '*.html')).each do |file|
    rel = file.sub(site_dir, '').sub(/^\//, '')
    url = "https://ippocra.com/#{rel}"
    url = url.sub(/\/index\.html$/, '/')
    missing << url unless existing_urls.include?(url)
  end
end

missing.uniq!

# ── Trailing-slash dedup ────────────────────────────────────────────────────
# If both /ippo and /ippo/ exist in sitemap, strip the trailing-slash version
# (the .html file is the canonical target). Also inject a meta refresh tag
# into the no-slash page so browsers hitting /ippo/ get redirected.
trailing_dups = []
existing_urls.each do |url|
  next unless url.end_with?('/')
  no_slash = url.chomp('/')
  # Only dedup if the no-slash variant exists as an actual HTML file
  no_slash_path = File.join(site_dir, "#{no_slash.sub(%r{^https://ippocra.com}, '')}.html")
  if existing_urls.include?(no_slash) && File.exist?(no_slash_path)
    trailing_dups << [url, no_slash]
  end
end

unless trailing_dups.empty?
  puts "Removing #{trailing_dups.size} trailing-slash sitemap entries (canonical .html exists):"
  trailing_dups.each do |dup, canonical|
    puts "  - #{dup} → #{canonical}"
  end
  trailing_dups.each do |dup, canonical|
    doc_content.sub!("<url><loc>#{dup}</loc></url>\n", '')
    doc_content.sub!("<url><loc>#{dup}</loc></url>", '')
  end
end

# ── Trailing-slash redirect stubs ───────────────────────────────────────────
# For pages where a directory exists (e.g. ippo/) but no index.html,
# create a redirect stub so /ippo/ → /ippo (302-equivalent via meta refresh).
# This handles the case where jekyll-redirect-from can't generate
# a redirect because the URL collides with a directory.
redirect_stub_targets = [
  ['ippo.html',    '/ippo'],
  ['en/ippo.html', '/en/ippo'],
  ['el/ippo.html', '/el/ippo'],
]

redirect_stub_targets.each do |rel_path, canonical_path|
  html_file = File.join(site_dir, rel_path)
  next unless File.exist?(html_file)

  dir_name = File.basename(rel_path, '.html')
  # For en/ippo.html → dir is en/ippo/
  parent_dir = File.dirname(rel_path)
  target_dir = parent_dir == '.' ? dir_name : File.join(parent_dir, dir_name)
  full_dir = File.join(site_dir, target_dir)
  index_file = File.join(full_dir, 'index.html')

  # Only create stub if dir exists, no index.html, and no existing stub
  if File.directory?(full_dir) && !File.exist?(index_file)
    stub_content = <<~HTML
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="robots" content="noindex, follow">
        <meta http-equiv="refresh" content="0; url=https://ippocra.com#{canonical_path}">
        <link rel="canonical" href="https://ippocra.com#{canonical_path}">
        <title>Redirecting…</title>
      </head>
      <body>
        <p>If you are not redirected, <a href="https://ippocra.com#{canonical_path}">click here</a>.</p>
      </body>
      </html>
    HTML
    File.write(index_file, stub_content)
    puts "Created redirect stub #{target_dir}/index.html → https://ippocra.com#{canonical_path}"
  end
end

# ── Add missing pages ───────────────────────────────────────────────────────

if missing.empty?
  puts "Sitemap already includes all ILAI and Ippo pages."
  exit 0
end

puts "Adding #{missing.size} missing URLs to sitemap:"
missing.each { |u| puts "  #{u}" }

new_entries = missing.map { |url| "<url><loc>#{url}</loc></url>" }.join("\n")
doc_content.sub!('</urlset>', "#{new_entries}\n</urlset>")
File.write(sitemap_path, doc_content)

puts "Done. Sitemap updated."

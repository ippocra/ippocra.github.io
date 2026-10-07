#!/usr/bin/env ruby
# Post-build script: add ILAI and Ippo standalone pages to sitemap.xml
# These pages are copied HTML files without front matter, so Jekyll's
# sitemap template (which requires node.layout) skips them.
#
# Run after `jekyll build` in CI:
#   bundle exec jekyll build && ruby scripts/fix-sitemap.rb

require 'fileutils'
require 'set'

site_dir = File.expand_path('../_site', __dir__)
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

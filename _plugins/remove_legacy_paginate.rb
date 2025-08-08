# _plugins/remove_legacy_paginate.rb
# Removes legacy `paginate` keys from the merged site config so
# jekyll-paginate-v2 won't detect the old paginator.
Jekyll::Hooks.register :site, :after_init do |site|
  removed = false
  %w[paginate paginate_path].each do |k|
    if site.config.key?(k)
      site.config.delete(k)
      removed = true
    end
  end
  if removed
    puts "⚠️  Removed legacy paginate keys from merged config (paginate/paginate_path)."
  end
end
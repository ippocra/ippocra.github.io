# Disable jekyll-paginate to avoid conflicts with jekyll-paginate-v2
# This prevents the old pagination plugin from loading
Jekyll::Hooks.register :site, :after_init do |site|
  # Remove paginate and paginate_path from config to prevent jekyll-paginate from activating
  site.config.delete('paginate')
  site.config.delete('paginate_path')
end

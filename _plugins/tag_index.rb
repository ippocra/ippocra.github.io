# tag_index.rb — language-scoped tag index for the polyglot blog.
#
# Why this exists:
# 1. `tags:` in our post front-matter is written as a comma string
#    (e.g. `tags: ilai, ai`), which YAML parses as a String, not an Array.
#    Jekyll's built-in `site.tags` index then gets garbage keys like
#    "ilai," / "ai," — so tag pages and the tag bar can't find posts.
# 2. `site.tags` and `site.posts` are built ONCE, before the per-language
#    render passes, so they mix both languages (IT + EN).
#
# This plugin fixes both by stashing a language-scoped index directly on
# the Site object (NOT in site.data — that hash gets replaced by
# Reader#read_data and is not reliably visible to Liquid):
#
#     site.tag_index[active_lang][tag] => [posts of that lang]
#     site.tag_index[active_lang]['all'] => [all posts of that lang]
#
# It also normalizes every post's `tags` into a clean Array of strings.
# The blog_index.html layout reads site.tag_index, so it is correct in
# `jekyll build`, `jekyll serve`, and the CI production build alike.

module Jekyll
  class Site
    # Language-scoped tag index, populated in the pre_render hook.
    def tag_index
      @tag_index ||= {}
    end
  end
end

# Expose Site#tag_index to Liquid via the SiteDrop.
# Without this, `site.tag_index` in templates resolves to nil because
# Drop#[] only calls methods that exist on the Drop class itself.
module Jekyll
  module Drops
    class SiteDrop
      def tag_index
        @obj.tag_index
      end
    end
  end
end

Jekyll::Hooks.register :site, :pre_render do |site|
  active_lang = site.config['active_lang'] || site.config['default_lang']
  default_lang = site.config['default_lang']
  index = {}
  # Only include posts whose lang matches active_lang (or default_lang for
  # posts without an explicit lang field).
  lang_posts = site.posts.docs.select do |post|
    post_lang = post.data['lang'] || post.lang || default_lang
    post_lang == active_lang
  end
  lang_posts.each do |post|
    raw = post.data['tags']
    tags = if raw.is_a?(Array)
             raw.flat_map { |t| t.to_s.split(',').map(&:strip) }
           else
             raw.to_s.split(',').map(&:strip)
           end
    tags = tags.reject(&:empty?).uniq
    post.data['tags'] = tags # normalize for any other Liquid consumer
    tags.each { |tag| (index[tag] ||= []) << post }
  end
  index.each_value { |list| list.sort_by!(&:date).reverse! }
  index['all'] = lang_posts.sort_by(&:date).reverse
  site.tag_index[active_lang] = index
end

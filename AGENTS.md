# AGENTS.md

This file provides guidance to AI Agents when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle config set --local path 'vendor/bundle'
bundle install

# Serve locally with live reload
bundle exec jekyll serve
# or
bin/build_website.sh

# Create a new blog post (generates paired it/en files with frontmatter)
bin/new_post.py "Title of my new post"  # requires: pip install python-slugify

# Convert images to WebP (preferred format)
convert image_input.png image_output.webp  # requires: graphicsmagick-imagemagick-compat
```

There is no test suite or linter configured in this project.

## Architecture

This is a **Jekyll 4.4** marketing website for Ippocra (a health records platform), using the **Minimal Mistakes** theme with the "mint" skin. It deploys automatically to GitHub Pages on every push to `main`.

### Multilingual (3 languages)

The site uses `jekyll-polyglot` to serve Italian (default), English, and Greek. Every page must exist in parallel under `_pages/it/`, `_pages/en/`, and `_pages/el/`, with `lang: it|en|el` in the YAML frontmatter. Blog posts follow the same pattern under `_posts/`.

### Page construction

Pages are thin Markdown files (in `_pages/`) that include large HTML partials from `_includes/` (e.g., `_inner_home.html`, `_inner_pricing.html`). The real page content lives in those includes, not in the Markdown files.

Layouts hierarchy: `default.html` (base with nav/footer) → `landing_page.html` or `single.html`.

### Styling

Custom styles live in `_sass/` (SCSS modules: `_palette.scss`, `_typography.scss`, `_card.scss`, `_buttons.scss`, `_animations.scss`, etc.). Tailwind CSS is also integrated via `jekyll-tailwindcss` with `_tailwind.css`. Prefer WebP images for performance.

### Key config

- `_config.yml` — site-wide settings, plugin config, default frontmatter
- `_data/navigation.yml` — main nav links
- `_data/locales.yml` — language code → locale mappings
- `Gemfile` — Ruby gems (jekyll, minimal-mistakes, polyglot, paginate-v2, minifier, redirect-from, tailwindcss)
- `package.json` — Node deps (FontAwesome only)

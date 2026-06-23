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

This is a **Jekyll 4.4** marketing website for Ippocra, using the **Minimal Mistakes** theme with the "mint" skin. It deploys automatically to GitHub Pages on every push to `main`.

### Brand structure

- **Ippocra** — the parent company. Main site at ippocra.com.
- **ILAI** (Ippocra Local Artificial Intelligence) — flagship product. Hosted at `ilai.ippocra.com` (separate repo).
- **Ippo** — digital health platform for families. Sub-page on ippocra.com (`/ippo`).
- **Ideallab** — custom software & AI consultancy for SMEs. Separate site at `ideallab.org`.

### Multilingual (3 languages)

The site uses `jekyll-polyglot` to serve Italian (default), English, and Greek. Every page must exist in parallel under `_pages/it/`, `_pages/en/`, and `_pages/el/`, with `lang: it|en|el` in the YAML frontmatter. Blog posts follow the same pattern under `_posts/`.

### Page construction

Pages are thin Markdown files (in `_pages/`) that include large HTML partials from `_includes/` (e.g., `_inner_gateway.html`, `_inner_ippo.html`). The real page content lives in those includes, not in the Markdown files.

**Routing conventions:**
- Root page (`/`, `/_pages/it/home.md`) → includes `_inner_gateway.html` (gateway/homepage)
- `/ippo` pages (`/_pages/it/ippo.md`) → includes `_inner_ippo.html`, sets `nav_type: ippo` for masthead variant
- `/about` pages (`/_pages/it/chi-siamo.md` for IT, `_pages/it/about.md` for EN/EL) → includes `_inner_about.html`
- Blog: `_posts/it/` and `_posts/en/` for Italian and English posts (Greek has no blog)

### Layouts

- `default.html` — base layout with nav/footer
- `landing_page.html` — full-width landing layout (used for gateway/homepage, ippo, about)
- `single.html` — blog post layout

**Masthead variants** (three different navbars):
- `_includes/masthead.html` — default navbar (used for blog, about, etc.)
- `_includes/masthead-gateway.html` — gateway/homepage navbar (no "Chi Siamo" link, simpler)
- `_includes/masthead-ippo.html` — ippo subpage navbar (highlighted Ippo link)

### Homepage (Gateway)

The homepage (`_inner_gateway.html`) follows a strict product hierarchy:

1. **ILAI** — flagship product. Featured as a full-width dark card with "Prodotto Ippocra" badge, glow hover effect, and 4 bullet points from ILAI messaging.
2. **Three-card row** — below the featured ILAI: compact ILAI card (dark) | Ippo card (light/white) | Ideallab card (dark sepia/warm). Each card has logo, one-line description, and CTA button.
3. **Background** — warm neutral gradient (`#fafafa → #f5f0e8 → #fafafa`) for consistent contrast across all card colors.

**CSS class conventions:**
- Featured ILAI: `.gateway-card-ilai` (full-width, dark, glow)
- Compact ILAI (bottom row): `.gateway-card-ilai-compact` (dark, same colors)
- Ippo: `.gateway-card-ippo` (light/white background)
- Ideallab: `.gateway-card-ideallab` (dark sepia `#3b2e20`, amber accents)
- All share: `.gateway-card`, `.gateway-brand`, `.gateway-brand-mark`, `.gateway-card-cta`
- Small CTA variant: `.gateway-card-cta-sm` for compact cards
- Featured badge: `.featured-badge` (pill, teal bg)
- Glow effect: `.featured-glow` (hover shadow)

**Hero headline rules:**
- IT: "Ippocra: il tuo controllo sui dati aziendali"
- EN: "Ippocra: own your company data, your own AI"
- EL: "Ippocra: il tuo controllo sui dati aziendali, la tua AI"
- **Must NEVER mention health.** Focus on company data ownership, local AI, cost control.

### About page

The about page (`_inner_about.html`) uses a clean, corporate, high-level structure — no product specifics, no team photos:
- Hero headline with vision statement
- Two paragraphs of corporate philosophy (data ownership, transparency, user-first technology)
- "Innovation with Agency" as the signature quote (always in English, same in all languages)
- CTA section at bottom

### Styling

Custom styles live in `_sass/` (SCSS modules: `_palette.scss`, `_typography.scss`, `_card.scss`, `_buttons.scss`, `_animations.scss`, etc.). Tailwind CSS is also integrated via `jekyll-tailwindcss` with `_tailwind.css`. Prefer WebP images for performance.

### Key config

- `_config.yml` — site-wide settings, plugin config, default frontmatter
- `_data/navigation.yml` — main nav links
- `_data/locales.yml` — language code → locale mappings
- `Gemfile` — Ruby gems (jekyll, minimal-mistakes, polyglot, paginate-v2, minifier, redirect-from, tailwindcss)
- `package.json` — Node deps (FontAwesome only)

### Assets

- `assets/images/il-logo.svg` — ILAI logo (SVG)
- `assets/images/ippo-mascot.png` — Ippo mascot (PNG, ~87KB)
- `assets/ideallab-favicon.svg` — Ideallab favicon/logo (SVG)

### Navigation

The main nav is defined in `_data/navigation.yml`. Currently includes Blog and "Chi Siamo". The gateway homepage uses `masthead-gateway.html` which omits "Chi Siamo" for a cleaner hero-focused experience. The ippo subpage uses `masthead-ippo.html` with the Ippo link highlighted.

### Deployment

GitHub Actions workflow pushes to `ippocra.github.io` repo for GitHub Pages deployment. Every push to `main` triggers an automatic rebuild and deploy.

### Common pitfalls

- **Footer carries stale branding** — Always update footers after adapting pages. They often contain old logos, names, and links not present in page content.
- **Broken relative paths after page moves** — When pages move, CSS/JS references break. Fix all `../` paths after copy.
- **Three card backgrounds must be distinct** — ILAI dark (`#0e0e10`), Ippo light (`#ffffff`), Ideallab sepia (`#3b2e20`). Never use variations of black for the third card.
- **Gateway background** — Use warm neutral gradient (`#fafafa → #f5f0e8 → #fafafa`), NOT a brand-colored gradient. A teal gradient competes with both dark and light cards.
- **ILAI headline must never mention health** — Focus on company data ownership, local AI, cost control.

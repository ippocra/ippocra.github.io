## Copyright

© [2026] [Ippocra]. All rights reserved.

This website and its contents, hosted at [https://ippocra.github.io](https://ippocra.github.io) and [https://ippocra.com](https://ippocra.com), are the intellectual property of [Ippocra]. Unauthorized use, reproduction, or distribution of any material without prior written consent is prohibited.

For inquiries regarding permissions, licensing, or other information, please contact [info@ippocra.com].

# Ippocra Marketing Site

This repository is the **single source of truth for all Ippocra marketing content** — both the Ippo (health) and ILAI (local AI) product lines. It is deployed to `ippocra.com` via GitHub Pages.

## Architecture

| Repo | Purpose |
|------|---------|
| **`ippocra.github.io`** (this repo) | All marketing pages, tools, blog posts, landing pages |
| **`ilai-site`** | Backend only — Nginx redirects + Flask API for form intake |

**All static marketing content lives here.** The `ilai-site` repo does not serve any marketing pages; it only handles API endpoints and 301 redirects.

## Free Tools (Lead Magnets)

These are interactive, no-signup tools designed for SEO and lead capture. They live in this repo and are tracked with dedicated Umami events.

### Ippo — Emergency Medical Documents Checklist

- **URL:** `/ippo/checklist-emergenza/`
- **Files:** `_pages/it/ippo-checklist-emergenza.md`, `assets/js/checklist-emergenza.js`, `assets/css/checklist-emergenza.css`
- **Umami events:** `checklist-page-10s`, `checklist-pdf-generated`, `checklist-pdf-downloaded`

### ILAI — Trade Markup Calculator

- **URL:** `/ilai/calcolo-ricarico-artigiano/` (IT) · `/en/ilai/calcolo-ricarico-artigiano/` (EN)
- **Files:** `_pages/it/ilai-calcolo-ricarico.md`, `_pages/en/ilai-calcolo-ricarico.md`, `assets/js/calcolo-ricarico.js`
- **Umami events:** `calculation-completed`, `email-capture-success`, `email-capture-failed`, `calc-page-10s`
- **Email capture:** POSTs to `https://ilai.ippocra.com/api/submit` (served by ilai-site backend)

## Development Set Up

### Ruby install

We want to use at least ruby 3.3.9, which is very fast on building the website.

1. Install RVM
   - Ubuntu: https://github.com/rvm/ubuntu_rvm
   - General: https://rvm.io/rvm/install

2. Set the shell

   ```bash
   bin/bash --login
   ```

3. Install or select ruby 3.3.9

   ```bash
   rvm install 3.3.9
   # or
   rvm use 3.3.9
   ```

### Jekyll install

We use bundler: https://jekyllrb.com/tutorials/using-jekyll-with-bundler/

```bash
bundle config set --local path 'vendor/bundle'
bundle install
```

To build the site:

```bash
bundle exec jekyll serve
```

Or the shortcut script:

```bash
bin/build_website.sh
```

We use [polyglot](https://github.com/untra/polyglot) as the multilingual plugin and [minimal-mistakes](https://mmistakes.github.io/) as the theme (with modifications).

## Deployment

Automatically deployed on each push to `main` via GitHub Actions.

## Writing a Post

Posts must be written in `_posts/it/` and `_posts/en/` with the filename format `YYYY-MM-DD-title-of-the-post.md`.

Set `lang: it` in `_posts/it/` and `lang: en` in `_posts/en/`.

Check `_posts/it/2024-10-03-opening-private-beta.md` and `_posts/en/2024-10-03-opening-private-beta.md` as a guide.

To create a new post automatically:

```bash
bin/new_post.py "Title of my new post"
```

Requires: `pip install python-slugify`

### Zoomable Images

Use this markdown for auto-linked zoomable images:

```markdown
[![image-center](/assets/images/website/analytics-ita-top.png)](/assets/images/website/analytics-ita-top.png){: .align-center}
```

For performance, use `webp` format. Convert with:

```bash
convert image_input.png image_output.webp
```

Install if needed: `sudo apt install graphicsmagick-imagemagick-compat`

## Analytics

Umami (self-hosted, GDPR-compliant, no cookies) is configured in `_includes/head.html`.

| Website ID | Scope |
|------------|-------|
| `30e5d6cf-a32c-40b5-a9b0-141e78374655` | Ippocra website (ippocra.com) |
| `07e6f4cb-81cb-43e0-b51c-0922e45f02f7` | ILAI website (gateway pages) |

Custom events are tracked in `assets/js/ippocra-tracking.js` (loaded globally via `head_scripts` in `_config.yml`) and in individual tool JS files.

## Sitemap

The sitemap is maintained at `sitemap.xml`. When adding new pages or tools, add the corresponding `<url>` entries for all locales (IT, EN, EL).

# A12 follow-up — stop flagship redirect stubs leaking into sitemap.xml

**Branch:** `fix/sitemap-redirect-stubs` (off `origin/main` @ `25acd60`)
**Repo:** `ippocra/ippocra.github.io`
**Opened:** 2026-11-25

## Problem

The live `sitemap.xml` lists the flagship Ippo page's redirect variants plus
`/el/` ghosts. Some of those URLs **404 live** (no backing file), so Google
keeps indexing dead pages. A12's original fix (`5b17935` strip + `d8a0459`
ci-path) is on `main`, but the strip is **undone** by the script's own
"add missing" step, so the deployed sitemap is never actually clean.

## Root cause (confirmed by local reproduction)

In `scripts/fix-sitemap.rb`:

1. `missing` (the list of URLs to append) is computed **at the top** by globbing
   `['ilai', 'en/ilai', 'ippo']/**/*.html` — **before** the dead-entry strip.
2. The `redirect_stub_files` skip list only covers the **ILAI** stubs
   (`ilai/cosa-fa`, …), not the flagship redirect stubs.
3. So the flagship stubs are collected into `missing`. The strip step later
   removes their `<loc>` from `doc_content` and refreshes `existing_urls`, but
   `missing` is a separate array already computed — the final "add missing"
   **re-appends** them. Net: "Removing 10 dead… Adding 25 missing" → ghosts
   reappear.

## What is NOT a bug (important — avoided a false-positive gate)

The build also contains many **pre-existing, intentional** `redirect_from`
stubs — `/imaging`→`/ippo/imaging`, `/security`→`/ippo/security`,
`/welcome-ilai`→`/benvenuto-ilai`, `/prezzi`→`/ippo/prezzi`, etc. These are
legitimate redirects and **already sit in the live sitemap** by design. A
"no redirect stub may be in the sitemap" gate would wrongly flag ~24 of these
and **block the deploy**. The real defect is narrower: URLs that have **no
backing file** (404 live) yet are in the sitemap. The existing `verify-site.rb`
"no dead entries" gate is the correct, sufficient check.

## Change (single file: `scripts/fix-sitemap.rb`)

- Make redirect-stub detection **content-based** (`redirect_stub?`): any built
  `.html` carrying a `meta http-equiv="refresh"` (or `location=` script) is a
  stub, regardless of path. The old hardcoded path list always missed the next
  stub — that was the A12 leak.
- **Move** the `missing` computation to **after** the dead-entry strip so it
  de-dups against the refreshed `existing_urls` and can never re-add a URL the
  strip just removed.
- Keep the existing ILAI `redirect_stub_files` list as a fast-path; the content
  check is the authoritative guard.

`verify-site.rb` and `.github/workflows/*` are **unchanged** — the existing
"no dead entries" gate (run by `verify.yml` on PRs) already catches the 404-live
case, and a stub gate was rejected as a false-positive blocker.

## Verification (done locally)

- `bundle exec jekyll build --baseurl ""` → `ruby scripts/fix-sitemap.rb _site`:
  post-fix sitemap has **0** `come-visualizare` entries (was 16 live) and the
  25 added URLs are all real ILAI/Ippo pages.
- Confirmed the intentional `/imaging`, `/security`, `/welcome-ilai` stubs are
  still present in the live sitemap → must NOT be stripped (drives the
  decision to keep the "no dead entries" gate, not a "no stubs" gate).
- `ruby scripts/verify-site.rb` still passes on the fixed build (no dead entries).

## Out of scope

- Re-triggering the production deploy (happens on merge → `main` push).
- The IG token (A13) — separate.
- GSC re-index read — scheduled 2026-12-16 after the fix is live.

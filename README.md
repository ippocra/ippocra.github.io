## Copyright

© [2024] [Ippocra]. All rights reserved.

This website and its contents, hosted at [https://ippocra.github.io](https://ippocra.github.io) and [https://ippocra.com](https://ippocra.com), are the intellectual property of [Ippocra]. Unauthorized use, reproduction, or distribution of any material without prior written consent is prohibited.

For inquiries regarding permissions, licensing, or other information, please contact [info@ippocra.com].



# Marketing site for Ippocra

We use bundle to set up the enviroment: https://jekyllrb.com/tutorials/using-jekyll-with-bundler/#configure-bundler-install-path

Set up the path for the bundle:

    bundle config set --local path 'vendor/bundle'

Install all the gems:

    bundle install

To build the site:

    bundle exec jekyll serve

Or the shortcut script:

    ./build_website.sh

We use [polyglot](https://github.com/untra/polyglot) as multilingual plugin and 
[minimal-mistakes](https://mmistakes.github.io/) as theme with modification.

# Deployment

Automatically deployed on each push on `main` via `github-action`.

## Writing a post

The post must be written in `_posts/it` and in `_post/en` with the filename following the format `YYYY-MM-DD-title-of-the-post.md` 

Rembemr to set `lang: it` in the `_posts/it` and `lang:en` in `_post/en`.

Check the `_posts/it/2024-10-03-opening-private-beta.md` and `_posts/en/2024-10-03-opening-private-beta.md` 
as a guide.

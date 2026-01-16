## Copyright

© [2026] [Ippocra]. All rights reserved.

This website and its contents, hosted at [https://ippocra.github.io](https://ippocra.github.io) and [https://ippocra.com](https://ippocra.com), are the intellectual property of [Ippocra]. Unauthorized use, reproduction, or distribution of any material without prior written consent is prohibited.

For inquiries regarding permissions, licensing, or other information, please contact [info@ippocra.com].



# Marketing site for Ippocra

## Development set up

### Ruby install

We want to use at least ruby 3.3.9, which is very fast on building the website.

To do that:

1) install RVM

- follow this for Ubuntu: https://github.com/rvm/ubuntu_rvm
- general installation: https://rvm.io/rvm/install

2) make sure the shell is set

    bin/bash --login

3) Install ruby 3.3.9

    rvm install 3.3.9 


or select it if already installed:

    rvm use 3.3.9

### Jekyll install

We use bundle to set up the enviroment: https://jekyllrb.com/tutorials/using-jekyll-with-bundler/#configure-bundler-install-path

Set up the path for the bundle:

    bundle config set --local path 'vendor/bundle'

Install all the gems:

    bundle install

To build the site:

    bundle exec jekyll serve

Or the shortcut script:

    bin/build_website.sh

We use [polyglot](https://github.com/untra/polyglot) as multilingual plugin and 
[minimal-mistakes](https://mmistakes.github.io/) as theme with modification.

# Deployment

Automatically deployed on each push on `main` via `github-action`.

## Writing a post

The post must be written in `_posts/it` and in `_post/en` with the filename following the format `YYYY-MM-DD-title-of-the-post.md` 

Remember to set `lang: it` in the `_posts/it` and `lang:en` in `_post/en`.

Check the `_posts/it/2024-10-03-opening-private-beta.md` and `_posts/en/2024-10-03-opening-private-beta.md` 
as a guide.

To create a new post automatically run

    bin/new_post.py Title of my new post

You need slugify installed as requirements:

    pip install python-slugify

### Zoomable images

Use this type of markdown, so you get an automatic link to the bigger image.

    [![](img.png)](img.png)

for example, with a real image, will look like this:

    [![image-center](/assets/images/analytics-ita-top.png)](/assets/images/analytics-ita-top.png){: .align-center}

For better performance, use only `webp` format for the images. You can convert them via

    convert image_input.png image_output.webp

To install convert for the first time run

    sudo apt install graphicsmagick-imagemagick-compat


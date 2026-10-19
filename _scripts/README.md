# Local build and link checks

The Gemfile pins the core renderer versions published by
[GitHub Pages](https://pages.github.com/versions/). This site does not currently
require the optional GitHub Pages themes and plugins.

With Ruby and Bundler available:

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll build --strict_front_matter
python3 _scripts/check_site.py
node --test tests/*.test.cjs
bundle exec jekyll serve --host 127.0.0.1
```

Open `http://127.0.0.1:4000/` for local browser verification. Stop the server with
Ctrl-C. These commands do not publish changes.

The checker needs Python 3.9 or newer and no packages. It checks the generated
HTML links and assets, fragment destinations, duplicate anchors, and sitemap
routes. It reports external links without fetching them. Browser interaction,
responsive layout, remote URLs, and JavaScript-generated links need separate
verification.

On a Mac using the bundled Ruby 2.6, Bundler 2.4.22 can be installed entirely
inside the checkout, without changing system Ruby:

```sh
export GEM_HOME="$PWD/vendor/gems"
export GEM_PATH="$GEM_HOME"
export GEM_SPEC_CACHE="$PWD/vendor/spec-cache"
export BUNDLE_USER_HOME="$PWD/.bundle"
export BUNDLE_PATH="$PWD/vendor/bundle"
gem install bundler --version 2.4.22 --no-document
ruby vendor/gems/bin/bundle install
ruby vendor/gems/bin/bundle exec jekyll build --strict_front_matter
python3 _scripts/check_site.py
node --test tests/*.test.cjs
```

Dependencies, local Bundler configuration, caches, and generated output are
ignored by Git. The `_scripts` directory is excluded from Jekyll output by its
underscore prefix.

---
layout: post
title: "How to Write a Blog Post"
description: "The practical workflow for adding a new post to this GitHub Pages site."
category_label: "Guide"
date: 2026-05-01
updated: 2026-05-01
permalink: /blog/how-to-write/
---

This site uses GitHub Pages' built-in Jekyll support. That means you can write blog posts in Markdown, and GitHub turns them into webpages after you push.

You do not need to install React, Hugo, npm, or a local web-development toolchain.

## The workflow

1. Duplicate `blog/template.md`.
2. Move the copy into `_posts/`.
3. Rename the copy with this format: `YYYY-MM-DD-short-title.md`.
4. Replace the title, description, category, and body text.
5. Commit and push the file.
6. GitHub Pages automatically publishes it and adds it to the blog index.

## Example file name

`_posts/2026-05-02-my-new-note.md`

## Front matter

Every post starts with a small metadata block:

```yaml
---
layout: post
title: "Readable Post Title"
description: "One sentence for the blog index."
category_label: "Research Note"
date: 2026-05-02
updated: 2026-05-02
---
```

Keep the description concrete. It appears on the blog index, so it should tell a reader what the post is about without opening the page. Set `updated` to the same day as `date` when you first publish the post, then change `updated` when you make a meaningful revision later.

## Basic Markdown

Use normal paragraphs for text. Use `##` for major section headings and `###` for subsections.

Use `-` for bullet lists, and use backticks for code-like terms such as `u_t`, `Sigma`, or `_posts`.

## Math

Inline math uses dollar signs, like `$X^\top \Sigma X$`.

Display math uses double dollar signs:

```markdown
$$
V = X^\top \Sigma X
$$
```

For derivations, include the intermediate steps. A reader should be able to see where the final expression comes from.

## Images

Put blog images under `assets/blog/short-post-name/`.

Then reference them with an absolute site path:

```markdown
![Alt text that describes the figure](/assets/blog/short-post-name/figure.png)
```

Place each image close to the paragraph that explains it. Do not collect all figures at the end unless the post is explicitly an appendix.

## Interactive widgets

For small interactive demos, HTML, CSS, and JavaScript can live directly inside the Markdown post. Keep the widget self-contained:

- give the outer element a unique class or id;
- avoid global variable names when possible;
- include a short instruction before the widget;
- test the embedded script with `node --check` before pushing.

## References

End research posts with `## References and notes`.

Use this section for papers, books, notebooks, code, datasets, and generated assets. If an image is AI-generated, say so directly in either the caption or the references section.

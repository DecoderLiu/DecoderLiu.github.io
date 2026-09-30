#!/usr/bin/env python3
"""Check generated HTML routes, local assets, and URL fragments (stdlib only)."""

import argparse
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = Counter()
        self.references = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids[attrs["id"]] += 1
        # Legacy named anchors remain valid fragment destinations.
        if tag == "a" and attrs.get("name") and attrs.get("name") != attrs.get("id"):
            self.ids[attrs["name"]] += 1
        for name in ("href", "src", "poster", "action"):
            if attrs.get(name):
                self.references.append((self.getpos()[0], attrs[name]))

    handle_startendtag = handle_starttag


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("directory", nargs="?", default="_site")
    parser.add_argument("--site-url", default="https://decoderliu.github.io")
    args = parser.parse_args()
    root = Path(args.directory).resolve()
    origin = args.site_url.rstrip("/") + "/"
    site_host = urlsplit(origin).netloc
    pages = {}
    errors = []
    checked = 0
    external = set()

    for path in sorted(root.rglob("*.html")):
        page = Page()
        page.feed(path.read_text(encoding="utf-8"))
        pages[path] = page
        for anchor, count in page.ids.items():
            if count > 1:
                errors.append(f"{path.relative_to(root)}: duplicate anchor {anchor!r}")

    if not pages:
        parser.error(f"No generated HTML files found in {root}; build the site first.")

    def check(source, line, ref):
        nonlocal checked
        relative = source.relative_to(root).as_posix()
        source_route = relative[:-10] if relative.endswith("index.html") else relative
        parsed = urlsplit(urljoin(origin, source_route))
        try:
            target = urlsplit(urljoin(parsed.geturl(), ref))
        except ValueError as exc:
            errors.append(f"{relative}:{line}: invalid URL {ref!r}: {exc}")
            return
        if target.scheme not in ("http", "https"):
            return
        if target.netloc != site_host:
            external.add(target.geturl())
            return
        checked += 1
        target_path = (root / unquote(target.path).lstrip("/")).resolve()
        if not target_path.is_relative_to(root):
            errors.append(f"{relative}:{line}: URL escapes the site: {ref}")
            return
        if target_path.is_dir():
            target_path /= "index.html"
        if not target_path.is_file():
            errors.append(f"{relative}:{line}: missing destination: {ref}")
            return
        fragment = unquote(target.fragment)
        # Text-fragment directives need no element ID. A preceding ID still does.
        fragment = fragment.split(":~:text=", 1)[0]
        if fragment and target_path in pages and fragment not in pages[target_path].ids:
            errors.append(f"{relative}:{line}: missing fragment: {ref}")

    for path, page in pages.items():
        for line, ref in page.references:
            check(path, line, ref)

    sitemap = root / "sitemap.xml"
    if sitemap.exists():
        for node in ET.parse(sitemap).iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
            if node.text:
                check(sitemap, 1, node.text.strip())

    print(f"Checked {len(pages)} HTML pages and {checked} internal references.")
    print(f"Found {len(external)} unique external URLs (not fetched).")
    if errors:
        print("\n".join(errors))
        print(f"FAILED: {len(errors)} broken references or duplicate anchors.")
        return 1
    print("PASS: all checked local routes, assets, and fragments exist.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

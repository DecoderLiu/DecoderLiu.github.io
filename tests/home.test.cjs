const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const script = read('assets/home.js');
const home = read('index.html');
const layout = read('_layouts/page.html');
const expectedDestinations = {
  research: '/academic/#research',
  projects: '/academic/#projects',
  publications: '/academic/#publications',
  path: '/academic/#path',
  studio: '/playground/#studio',
  blog: '/blog/'
};

// Read the actual source mappings so removing or misrouting a legacy link fails
// these tests. Only the simple relative_url expressions used here are expanded;
// this deliberately does not attempt to reimplement Jekyll.
function relativeUrl(expression, baseurl = '') {
  const match = expression.match(/^\{\{\s*'([^']+)'\s*\|\s*relative_url\s*\}\}$/);
  assert.ok(match, `Expected a relative_url expression, received ${expression}`);
  return baseurl + match[1];
}

function sourceElements(baseurl = '') {
  const elements = new Map();
  for (const tag of (home + layout).matchAll(/<[^>]+>/g)) {
    const attributes = Object.fromEntries([...tag[0].matchAll(/([\w:-]+)="([^"]*)"/g)]
      .map(([, name, value]) => [name, value]));
    if (!attributes.id) continue;
    const dataset = {};
    if (attributes['data-moved-to']) dataset.movedTo = relativeUrl(attributes['data-moved-to'], baseurl);
    elements.set(attributes.id, { dataset });
  }
  return elements;
}

function createHome(hash = '', baseurl = '') {
  const replacements = [];
  const listeners = new Map();
  const elements = sourceElements(baseurl);
  const location = { hash, replace(destination) { replacements.push(destination); } };
  const window = {
    location,
    addEventListener(name, listener) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(listener);
    }
  };
  vm.runInNewContext(script, {
    window,
    document: { getElementById: id => elements.get(id) || null }
  });
  return {
    location, replacements,
    changeHash(next) {
      // Browsers fire hashchange only when the fragment actually changes.
      if (next === location.hash) return;
      location.hash = next;
      (listeners.get('hashchange') || []).forEach(listener => listener());
    }
  };
}

test('every moved original homepage section maps to an existing destination and fallback link', () => {
  const elements = sourceElements();
  for (const [id, expected] of Object.entries(expectedDestinations)) {
    assert.equal(elements.get(id)?.dataset.movedTo, expected, `Legacy #${id} must remain supported.`);
    const destination = new URL(expected, 'https://decoderliu.github.io');
    const page = read(path.join(destination.pathname, 'index.html'));
    if (destination.hash) {
      assert.ok(page.includes(`id="${destination.hash.slice(1)}"`), `${expected} must have a real target.`);
    }
    const paragraph = [...home.matchAll(/<p\b[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/p>/g)]
      .find(([, paragraphId]) => paragraphId === id);
    assert.ok(paragraph, `Legacy #${id} must have a no-JavaScript fallback.`);
    const fallback = paragraph[2].match(/<a\b[^>]*\bhref="([^"]+)"/);
    assert.ok(fallback, `Legacy #${id} must offer a usable link without JavaScript.`);
    assert.equal(relativeUrl(fallback[1]), expected);
  }
  assert.ok(elements.has('top'), 'The original #top target remains on the homepage.');
  assert.ok(elements.has('contact'), 'The original #contact target remains on the homepage.');
});

test('each known initial hash replaces the current history entry exactly once', () => {
  for (const [id, expected] of Object.entries(expectedDestinations)) {
    const page = createHome(`#${id}`);
    assert.deepEqual(page.replacements, [expected]);
  }
});

test('hash changes route each moved section once without rerouting retained or unknown anchors', () => {
  const page = createHome();
  assert.deepEqual(page.replacements, []);
  for (const [id, expected] of Object.entries(expectedDestinations)) {
    const before = page.replacements.length;
    page.changeHash(`#${id}`);
    assert.equal(page.replacements.length, before + 1, 'One hashchange must issue one replacement.');
    assert.equal(page.replacements.at(-1), expected);
    page.changeHash('#top');
    page.changeHash('#contact');
    page.changeHash('#unknown');
    assert.equal(page.replacements.length, before + 1);
  }
});

test('unknown, retained, empty, and malformed hashes remain on the homepage', () => {
  const hashes = ['', '#', '#top', '#contact', '#unknown', '#Research', '#%', '#%2', '#%GG', '#%E0%A4%A', '#%ED%A0%80'];
  for (const hash of hashes) {
    const page = createHome(hash);
    assert.deepEqual(page.replacements, [], `Initial ${JSON.stringify(hash)} must not redirect.`);
    assert.equal(page.location.hash, hash);
  }
  const page = createHome();
  for (const hash of hashes) {
    page.changeHash(hash);
    assert.deepEqual(page.replacements, [], `Changed ${JSON.stringify(hash)} must not redirect.`);
  }
  page.changeHash('#research');
  assert.deepEqual(page.replacements, ['/academic/#research'], 'A malformed hash must not disable later valid navigation.');
});

test('encoded section IDs decode once and do not match partial or double-encoded names', () => {
  for (const [id, expected] of Object.entries(expectedDestinations)) {
    const encoded = [...id].map(char => `%${char.charCodeAt(0).toString(16)}`).join('');
    assert.deepEqual(createHome(`#${encoded}`).replacements, [expected]);
    assert.deepEqual(createHome(`#${encoded.replaceAll('%', '%25')}`).replacements, []);
    assert.deepEqual(createHome(`#${id}-extra`).replacements, []);
    assert.deepEqual(createHome(`#${id}%20`).replacements, []);
  }
});

test('redirects use the complete rendered destination including a deployment subpath', () => {
  for (const [id, expected] of Object.entries(expectedDestinations)) {
    assert.deepEqual(createHome(`#${id}`, '/preview').replacements, [`/preview${expected}`]);
  }
});

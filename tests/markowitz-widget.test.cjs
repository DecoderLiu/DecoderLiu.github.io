const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const post = fs.readFileSync(path.join(__dirname, '../_posts/2026-05-02-markowitz-portfolio-selection.md'), 'utf8');
const script = post.match(/<script>([\s\S]*?)<\/script>/)[1];

function createWidget() {
  const elements = {};
  const document = {
    getElementById(id) {
      return elements[id] ||= {
        value: '', innerHTML: '', textContent: '', hidden: false,
        attributes: {}, listeners: {},
        addEventListener(event, listener) { this.listeners[event] = listener; },
        setAttribute(name, value) { this.attributes[name] = value; },
        removeAttribute(name) { delete this.attributes[name]; }
      };
    }
  };
  vm.runInNewContext(script, { document });
  return {
    elements,
    set(values) {
      Object.entries(values).forEach(([id, value]) => { elements[id].value = String(value); });
      elements[Object.keys(values)[0]].listeners.input();
    },
    preset(value) {
      elements.casePreset.value = value;
      elements.casePreset.listeners.change();
    }
  };
}

test('all five presets render finite geometry and symmetric inputs', () => {
  const widget = createWidget();
  for (const preset of ['book2', 'book3', 'case1', 'case2', 'case3']) {
    widget.preset(preset);
    const { elements: el } = widget;
    assert.equal(el['geometry-status'].hidden, true, preset);
    assert.match(el['geometry-svg'].innerHTML, /<polygon/);
    assert.doesNotMatch(el['geometry-svg'].innerHTML, /NaN|Infinity/);
    assert.equal(el.s21.value, el.s12.value);
    assert.equal(el.s31.value, el.s13.value);
    assert.equal(el.s32.value, el.s23.value);
  }
});

test('invalid edits report the problem and preserve the last valid plot and diagnostics', () => {
  const cases = [
    { r1: '' },
    { r1: 'Infinity' },
    { s11: '-1' },
    { s12: '1' },
    // Pairwise correlations are valid, but this matrix has a negative determinant.
    { s11: 1, s22: 1, s33: 1, s12: 0.9, s13: 0.9, s23: -0.9 },
    // A constant variance has no unique ellipse center.
    { s11: 0.04, s22: 0.04, s33: 0.04, s12: 0.04, s13: 0.04, s23: 0.04 }
  ];
  for (const values of cases) {
    const widget = createWidget();
    const el = widget.elements;
    const plot = el['geometry-svg'].innerHTML;
    const diagnostics = el['geometry-readout'].innerHTML;
    widget.set(values);
    assert.equal(el['geometry-status'].hidden, false, JSON.stringify(values));
    assert.match(el['geometry-status'].textContent, /last valid inputs/);
    assert.equal(el['geometry-svg'].innerHTML, plot);
    assert.equal(el['geometry-readout'].innerHTML, diagnostics);
    assert.ok(Object.values(el).some((element) => element.attributes['aria-invalid'] === 'true'));
  }
});

test('fixing a field clears the error and redraws the changed result', () => {
  const widget = createWidget();
  const el = widget.elements;
  const initial = el['geometry-svg'].innerHTML;
  widget.set({ r1: '' });
  widget.set({ r1: '0.10' });
  assert.equal(el['geometry-status'].hidden, true);
  assert.equal(el['geometry-status'].textContent, '');
  assert.notEqual(el['geometry-svg'].innerHTML, initial);
  assert.equal(el.r1.attributes['aria-invalid'], undefined);
});

test('a semidefinite covariance with a unique ellipse center remains supported', () => {
  const widget = createWidget();
  widget.set({ s11: 0.01, s22: 0.09, s33: 0, s12: 0, s13: 0, s23: 0 });
  assert.equal(widget.elements['geometry-status'].hidden, true);
  assert.doesNotMatch(widget.elements['geometry-svg'].innerHTML, /NaN|Infinity/);
});

test('diagonal covariance ellipses represent constant variance for either larger diagonal', () => {
  for (const [s11, s22] of [[0.01, 0.09], [0.09, 0.01]]) {
    const widget = createWidget();
    widget.set({ s11, s22, s33: 0, s12: 0, s13: 0, s23: 0 });
    const contour = widget.elements['geometry-svg'].innerHTML.match(/<polyline points="([^"]+)"[^>]*stroke="#202633"/)[1];
    const variances = contour.split(' ').map((point) => {
      const [px, py] = point.split(',').map(Number);
      // Convert rendered coordinates back to portfolio weights on the displayed axes.
      const x = ((px - 72) / 754) * 1.32 - 0.16;
      const y = (1 - (py - 34) / 542) * 1.34 - 0.18;
      return s11 * x * x + s22 * y * y;
    });
    assert.ok(Math.max(...variances) - Math.min(...variances) < 0.00001,
      'Every point on an isovariance ellipse should have the same portfolio variance.');
  }
});

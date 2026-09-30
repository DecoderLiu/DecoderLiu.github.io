const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const script = fs.readFileSync(path.join(__dirname, '../assets/interactive-studio.js'), 'utf8');

function element(properties = {}) {
  const listeners = new Map();
  const classes = new Set();
  return Object.assign({
    dataset: {}, attributes: {}, hidden: false, textContent: '', value: '',
    style: {
      setProperty(name, value) { this[name] = value; },
      removeProperty(name) { delete this[name]; }
    },
    classList: {
      add(name) { classes.add(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); }
    },
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(callback);
    },
    emit(name, event = {}) { (listeners.get(name) || []).forEach(callback => callback(event)); },
    setAttribute(name, value) { this.attributes[name] = value; },
    getBoundingClientRect() { return { left: 0, top: 0, width: 520, height: 300 }; }
  }, properties);
}

function canvas(properties = {}, supported = true) {
  const context = { arcs: [], draws: 0 };
  for (const name of ['beginPath', 'moveTo', 'lineTo', 'stroke', 'fill', 'fillText', 'save', 'translate', 'rotate', 'restore']) {
    context[name] = () => {};
  }
  context.clearRect = () => { context.draws += 1; };
  context.arc = (...args) => { context.arcs.push(args); };
  return element({ width: 520, height: 260, context, getContext: () => supported ? context : null, ...properties });
}

function createStudio({ reduced = false, observersSupported = true, canvasSupported = true } = {}) {
  const frames = new Map();
  let nextFrame = 0;
  const observers = [];
  const motion = element({ matches: reduced });
  const frontier = canvas({}, canvasSupported);
  const risk = element();
  const returns = element();
  const input = element();
  const control = element({ hidden: true });
  const eyes = [element(), element()];
  const nodes = [element({ dataset: { x: '170', y: '100' } }), element({ dataset: { x: '390', y: '220' } })];
  nodes.forEach(node => node.setAttribute('transform', `translate(${node.dataset.x} ${node.dataset.y})`));
  const constellation = element({ querySelectorAll: () => nodes });
  const sparks = ['wave', 'tree', 'curve'].map(kind => canvas({ width: 96, height: 58, dataset: { spark: kind } }, canvasSupported));
  const bench = element();
  const revealElements = [element(), bench];
  const single = {
    '[data-constellation]': constellation,
    '[data-frontier]': frontier,
    '[data-risk]': risk,
    '[data-return]': returns,
    '[data-frontier-input]': input,
    '[data-frontier-control]': control,
    '.studio-bench': bench
  };
  const studio = element({
    querySelector: selector => single[selector] || null,
    querySelectorAll: selector => ({
      '[data-eye]': eyes,
      '[data-spark]': sparks,
      '.studio-reveal': revealElements,
      '.is-pending': revealElements.filter(item => item.classList.contains('is-pending'))
    })[selector] || []
  });
  const document = element({
    hidden: false,
    querySelector: () => studio,
    querySelectorAll: () => []
  });
  const window = element({ innerHeight: 800, matchMedia: () => motion });
  class IntersectionObserver {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
  }
  if (observersSupported) window.IntersectionObserver = IntersectionObserver;
  vm.runInNewContext(script, {
    window, document, IntersectionObserver,
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); }
  });
  return {
    document, window, motion, frontier, risk, returns, input, control, eyes, nodes,
    constellation, sparks, bench, revealElements, frames,
    intersect(target, isIntersecting) {
      observers.filter(observer => observer.targets.has(target)).forEach(observer => {
        observer.callback([{ target, isIntersecting }]);
      });
    },
    setReduced(matches) { motion.matches = matches; motion.emit('change'); },
    setHidden(hidden) { document.hidden = hidden; document.emit('visibilitychange'); },
    tick(time = 200) {
      const pending = [...frames];
      pending.forEach(([id, callback]) => { frames.delete(id); callback(time); });
    }
  };
}

test('sparks animate only while visible and stop/resume without duplicate animation loops', () => {
  const studio = createStudio();
  assert.equal(studio.frames.size, 0, 'Offscreen studio must not schedule animation.');
  studio.intersect(studio.bench, true);
  assert.equal(studio.frames.size, 1);
  const draws = studio.sparks[0].context.draws;
  studio.tick();
  assert.equal(studio.sparks[0].context.draws, draws + 1);
  assert.equal(studio.frames.size, 1);
  studio.intersect(studio.bench, true);
  assert.equal(studio.frames.size, 1, 'Repeated visibility updates must not create extra loops.');
  studio.setHidden(true);
  assert.equal(studio.frames.size, 0);
  const hiddenDraws = studio.sparks[0].context.draws;
  studio.tick();
  assert.equal(studio.sparks[0].context.draws, hiddenDraws);
  studio.setHidden(false);
  assert.equal(studio.frames.size, 1);
  studio.intersect(studio.bench, false);
  assert.equal(studio.frames.size, 0);
  studio.setHidden(true);
  studio.setHidden(false);
  assert.equal(studio.frames.size, 0, 'Returning to the tab must not animate an offscreen bench.');
});

test('live reduced-motion changes stop animation, reveal content, and reset eye and node movement', () => {
  const studio = createStudio();
  studio.intersect(studio.bench, true);
  studio.window.emit('pointermove', { clientX: 200, clientY: 140 });
  studio.constellation.emit('pointermove', { clientX: 200, clientY: 140 });
  assert.ok(studio.eyes[0].style.transform);
  assert.notEqual(studio.nodes[0].attributes.transform, 'translate(170 100)');
  studio.setReduced(true);
  assert.equal(studio.frames.size, 0);
  assert.ok(studio.revealElements.every(item => !item.classList.contains('is-pending')));
  assert.equal(studio.eyes[0].style.transform, undefined);
  assert.equal(studio.nodes[0].attributes.transform, 'translate(170 100)');
  studio.window.emit('pointermove', { clientX: 220, clientY: 180 });
  studio.constellation.emit('pointermove', { clientX: 220, clientY: 180 });
  assert.equal(studio.eyes[0].style.transform, undefined);
  assert.equal(studio.nodes[0].attributes.transform, 'translate(170 100)');
  studio.setReduced(false);
  assert.equal(studio.frames.size, 1);
});

test('initial reduced-motion and missing observer support both leave content accessible', () => {
  const reduced = createStudio({ reduced: true });
  reduced.intersect(reduced.bench, true);
  assert.equal(reduced.frames.size, 0);
  assert.ok(reduced.revealElements.every(item => !item.classList.contains('is-pending')));
  assert.equal(reduced.control.hidden, false, 'Reduced motion must preserve the interactive risk control.');
  const fallback = createStudio({ observersSupported: false });
  assert.ok(fallback.revealElements.every(item => !item.classList.contains('is-pending')));
  assert.equal(fallback.frames.size, 1);
  fallback.setHidden(true);
  assert.equal(fallback.frames.size, 0);
});

test('frontier pointer mapping follows the rendered marker at different canvas scales and clamps to endpoints', () => {
  const studio = createStudio();
  for (const scale of [0.5, 1, 1.75]) {
    const left = 29;
    studio.frontier.getBoundingClientRect = () => ({ left, width: 520 * scale });
    for (const risk of [0, 0.25, 0.5, 1]) {
      studio.input.value = String(risk);
      studio.input.emit('input');
      const markerX = studio.frontier.context.arcs.at(-1)[0];
      studio.frontier.emit('pointermove', { clientX: left + markerX * scale });
      assert.equal(studio.input.value, risk.toFixed(2));
      assert.equal(studio.risk.textContent, risk.toFixed(2));
      assert.match(studio.input.attributes['aria-valuetext'], new RegExp(`Risk ${risk.toFixed(2)}, return`));
    }
    studio.frontier.emit('pointermove', { clientX: left - 100 });
    assert.equal(studio.input.value, '0.00');
    studio.frontier.emit('pointermove', { clientX: left + 620 * scale });
    assert.equal(studio.input.value, '1.00');
  }
});

test('constellation movement stays near each original node and pointer leave restores its position', () => {
  const studio = createStudio();
  studio.constellation.emit('pointermove', { clientX: 190, clientY: 120 });
  for (const node of studio.nodes) {
    const [, x, y] = node.attributes.transform.match(/translate\(([^ ]+) ([^)]+)\)/);
    assert.ok(Math.hypot(Number(x) - Number(node.dataset.x), Number(y) - Number(node.dataset.y)) <= 18);
  }
  studio.constellation.emit('pointerleave');
  for (const node of studio.nodes) {
    assert.equal(node.attributes.transform, `translate(${node.dataset.x} ${node.dataset.y})`);
  }
});

test('missing canvas contexts do not abort the rest of studio initialization', () => {
  const studio = createStudio({ canvasSupported: false });
  assert.equal(studio.control.hidden, true);
  studio.intersect(studio.bench, true);
  studio.tick();
  studio.setReduced(true);
  assert.equal(studio.frames.size, 0);
  assert.ok(studio.revealElements.every(item => !item.classList.contains('is-pending')));
});

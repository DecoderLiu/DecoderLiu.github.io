---
layout: post
title: "Reading Markowitz 1952 Through Geometry"
description: "A mathematical reading note on Markowitz's three-security geometry, with an interactive widget for changing the return vector and covariance or correlation-style matrix."
category_label: "Reading note"
---

Harry Markowitz's 1952 paper is not just the origin story of mean-variance optimization. It is also a clean geometric argument for why portfolio choice needs both expected return and variance.

The paper separates portfolio selection into two stages:

$$
\text{data and judgment} \rightarrow (\mu,\Sigma) \rightarrow w.
$$

The first stage forms beliefs about future security returns. The second stage turns those beliefs into portfolio weights. The paper mostly studies the second stage.

## Why return alone is not enough

The old rule says to maximize anticipated return. Let $R_i$ be the anticipated return of security $i$, and let $X_i$ be the fraction of wealth invested in that security. Portfolio anticipated return is

$$
R_p=\sum_i X_iR_i.
$$

Under the long-only budget constraint

$$
\sum_i X_i=1,\qquad X_i\ge 0,
$$

$R_p$ is a weighted average. If $R_m=\max_i R_i$, then every $R_i\le R_m$, so

$$
R_p=\sum_i X_iR_i\le \sum_i X_iR_m=R_m.
$$

So a return-only rule either puts everything into the single highest-return security, or is indifferent among securities tied for highest return. It has no mathematical reason to prefer diversification.

Markowitz's replacement is to consider return and variance together:

$$
E=R^\top X,\qquad V=X^\top\Sigma X.
$$

The key asymmetry is simple:

- $E$ is linear in $X$.
- $V$ is quadratic in $X$.

That quadratic term is where covariance enters. If assets do not move perfectly together, a mixture can reduce variance without proportionally reducing expected return.

## What does efficient mean?

Once we care about both expected return and variance, there may not be one portfolio that is best in every sense. The ideal portfolio would have the highest possible expected return and the lowest possible variance at the same time. Sometimes that can happen, but usually it does not.

The conflict is:

$$
\text{prefer larger } E
\qquad\text{and}\qquad
\text{prefer smaller } V.
$$

These two preferences define a partial order rather than a single scalar objective. One portfolio can clearly dominate another, but many portfolios may be incomparable.

Say portfolio $X$ has return and variance

$$
(E_X,V_X),
$$

and another feasible portfolio $Y$ has

$$
(E_Y,V_Y).
$$

Portfolio $Y$ dominates portfolio $X$ if

$$
E_Y\ge E_X,\qquad V_Y\le V_X,
$$

and at least one of those two inequalities is strict. In words, $Y$ is at least as good on both dimensions and strictly better on one: it gives no less return with no more variance, or no more variance with strictly higher return.

A portfolio is **efficient** if no feasible portfolio dominates it. Equivalently, $X$ is efficient if there is no other feasible $Y$ such that

$$
E_Y\ge E_X,\qquad V_Y\le V_X,
$$

with at least one strict improvement.

This definition is the reason the efficient set is usually a frontier rather than a single point. Along the frontier, moving toward higher return usually requires accepting higher variance. Moving toward lower variance usually requires accepting lower return. Choosing one final portfolio from the efficient frontier requires an additional preference, such as a risk-aversion parameter, a target return, or a maximum acceptable variance.

## Three securities reduce to a triangle

Markowitz's geometric figures use three securities. Since

$$
X_1+X_2+X_3=1,
$$

we can draw every long-only portfolio in the $(X_1,X_2)$ plane by substituting

$$
X_3=1-X_1-X_2.
$$

The attainable set is the triangle

$$
X_1\ge 0,\qquad X_2\ge 0,\qquad X_1+X_2\le 1.
$$

Expected return becomes a line:

$$
\begin{aligned}
E
&=X_1R_1+X_2R_2+X_3R_3 \\
&=R_3+X_1(R_1-R_3)+X_2(R_2-R_3).
\end{aligned}
$$

Therefore fixed-$E$ curves are straight isomean lines in the $(X_1,X_2)$ plane. The return vector $R$ controls their slope.

## Variance becomes an ellipse

Use

$$
z=\begin{bmatrix}X_1\\X_2\end{bmatrix},\qquad
e_3=\begin{bmatrix}0\\0\\1\end{bmatrix},\qquad
B=\begin{bmatrix}
1&0\\
0&1\\
-1&-1
\end{bmatrix}.
$$

Then the full three-security weight vector is

$$
X=e_3+Bz
=
\begin{bmatrix}
X_1\\
X_2\\
1-X_1-X_2
\end{bmatrix}.
$$

Substitute into variance:

$$
\begin{aligned}
V
&=(e_3+Bz)^\top\Sigma(e_3+Bz)\\
&=z^\top B^\top\Sigma Bz
+2(B^\top\Sigma e_3)^\top z
+e_3^\top\Sigma e_3.
\end{aligned}
$$

Define

$$
A=B^\top\Sigma B,\qquad
b=B^\top\Sigma e_3,\qquad
c=e_3^\top\Sigma e_3.
$$

Then

$$
V(z)=z^\top A z+2b^\top z+c.
$$

The unconstrained minimum-variance point, which is the center of the isovariance ellipses, solves

$$
\nabla V=2Az+2b=0.
$$

So

$$
z_0=-A^{-1}b.
$$

If $z_0$ lies inside the triangle, the minimum-variance feasible portfolio is interior. If $z_0$ lies outside the triangle, the minimum feasible variance is on the boundary.

## Critical line

The critical line is the unconstrained path of tangency points between isomean lines and isovariance ellipses. The gradient of expected return in the $(X_1,X_2)$ plane is

$$
\nabla E=
\begin{bmatrix}
R_1-R_3\\
R_2-R_3
\end{bmatrix}.
$$

The tangency direction solves

$$
Ad=\nabla E,
$$

so

$$
d=A^{-1}\nabla E,\qquad z(t)=z_0+td.
$$

Before imposing the long-only triangle, this is the direction along which the optimal variance point moves as we ask for higher expected return. After imposing the triangle, part or all of that line may be infeasible.

To check whether the critical line intersects the attainable triangle, solve the three inequalities:

$$
z_1(t)\ge 0,\qquad z_2(t)\ge 0,\qquad z_1(t)+z_2(t)\le 1.
$$

Each inequality gives an interval of allowed $t$. The line intersects the triangle exactly when the three intervals overlap.

## Efficient frontier as optimization, not a grid cloud

A portfolio is efficient if no feasible portfolio has both higher $E$ and lower $V$. For a fixed target return $E^\star$, the efficient candidate is the solution of

$$
\min_X\quad X^\top\Sigma X
$$

subject to

$$
\mathbf{1}^\top X=1,\qquad R^\top X=E^\star,\qquad X_i\ge 0.
$$

Sweeping $E^\star$ from the global minimum-variance return to the maximum attainable return produces a thin efficient curve.

This distinction matters. A grid-based Pareto filter can create a dense cloud near tangencies, because many nearby grid points are almost nondominated numerically. The target-return optimization is the mathematical definition of the frontier.

## How the five notebook cases were designed

Each case is created by controlling two objects:

- $R$, which rotates the isomean lines.
- $\Sigma$, which moves the ellipse center $z_0$ and changes the ellipse shape.

The five cases are:

1. **Book Fig. 2:** choose $\Sigma$ so $z_0$ is inside the triangle. The efficient set starts near the interior low-variance point.
2. **Book Fig. 3:** choose $\Sigma$ so $z_0$ violates the triangle constraint, here $X_1+X_2>1$. The lowest reachable variance is on the boundary.
3. **Exercise Case 1:** choose $\Sigma$ and $R$ so the critical line misses the triangle. The efficient set moves to the boundary $X_3=0$, so security 3 is absent from efficient portfolios.
4. **Exercise Case 2:** set $R_1=R_2$ so isomean lines are parallel to the edge between securities 1 and 2, then choose negative covariance between those two securities so diversification along that edge is valuable.
5. **Exercise Case 3:** make one vertex both high-return and low-variance. The single portfolio $(1,0,0)$ dominates all others.

Here are the generated notebook versions of the cases:

![Markowitz book figure 2 reproduction](/assets/blog/markowitz/markowitz-book-fig2-center-inside.png)

![Markowitz book figure 3 reproduction](/assets/blog/markowitz/markowitz-book-fig3-center-outside.png)

![Exercise case with a missing security](/assets/blog/markowitz/markowitz-case1-missing-security.png)

![Exercise case with equal returns](/assets/blog/markowitz/markowitz-case2-equal-returns.png)

![Exercise case where only one portfolio is efficient](/assets/blog/markowitz/markowitz-case3-single-efficient-portfolio.png)

## Interactive reconstruction

Use the preset menu to recreate the five notebook plots. Then edit $R$ or the symmetric matrix $\Sigma$ directly.

The matrix below is the covariance matrix used by the geometry. If you want to think in correlation-matrix terms, set the diagonal entries to $1$ and use correlations as the off-diagonal entries. The notebook cases use covariance matrices, so the presets keep the original $\Sigma$ values.

<div class="markowitz-demo" id="markowitz-demo">
  <div class="demo-toolbar">
    <label>
      Preset
      <select id="casePreset">
        <option value="book2">Book Fig. 2: center inside</option>
        <option value="book3">Book Fig. 3: center outside</option>
        <option value="case1">Exercise 1: critical line misses</option>
        <option value="case2">Exercise 2: equal returns</option>
        <option value="case3">Exercise 3: one efficient portfolio</option>
      </select>
    </label>
  </div>

  <div class="matrix-editor">
    <div>
      <h3>Return vector $R$</h3>
      <div class="input-row three">
        <label>$R_1$ <input id="r1" type="number" step="0.001"></label>
        <label>$R_2$ <input id="r2" type="number" step="0.001"></label>
        <label>$R_3$ <input id="r3" type="number" step="0.001"></label>
      </div>
    </div>

    <div>
      <h3>Covariance / correlation-style matrix $\Sigma$</h3>
      <div class="sigma-grid" aria-label="Covariance matrix inputs">
        <input id="s11" type="number" step="0.001" aria-label="sigma 11">
        <input id="s12" type="number" step="0.001" aria-label="sigma 12">
        <input id="s13" type="number" step="0.001" aria-label="sigma 13">
        <input id="s21" type="number" step="0.001" aria-label="sigma 21" disabled>
        <input id="s22" type="number" step="0.001" aria-label="sigma 22">
        <input id="s23" type="number" step="0.001" aria-label="sigma 23">
        <input id="s31" type="number" step="0.001" aria-label="sigma 31" disabled>
        <input id="s32" type="number" step="0.001" aria-label="sigma 32" disabled>
        <input id="s33" type="number" step="0.001" aria-label="sigma 33">
      </div>
    </div>
  </div>

  <svg id="geometry-svg" viewBox="0 0 860 640" role="img" aria-label="Interactive Markowitz three-security geometry"></svg>
  <p class="demo-readout" id="geometry-readout"></p>
</div>

<style>
  .markowitz-demo {
    margin: 30px 0;
    padding: 20px;
    border: 1px solid rgba(20, 23, 31, 0.13);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.86);
    box-shadow: 0 10px 34px rgba(22, 30, 45, 0.06);
  }

  .demo-toolbar {
    margin-bottom: 18px;
  }

  .demo-toolbar label,
  .matrix-editor label {
    display: grid;
    gap: 6px;
    color: #303847;
    font-size: 0.95rem;
  }

  .demo-toolbar select,
  .matrix-editor input {
    min-height: 36px;
    border: 1px solid rgba(20, 23, 31, 0.18);
    border-radius: 6px;
    background: #ffffff;
    color: #14171f;
    font: inherit;
  }

  .demo-toolbar select {
    width: min(100%, 460px);
    padding: 0 10px;
  }

  .matrix-editor {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 22px;
    margin-bottom: 18px;
  }

  .matrix-editor h3 {
    margin: 0 0 10px;
    font-size: 1rem;
  }

  .input-row.three {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .sigma-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .matrix-editor input {
    width: 100%;
    padding: 0 8px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  .matrix-editor input:disabled {
    color: #59616f;
    background: #eef0f4;
  }

  .markowitz-demo svg {
    display: block;
    width: 100%;
    min-height: 520px;
    border: 1px solid rgba(20, 23, 31, 0.1);
    border-radius: 8px;
    background: #fbfaf7;
  }

  .demo-readout {
    margin: 14px 0 0;
    color: #303847;
  }

  @media (max-width: 760px) {
    .matrix-editor,
    .input-row.three {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  (function () {
    const svg = document.getElementById('geometry-svg');
    if (!svg) return;

    const ids = ['r1', 'r2', 'r3', 's11', 's12', 's13', 's21', 's22', 's23', 's31', 's32', 's33'];
    const el = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));
    const presetSelect = document.getElementById('casePreset');
    const readout = document.getElementById('geometry-readout');

    const presets = {
      book2: {
        r: [0.08, 0.14, 0.03],
        s: [[0.09, 0, 0], [0, 0.06, 0], [0, 0, 0.04]]
      },
      book3: {
        r: [0.143594, 0.140737, 0.135630],
        s: [[4.515211, -4.122941, -0.395992], [-4.122941, 4.859773, 1.065369], [-0.395992, 1.065369, 0.831767]]
      },
      case1: {
        r: [0.113307, 0.093703, 0.099861],
        s: [[0.042838, -0.014732, 0.063320], [-0.014732, 0.127790, 0.095559], [0.063320, 0.095559, 0.369518]]
      },
      case2: {
        r: [0.12, 0.12, 0.05],
        s: [[0.04, -0.02, 0], [-0.02, 0.04, 0], [0, 0, 0.025]]
      },
      case3: {
        r: [0.12, 0.08, 0.04],
        s: [[0.01, 0.015, 0.02], [0.015, 0.04, 0.04], [0.02, 0.04, 0.09]]
      }
    };

    function fmt(x) {
      return Number.isFinite(x) ? Number(x).toFixed(6).replace(/0+$/, '').replace(/\.$/, '') : '';
    }

    function setInputs(preset) {
      el.r1.value = fmt(preset.r[0]);
      el.r2.value = fmt(preset.r[1]);
      el.r3.value = fmt(preset.r[2]);
      el.s11.value = fmt(preset.s[0][0]);
      el.s12.value = fmt(preset.s[0][1]);
      el.s13.value = fmt(preset.s[0][2]);
      el.s22.value = fmt(preset.s[1][1]);
      el.s23.value = fmt(preset.s[1][2]);
      el.s33.value = fmt(preset.s[2][2]);
      syncSymmetricInputs();
    }

    function syncSymmetricInputs() {
      el.s21.value = el.s12.value;
      el.s31.value = el.s13.value;
      el.s32.value = el.s23.value;
    }

    function readInputs() {
      syncSymmetricInputs();
      return {
        r: [Number(el.r1.value), Number(el.r2.value), Number(el.r3.value)],
        s: [
          [Number(el.s11.value), Number(el.s12.value), Number(el.s13.value)],
          [Number(el.s12.value), Number(el.s22.value), Number(el.s23.value)],
          [Number(el.s13.value), Number(el.s23.value), Number(el.s33.value)]
        ]
      };
    }

    function matVec2(m, v) {
      return [
        m[0][0] * v[0] + m[0][1] * v[1],
        m[1][0] * v[0] + m[1][1] * v[1]
      ];
    }

    function inv2(m) {
      const det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
      if (Math.abs(det) < 1e-12) return null;
      return [[m[1][1] / det, -m[0][1] / det], [-m[1][0] / det, m[0][0] / det]];
    }

    function solveLinear(A, b) {
      const n = b.length;
      const M = A.map((row, i) => row.concat([b[i]]));
      for (let col = 0; col < n; col += 1) {
        let pivot = col;
        for (let row = col + 1; row < n; row += 1) {
          if (Math.abs(M[row][col]) > Math.abs(M[pivot][col])) pivot = row;
        }
        if (Math.abs(M[pivot][col]) < 1e-12) return null;
        [M[col], M[pivot]] = [M[pivot], M[col]];
        const div = M[col][col];
        for (let k = col; k <= n; k += 1) M[col][k] /= div;
        for (let row = 0; row < n; row += 1) {
          if (row === col) continue;
          const factor = M[row][col];
          for (let k = col; k <= n; k += 1) M[row][k] -= factor * M[col][k];
        }
      }
      return M.map((row) => row[n]);
    }

    function geometry(r, s) {
      const A = [
        [s[0][0] - 2 * s[0][2] + s[2][2], s[0][1] - s[0][2] - s[1][2] + s[2][2]],
        [s[0][1] - s[0][2] - s[1][2] + s[2][2], s[1][1] - 2 * s[1][2] + s[2][2]]
      ];
      const b = [s[0][2] - s[2][2], s[1][2] - s[2][2]];
      const invA = inv2(A);
      const z0 = invA ? matVec2(invA, [-b[0], -b[1]]) : [NaN, NaN];
      const gradE = [r[0] - r[2], r[1] - r[2]];
      const d = invA ? matVec2(invA, gradE) : [NaN, NaN];
      return { A, b, c: s[2][2], z0, gradE, d };
    }

    function variance(w, s) {
      let out = 0;
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) out += w[i] * s[i][j] * w[j];
      }
      return out;
    }

    function ret(w, r) {
      return w[0] * r[0] + w[1] * r[1] + w[2] * r[2];
    }

    function xyToW(z) {
      return [z[0], z[1], 1 - z[0] - z[1]];
    }

    function wToZ(w) {
      return [w[0], w[1]];
    }

    function feasible(w, tol = 1e-7) {
      return w.every((x) => x >= -tol) && Math.abs(w[0] + w[1] + w[2] - 1) < 1e-6;
    }

    function minVarianceNoTarget(r, s) {
      const candidates = [];
      const K = [
        [2 * s[0][0], 2 * s[0][1], 2 * s[0][2], 1],
        [2 * s[1][0], 2 * s[1][1], 2 * s[1][2], 1],
        [2 * s[2][0], 2 * s[2][1], 2 * s[2][2], 1],
        [1, 1, 1, 0]
      ];
      const sol = solveLinear(K, [0, 0, 0, 1]);
      if (sol) candidates.push(sol.slice(0, 3));

      [[0, 1], [0, 2], [1, 2]].forEach((pair) => {
        const i = pair[0], j = pair[1];
        const denom = s[i][i] + s[j][j] - 2 * s[i][j];
        if (Math.abs(denom) > 1e-12) {
          const wi = (s[j][j] - s[i][j]) / denom;
          const w = [0, 0, 0];
          w[i] = wi;
          w[j] = 1 - wi;
          candidates.push(w);
        }
      });
      candidates.push([1, 0, 0], [0, 1, 0], [0, 0, 1]);

      return candidates
        .filter((w) => feasible(w))
        .map((w) => ({ w, v: variance(w, s), e: ret(w, r) }))
        .sort((a, b) => a.v - b.v)[0];
    }

    function minVarianceForTarget(target, r, s) {
      const candidates = [];
      const K = [
        [2 * s[0][0], 2 * s[0][1], 2 * s[0][2], 1, r[0]],
        [2 * s[1][0], 2 * s[1][1], 2 * s[1][2], 1, r[1]],
        [2 * s[2][0], 2 * s[2][1], 2 * s[2][2], 1, r[2]],
        [1, 1, 1, 0, 0],
        [r[0], r[1], r[2], 0, 0]
      ];
      const sol = solveLinear(K, [0, 0, 0, 1, target]);
      if (sol) candidates.push(sol.slice(0, 3));

      [[0, 1], [0, 2], [1, 2]].forEach((pair) => {
        const i = pair[0], j = pair[1];
        const denom = r[i] - r[j];
        if (Math.abs(denom) > 1e-12) {
          const wi = (target - r[j]) / denom;
          const w = [0, 0, 0];
          w[i] = wi;
          w[j] = 1 - wi;
          candidates.push(w);
        } else if (Math.abs(target - r[i]) < 1e-8) {
          const denomV = s[i][i] + s[j][j] - 2 * s[i][j];
          const wi = Math.abs(denomV) > 1e-12 ? (s[j][j] - s[i][j]) / denomV : 0.5;
          const w = [0, 0, 0];
          w[i] = wi;
          w[j] = 1 - wi;
          candidates.push(w);
        }
      });

      [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach((w) => {
        if (Math.abs(ret(w, r) - target) < 1e-7) candidates.push(w);
      });

      return candidates
        .filter((w) => feasible(w) && Math.abs(ret(w, r) - target) < 1e-6)
        .map((w) => ({ w, v: variance(w, s), e: ret(w, r) }))
        .sort((a, b) => a.v - b.v)[0] || null;
    }

    function frontier(r, s) {
      const gmv = minVarianceNoTarget(r, s);
      if (!gmv) return [];
      const maxReturn = Math.max(...r);
      if (Math.abs(maxReturn - gmv.e) < 1e-8) return [gmv];
      const out = [];
      for (let k = 0; k <= 90; k += 1) {
        const target = gmv.e + (maxReturn - gmv.e) * (k / 90);
        const p = minVarianceForTarget(target, r, s);
        if (p) out.push(p);
      }
      return out;
    }

    function lineIntersectsTriangle(z0, d) {
      let lo = -Infinity;
      let hi = Infinity;
      const inequalities = [
        [d[0], z0[0]],
        [d[1], z0[1]],
        [-(d[0] + d[1]), 1 - z0[0] - z0[1]]
      ];
      for (const [a, b] of inequalities) {
        if (Math.abs(a) < 1e-12) {
          if (b < 0) return false;
        } else {
          const bound = -b / a;
          if (a > 0) lo = Math.max(lo, bound);
          else hi = Math.min(hi, bound);
        }
      }
      return lo <= hi;
    }

    function eigen2(A) {
      const tr = A[0][0] + A[1][1];
      const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      const disc = Math.max(tr * tr - 4 * det, 0);
      const l1 = (tr + Math.sqrt(disc)) / 2;
      const l2 = (tr - Math.sqrt(disc)) / 2;
      const v1 = Math.abs(A[0][1]) > 1e-12 ? [l1 - A[1][1], A[0][1]] : [1, 0];
      const norm = Math.hypot(v1[0], v1[1]) || 1;
      const e1 = [v1[0] / norm, v1[1] / norm];
      const e2 = [-e1[1], e1[0]];
      return { values: [l1, l2], vectors: [e1, e2] };
    }

    function escapeXml(s) {
      return String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    function draw() {
      const { r, s } = readInputs();
      const g = geometry(r, s);
      const f = frontier(r, s);
      const xs = [0, 1, 0, g.z0[0]].filter(Number.isFinite);
      const ys = [0, 0, 1, g.z0[1]].filter(Number.isFinite);
      const xMin = Math.min(-0.16, ...xs.map((x) => x - 0.12));
      const xMax = Math.max(1.16, ...xs.map((x) => x + 0.12));
      const yMin = Math.min(-0.18, ...ys.map((y) => y - 0.12));
      const yMax = Math.max(1.16, ...ys.map((y) => y + 0.12));
      const width = 860, height = 640;
      const margin = { left: 72, right: 34, top: 34, bottom: 64 };
      const plotW = width - margin.left - margin.right;
      const plotH = height - margin.top - margin.bottom;
      const X = (x) => margin.left + ((x - xMin) / (xMax - xMin)) * plotW;
      const Y = (y) => margin.top + (1 - (y - yMin) / (yMax - yMin)) * plotH;
      const point = (z) => X(z[0]).toFixed(2) + ',' + Y(z[1]).toFixed(2);

      const parts = [];
      parts.push('<rect x="0" y="0" width="' + width + '" height="' + height + '" fill="#fbfaf7"></rect>');
      parts.push('<line x1="' + X(0) + '" y1="' + Y(0) + '" x2="' + X(1.04) + '" y2="' + Y(0) + '" stroke="#59616f"></line>');
      parts.push('<line x1="' + X(0) + '" y1="' + Y(0) + '" x2="' + X(0) + '" y2="' + Y(1.04) + '" stroke="#59616f"></line>');
      parts.push('<text x="' + X(1.04) + '" y="' + (Y(0) + 24) + '" text-anchor="end" fill="#59616f" font-size="14">X1</text>');
      parts.push('<text x="' + (X(0) - 18) + '" y="' + Y(1.04) + '" text-anchor="end" fill="#59616f" font-size="14">X2</text>');

      const eig = eigen2(g.A);
      if (eig.values[0] > 1e-10 && eig.values[1] > 1e-10 && Number.isFinite(g.z0[0])) {
        const centerV = variance(xyToW(g.z0), s);
        const vertexVs = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map((w) => variance(w, s));
        const maxDelta = Math.max(...vertexVs.map((v) => Math.abs(v - centerV)), 0.001);
        for (let level = 1; level <= 7; level += 1) {
          const delta = maxDelta * level / 4.4;
          const a = Math.sqrt(delta / eig.values[0]);
          const b = Math.sqrt(delta / eig.values[1]);
          const pts = [];
          for (let k = 0; k <= 160; k += 1) {
            const t = 2 * Math.PI * k / 160;
            const z = [
              g.z0[0] + a * Math.cos(t) * eig.vectors[0][0] + b * Math.sin(t) * eig.vectors[1][0],
              g.z0[1] + a * Math.cos(t) * eig.vectors[0][1] + b * Math.sin(t) * eig.vectors[1][1]
            ];
            pts.push(point(z));
          }
          parts.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#202633" stroke-width="1.1" opacity="0.62"></polyline>');
        }
      }

      const minR = Math.min(...r);
      const maxR = Math.max(...r);
      for (let i = 0; i <= 5; i += 1) {
        const target = minR + (maxR - minR) * (i / 5);
        const c = target - r[2];
        const candidates = [];
        const gx = g.gradE[0], gy = g.gradE[1];
        if (Math.abs(gy) > 1e-12) {
          candidates.push([xMin, (c - gx * xMin) / gy], [xMax, (c - gx * xMax) / gy]);
        }
        if (Math.abs(gx) > 1e-12) {
          candidates.push([(c - gy * yMin) / gx, yMin], [(c - gy * yMax) / gx, yMax]);
        }
        const visible = candidates.filter((z) => z[0] >= xMin - 1e-8 && z[0] <= xMax + 1e-8 && z[1] >= yMin - 1e-8 && z[1] <= yMax + 1e-8);
        if (visible.length >= 2) {
          parts.push('<line x1="' + X(visible[0][0]) + '" y1="' + Y(visible[0][1]) + '" x2="' + X(visible[1][0]) + '" y2="' + Y(visible[1][1]) + '" stroke="#2457c5" stroke-width="1.2" stroke-dasharray="7 7" opacity="0.58"></line>');
        }
      }

      parts.push('<polygon points="' + [point([0, 0]), point([1, 0]), point([0, 1])].join(' ') + '" fill="rgba(36,87,197,0.06)" stroke="#59616f" stroke-width="2"></polygon>');
      parts.push('<text x="' + (X(0) - 8) + '" y="' + (Y(0) + 18) + '" text-anchor="end" fill="#59616f" font-size="13">(0,0,1)</text>');
      parts.push('<text x="' + X(1) + '" y="' + (Y(0) + 18) + '" text-anchor="middle" fill="#59616f" font-size="13">(1,0,0)</text>');
      parts.push('<text x="' + (X(0) - 8) + '" y="' + (Y(1) - 8) + '" text-anchor="end" fill="#59616f" font-size="13">(0,1,0)</text>');

      if (Number.isFinite(g.z0[0]) && Number.isFinite(g.d[0])) {
        const t1 = -2.5, t2 = 2.5;
        const a = [g.z0[0] + t1 * g.d[0], g.z0[1] + t1 * g.d[1]];
        const b = [g.z0[0] + t2 * g.d[0], g.z0[1] + t2 * g.d[1]];
        parts.push('<line x1="' + X(a[0]) + '" y1="' + Y(a[1]) + '" x2="' + X(b[0]) + '" y2="' + Y(b[1]) + '" stroke="#007f78" stroke-width="2" stroke-dasharray="4 5" opacity="0.85"></line>');
        parts.push('<circle cx="' + X(g.z0[0]) + '" cy="' + Y(g.z0[1]) + '" r="5.5" fill="#007f78"></circle>');
        parts.push('<text x="' + (X(g.z0[0]) + 9) + '" y="' + (Y(g.z0[1]) - 9) + '" fill="#007f78" font-size="13" font-weight="700">z0</text>');
      }

      if (f.length) {
        const frontierPoints = f.map((p) => point(wToZ(p.w))).join(' ');
        if (f.length === 1) {
          parts.push('<circle cx="' + X(f[0].w[0]) + '" cy="' + Y(f[0].w[1]) + '" r="7" fill="#c44536"></circle>');
        } else {
          parts.push('<polyline points="' + frontierPoints + '" fill="none" stroke="#c44536" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>');
        }
      }

      parts.push('<text x="' + (width - 34) + '" y="30" text-anchor="end" fill="#202633" font-size="13">black: isovariance · blue: isomean · green: critical line · red: efficient set</text>');
      svg.innerHTML = parts.join('');

      const intersects = lineIntersectsTriangle(g.z0, g.d);
      const mins = f.length ? [0, 1, 2].map((i) => Math.min(...f.map((p) => p.w[i]))) : [NaN, NaN, NaN];
      const maxs = f.length ? [0, 1, 2].map((i) => Math.max(...f.map((p) => p.w[i]))) : [NaN, NaN, NaN];
      const absent = maxs.map((m, i) => (m < 0.015 ? String(i + 1) : null)).filter(Boolean);
      readout.innerHTML = '<strong>Diagnostics.</strong> ' + [
        'z0 = (' + fmt(g.z0[0]) + ', ' + fmt(g.z0[1]) + '); ',
        'd = (' + fmt(g.d[0]) + ', ' + fmt(g.d[1]) + '); ',
        'critical line intersects triangle: ' + (intersects ? 'yes' : 'no') + '; ',
        'assets absent from efficient set: ' + (absent.length ? absent.join(', ') : 'none') + '. ',
        f.length ? 'Weight ranges: min X = [' + mins.map(fmt).join(', ') + '], max X = [' + maxs.map(fmt).join(', ') + '].' : 'No feasible frontier was found for this matrix.'
      ].map(escapeXml).join('');
    }

    presetSelect.addEventListener('change', () => {
      setInputs(presets[presetSelect.value]);
      draw();
    });
    ['r1', 'r2', 'r3', 's11', 's12', 's13', 's22', 's23', 's33'].forEach((id) => {
      el[id].addEventListener('input', draw);
    });
    setInputs(presets.book2);
    draw();
  }());
</script>

## One worked case: Book Fig. 2

For the first book-style case, use

$$
R=\begin{bmatrix}0.08&0.14&0.03\end{bmatrix},
\qquad
\Sigma=
\begin{bmatrix}
0.09&0&0\\
0&0.06&0\\
0&0&0.04
\end{bmatrix}.
$$

The isomean equation is

$$
E=0.03+0.05X_1+0.11X_2.
$$

Variance is

$$
V=0.09X_1^2+0.06X_2^2+0.04(1-X_1-X_2)^2.
$$

After collecting terms,

$$
V=0.13X_1^2+0.08X_1X_2+0.10X_2^2-0.08X_1-0.08X_2+0.04.
$$

So

$$
A=
\begin{bmatrix}
0.13&0.04\\
0.04&0.10
\end{bmatrix},
\qquad
b=
\begin{bmatrix}
-0.04\\
-0.04
\end{bmatrix},
\qquad
c=0.04.
$$

The ellipse center is

$$
z_0=-A^{-1}b=
\begin{bmatrix}
0.210526\\
0.315789
\end{bmatrix},
$$

which is inside the triangle because both coordinates are nonnegative and

$$
0.210526+0.315789<1.
$$

The critical-line direction is

$$
d=A^{-1}
\begin{bmatrix}
R_1-R_3\\
R_2-R_3
\end{bmatrix}
=
A^{-1}
\begin{bmatrix}
0.05\\
0.11
\end{bmatrix}
=
\begin{bmatrix}
0.052632\\
1.078947
\end{bmatrix}.
$$

That is why the first plot shows an interior ellipse center and an efficient set that begins near the low-variance interior region.

## One boundary case: Exercise Case 1

For the case where the critical line misses the triangle, use

$$
R=\begin{bmatrix}0.113307&0.093703&0.099861\end{bmatrix},
$$

and

$$
\Sigma=
\begin{bmatrix}
0.042838&-0.014732&0.063320\\
-0.014732&0.127790&0.095559\\
0.063320&0.095559&0.369518
\end{bmatrix}.
$$

The return plane becomes

$$
E=0.099861+0.013446X_1-0.006158X_2.
$$

The ellipse center is

$$
z_0=
\begin{bmatrix}
0.816318\\
0.372436
\end{bmatrix},
$$

which violates the triangle because

$$
0.816318+0.372436>1.
$$

The critical-line direction is

$$
d=
\begin{bmatrix}
0.108413\\
-0.089476
\end{bmatrix}.
$$

Solving the three triangle inequalities for $z(t)=z_0+td$ gives no common interval, so the unconstrained tangency path never enters the attainable triangle. The efficient portfolios therefore move to the boundary. In this construction the relevant boundary is $X_3=0$, so security 3 is absent from the efficient set.

## Takeaway

The old rule fails because expected return alone is a weighted average. It gives no reason to diversify unless several assets tie for best expected return.

Mean-variance analysis adds the missing object: covariance. Once variance enters the decision, diversification can improve the portfolio because the covariance matrix determines whether risks offset each other.

That is the core idea behind the efficient frontier.

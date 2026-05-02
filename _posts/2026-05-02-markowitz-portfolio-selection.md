---
layout: post
title: "Reading Markowitz 1952 Through Geometry"
description: "A research note on why return-only portfolio choice fails, how variance makes diversification meaningful, and how the three-security geometry leads to the efficient frontier."
category_label: "Reading note"
---

Harry Markowitz's 1952 paper is not just the origin story of mean-variance optimization. It is also a very clean lesson in why a portfolio rule needs both return and risk.

The paper separates portfolio selection into two stages:

$$
\text{data and judgment} \rightarrow (\mu, \Sigma) \rightarrow w.
$$

The first stage forms beliefs about future returns. The second stage turns those beliefs into portfolio weights. The paper mostly studies the second stage.

## Why return alone is not enough

The old rule says to maximize anticipated return. If $R_i$ is the anticipated return of security $i$ and $X_i$ is the portfolio fraction invested in that security, then:

$$
R = \sum_i X_i R_i.
$$

Because this is a weighted average, it cannot exceed the largest individual anticipated return:

$$
R \le \max_i R_i.
$$

So a return-only rule either puts everything into the highest-return security, or is indifferent among securities tied for highest return. It has no mechanism for saying that a lower-return but safer diversified portfolio may be better.

Markowitz's replacement is to consider expected return and variance together:

$$
\mathbb{E}[R_p] = w^\top \mu,
\qquad
\operatorname{Var}(R_p) = w^\top \Sigma w.
$$

Expected return is linear in the weights. Variance is quadratic. That difference is where diversification enters the model.

## The three-security picture

For three long-only securities, $X_1 + X_2 + X_3 = 1$, so the full portfolio can be drawn in the $(X_1, X_2)$ plane with:

$$
X_3 = 1 - X_1 - X_2.
$$

The feasible portfolios form a triangle. Fixed-return lines are straight isomean lines. Fixed-variance curves are ellipses. The efficient set is the boundary where no other feasible portfolio has both higher expected return and lower variance.

![Markowitz book figure 2 reproduction](/assets/blog/markowitz/markowitz-book-fig2-center-inside.png)

When the unconstrained minimum-variance point lies inside the triangle, the efficient set starts near the interior low-variance region and moves toward higher-return boundary portfolios.

![Markowitz book figure 3 reproduction](/assets/blog/markowitz/markowitz-book-fig3-center-outside.png)

When the ellipse center lies outside the attainable triangle, the lowest feasible variance is forced onto the boundary. The efficient set remains a boundary object because the unconstrained minimum-variance portfolio is infeasible under long-only constraints.

## A small interactive version

The widget below is not running Python. It is a small browser-side JavaScript version of the same Markowitz idea. Change the expected returns or risk aversion and the plotted efficient frontier updates.

<div class="markowitz-demo" id="markowitz-demo">
  <div class="demo-controls">
    <label>Return asset 1 <input id="mu1" type="range" min="2" max="18" value="8" step="1"><span id="mu1-label"></span></label>
    <label>Return asset 2 <input id="mu2" type="range" min="2" max="18" value="14" step="1"><span id="mu2-label"></span></label>
    <label>Return asset 3 <input id="mu3" type="range" min="2" max="18" value="4" step="1"><span id="mu3-label"></span></label>
    <label>Risk aversion <input id="lambda" type="range" min="1" max="35" value="10" step="1"><span id="lambda-label"></span></label>
  </div>
  <svg id="frontier-svg" viewBox="0 0 720 420" role="img" aria-label="Interactive risk-return frontier"></svg>
  <p class="demo-readout" id="frontier-readout"></p>
</div>

<style>
  .markowitz-demo {
    margin: 30px 0;
    padding: 20px;
    border: 1px solid rgba(20, 23, 31, 0.13);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.82);
    box-shadow: 0 10px 34px rgba(22, 30, 45, 0.06);
  }

  .demo-controls {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 20px;
    margin-bottom: 18px;
  }

  .demo-controls label {
    display: grid;
    gap: 6px;
    color: #303847;
    font-size: 0.95rem;
  }

  .demo-controls span {
    color: #59616f;
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  .markowitz-demo svg {
    display: block;
    width: 100%;
    min-height: 360px;
    border: 1px solid rgba(20, 23, 31, 0.1);
    border-radius: 8px;
    background: #fbfaf7;
  }

  .demo-readout {
    margin: 14px 0 0;
    color: #303847;
  }

  @media (max-width: 720px) {
    .demo-controls {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  (function () {
    const svg = document.getElementById('frontier-svg');
    if (!svg) return;

    const inputs = {
      mu1: document.getElementById('mu1'),
      mu2: document.getElementById('mu2'),
      mu3: document.getElementById('mu3'),
      lambda: document.getElementById('lambda')
    };
    const labels = {
      mu1: document.getElementById('mu1-label'),
      mu2: document.getElementById('mu2-label'),
      mu3: document.getElementById('mu3-label'),
      lambda: document.getElementById('lambda-label')
    };
    const readout = document.getElementById('frontier-readout');

    function portfolioStats(w, mu, cov) {
      const ret = w[0] * mu[0] + w[1] * mu[1] + w[2] * mu[2];
      let variance = 0;
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          variance += w[i] * cov[i][j] * w[j];
        }
      }
      return { ret, risk: Math.sqrt(Math.max(variance, 0)), variance };
    }

    function makePortfolios(mu, lambda) {
      const vol = [0.30, 0.22, 0.18];
      const corr = [
        [1.00, 0.18, 0.04],
        [0.18, 1.00, 0.30],
        [0.04, 0.30, 1.00]
      ];
      const cov = corr.map((row, i) => row.map((rho, j) => rho * vol[i] * vol[j]));
      const points = [];
      let best = null;

      for (let i = 0; i <= 50; i += 1) {
        for (let j = 0; j <= 50 - i; j += 1) {
          const w = [i / 50, j / 50, (50 - i - j) / 50];
          const stats = portfolioStats(w, mu, cov);
          const score = stats.ret - lambda * stats.variance;
          const point = { w, score, ...stats };
          points.push(point);
          if (!best || point.score > best.score) best = point;
        }
      }

      const efficient = points.filter((p) => {
        return !points.some((q) => {
          const atLeastAsGood = q.ret >= p.ret - 1e-9 && q.risk <= p.risk + 1e-9;
          const strictlyBetter = q.ret > p.ret + 1e-9 || q.risk < p.risk - 1e-9;
          return atLeastAsGood && strictlyBetter;
        });
      }).sort((a, b) => a.risk - b.risk);

      return { points, efficient, best };
    }

    function draw() {
      const mu = [
        Number(inputs.mu1.value) / 100,
        Number(inputs.mu2.value) / 100,
        Number(inputs.mu3.value) / 100
      ];
      const lambda = Number(inputs.lambda.value);
      labels.mu1.textContent = (mu[0] * 100).toFixed(0) + '%';
      labels.mu2.textContent = (mu[1] * 100).toFixed(0) + '%';
      labels.mu3.textContent = (mu[2] * 100).toFixed(0) + '%';
      labels.lambda.textContent = lambda.toFixed(0);

      const { points, efficient, best } = makePortfolios(mu, lambda);
      const margin = { left: 62, right: 24, top: 24, bottom: 58 };
      const width = 720;
      const height = 420;
      const plotW = width - margin.left - margin.right;
      const plotH = height - margin.top - margin.bottom;
      const minRisk = Math.min(...points.map((p) => p.risk)) * 0.92;
      const maxRisk = Math.max(...points.map((p) => p.risk)) * 1.05;
      const minRet = Math.min(...points.map((p) => p.ret)) * 0.92;
      const maxRet = Math.max(...points.map((p) => p.ret)) * 1.08;
      const x = (risk) => margin.left + ((risk - minRisk) / (maxRisk - minRisk)) * plotW;
      const y = (ret) => margin.top + (1 - (ret - minRet) / (maxRet - minRet)) * plotH;

      const pointEls = points.map((p) => {
        return '<circle cx="' + x(p.risk).toFixed(2) + '" cy="' + y(p.ret).toFixed(2) + '" r="2.1" fill="#b9c1ce" opacity="0.55"></circle>';
      }).join('');
      const linePoints = efficient.map((p) => x(p.risk).toFixed(2) + ',' + y(p.ret).toFixed(2)).join(' ');

      svg.innerHTML = [
        '<line x1="' + margin.left + '" y1="' + (height - margin.bottom) + '" x2="' + (width - margin.right) + '" y2="' + (height - margin.bottom) + '" stroke="#59616f"></line>',
        '<line x1="' + margin.left + '" y1="' + margin.top + '" x2="' + margin.left + '" y2="' + (height - margin.bottom) + '" stroke="#59616f"></line>',
        '<text x="' + (width / 2) + '" y="402" text-anchor="middle" fill="#59616f" font-size="14">portfolio risk</text>',
        '<text x="20" y="' + (height / 2) + '" text-anchor="middle" fill="#59616f" font-size="14" transform="rotate(-90 20 ' + (height / 2) + ')">expected return</text>',
        pointEls,
        '<polyline points="' + linePoints + '" fill="none" stroke="#2457c5" stroke-width="4" stroke-linejoin="round"></polyline>',
        '<circle cx="' + x(best.risk).toFixed(2) + '" cy="' + y(best.ret).toFixed(2) + '" r="7" fill="#c44536"></circle>',
        '<text x="' + (x(best.risk) + 10).toFixed(2) + '" y="' + (y(best.ret) - 10).toFixed(2) + '" fill="#c44536" font-size="14" font-weight="700">chosen by utility</text>'
      ].join('');

      readout.textContent = 'Selected weights: asset 1 ' + (best.w[0] * 100).toFixed(0) +
        '%, asset 2 ' + (best.w[1] * 100).toFixed(0) +
        '%, asset 3 ' + (best.w[2] * 100).toFixed(0) +
        '%. Expected return ' + (best.ret * 100).toFixed(1) +
        '%, risk ' + (best.risk * 100).toFixed(1) + '%.';
    }

    Object.values(inputs).forEach((input) => input.addEventListener('input', draw));
    draw();
  }());
</script>

## The notebook version

The notebook version constructs the frontier by solving a minimum-variance problem for each target return. The important idea is this constrained problem:

$$
\min_X \quad X^\top \Sigma X
$$

subject to:

$$
X^\top \mu = E^\star,\quad \mathbf{1}^\top X = 1,\quad X_i \ge 0.
$$

In code, the workflow looks like:

```python
def efficient_frontier_by_targets(mu, cov, n_targets=80):
    gmv = minimum_variance_portfolio(cov)
    min_return = float(gmv @ mu)
    max_return = float(np.max(mu))
    targets = np.linspace(min_return, max_return, n_targets)

    frontier = []
    for target in targets:
        result = minimize(
            lambda w: float(w @ cov @ w),
            x0=np.ones(3) / 3,
            constraints=[
                {"type": "eq", "fun": lambda w: np.sum(w) - 1},
                {"type": "eq", "fun": lambda w: float(w @ mu) - target},
            ],
            bounds=[(0, 1), (0, 1), (0, 1)],
        )
        if result.success:
            frontier.append(result.x)
    return np.array(frontier)
```

That is cleaner than just plotting many random portfolios and keeping the visually nondominated points. The target-return formulation directly encodes the efficient frontier definition.

## Extra cases from the notebook

The notebook also reproduces the exercise-style cases from Markowitz's paper. These are useful because small changes in $R$ or $\Sigma$ visibly change the geometry.

![Exercise case with a missing security](/assets/blog/markowitz/markowitz-case1-missing-security.png)

![Exercise case with equal returns](/assets/blog/markowitz/markowitz-case2-equal-returns.png)

![Exercise case where only one portfolio is efficient](/assets/blog/markowitz/markowitz-case3-single-efficient-portfolio.png)

## Takeaway

The old rule fails because expected return alone is a weighted average. It gives no reason to diversify unless several assets tie for best expected return.

Mean-variance analysis adds the missing object: covariance. Once variance enters the decision, diversification can improve the portfolio because the covariance matrix determines whether risks offset each other.

That is the core idea behind the efficient frontier.

---
layout: post
title: "Reading Markowitz 1952 Through Geometry"
description: "A worked reading note on Markowitz's three-security geometry, with the notation spelled out and an interactive widget for changing returns and covariances."
category_label: "Reading note"
---

I am new to quantitative finance, so I wanted my first topic to be something basic enough to be foundational but still mathematical enough to be interesting. Portfolio optimization felt like the right starting point. It is one of those phrases I had heard many times, but I did not really know what the first principles looked like.

That led me to Markowitz's 1952 paper, *Portfolio Selection*. It is short, and I expected it to be more historical than useful. Instead, I found it surprisingly alive. The paper is not just saying "diversify because diversification is good." It shows, with a small geometric picture, why return alone is the wrong objective.

The part that caught me was the three-security case. The whole problem can be drawn on a page: straight lines for return, ellipses for variance, and a triangle for the portfolios we are allowed to hold. Once I saw that picture, the slogan became much more concrete. "Choose the highest return" sounds reasonable until risk is drawn on the same figure. Then the rule starts to look incomplete.

This post is my worked reading note. I am not trying to write a finance textbook. I am trying to record the path from "I have heard of portfolio optimization" to "I can see what Markowitz is doing in the geometry."

Markowitz separates portfolio selection into two stages. First, we form beliefs about the securities: their expected returns, their variances, and how they move together. Then we use those beliefs to choose portfolio weights. The paper mostly studies the second stage. It asks: if we already have expected returns and covariances, how should we choose the portfolio?

![Handwritten sketch of Markowitz's two-stage portfolio-selection setup](/assets/blog/markowitz/markowitz-two-stage-sketch.png)

*AI-generated handwritten-style sketch, created with GPT-Image-2 for this post. It is my visual summary of the two-stage setup, not a figure from Markowitz.*

I use Markowitz-style notation below. Suppose there are $n$ securities, and let $i$ index one of them. The anticipated return of security $i$ is $R_i$, and the portfolio weight in that security is $X_i$, meaning the fraction of wealth invested there. I write the return vector as $R=(R_1,\ldots,R_n)^\top$ and the weight vector as $X=(X_1,\ldots,X_n)^\top$. The covariance matrix is $\Sigma$; its diagonal entries are variances, and its off-diagonal entries are covariances. I use $E$ for portfolio expected return and $V$ for portfolio variance. In this post, variance is the mathematical version of risk.

The main question is: which weights $X$ are worth considering once we care about both return and risk?

## Why return alone is not enough

The tempting first rule is simple: choose the portfolio with the largest anticipated return. This is the rule Markowitz pushes against. If the portfolio return is called $R_p$, then

$$
R_p=\sum_i X_iR_i.
$$

For now, I am assuming the same simple constraint used in the geometric examples: no short selling and all wealth invested. That is,

$$
\sum_i X_i=1,\qquad X_i\ge 0,
$$

This means $R_p$ is only a weighted average. If the best individual anticipated return is $R_m=\max_i R_i$, then every $R_i\le R_m$, so

$$
R_p=\sum_i X_iR_i\le \sum_i X_iR_m=R_m.
$$

This is the problem. A return-only rule either puts everything into the single highest-return security, or it is indifferent among securities tied for highest return. There is no place in the rule where diversification can enter.

Markowitz's replacement is to consider return and variance together:

$$
E=R^\top X,\qquad V=X^\top\Sigma X.
$$

Here $R^\top X$ is the same weighted-average return as above, just written in vector notation. The variance formula $X^\top\Sigma X$ is different. It contains all pairwise covariance terms through $\Sigma$.

This is the asymmetry I want to keep in view: expected return is linear in the weights, while variance is quadratic in the weights. That quadratic term is where diversification enters the math. If assets do not move perfectly together, a mixture can reduce variance without giving up return in the same proportion. A return-only rule cannot see this. A mean-variance rule can.

## What does efficient mean?

Once return and variance are both in the picture, I cannot just ask for "the best" portfolio without saying what best means. Of course I would like more expected return. Of course I would like less variance. But these two wishes can point in different directions.

Some comparisons are still easy. If one portfolio gives the same return with lower variance, I would rather hold that one. If it gives higher return with the same variance, I would rather hold that one too. The hard cases are the tradeoffs: higher return and higher variance, or lower variance and lower return. At that point the math has not chosen for us. We need a risk preference.

Say portfolio $X$ has return and variance

$$
(E_X,V_X),
$$

and another feasible portfolio $Y$ has

$$
(E_Y,V_Y).
$$

Portfolio $Y$ **dominates** portfolio $X$ if

$$
E_Y\ge E_X,\qquad V_Y\le V_X,
$$

and at least one of those two inequalities is strict. In words, $Y$ is at least as good on both dimensions and strictly better on one. It gives no less return with no more variance, or the same variance with more return.

A portfolio is **efficient** if no feasible portfolio dominates it. Equivalently, $X$ is efficient if there is no other feasible $Y$ such that

$$
E_Y\ge E_X,\qquad V_Y\le V_X,
$$

with at least one strict improvement.

This definition is why the efficient set is usually a frontier rather than a single point. Along the frontier, moving toward higher return usually means accepting higher variance. Moving toward lower variance usually means accepting lower return. Markowitz gives us the set of reasonable candidates; choosing one final portfolio still requires one more choice, such as a risk-aversion parameter, a target return, or a maximum acceptable variance.

Here is a tiny example.

<style>
  .booktabs-table {
    width: min(100%, 560px);
    margin: 22px 0 26px;
    border-collapse: collapse;
    font-variant-numeric: tabular-nums;
  }

  .booktabs-table caption {
    caption-side: top;
    margin-bottom: 8px;
    color: #59616f;
    font-size: 0.94rem;
    text-align: left;
  }

  .booktabs-table thead {
    border-top: 2px solid #14171f;
    border-bottom: 1px solid #14171f;
  }

  .booktabs-table tbody {
    border-bottom: 2px solid #14171f;
  }

  .booktabs-table th,
  .booktabs-table td {
    padding: 9px 12px;
    text-align: right;
  }

  .booktabs-table th:first-child,
  .booktabs-table td:first-child {
    text-align: left;
  }
</style>

<table class="booktabs-table">
  <caption>Three hypothetical portfolios.</caption>
  <thead>
    <tr>
      <th scope="col">Portfolio</th>
      <th scope="col">Expected return</th>
      <th scope="col">Variance</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A</td>
      <td>10%</td>
      <td>0.09</td>
    </tr>
    <tr>
      <td>B</td>
      <td>8%</td>
      <td>0.04</td>
    </tr>
    <tr>
      <td>C</td>
      <td>10%</td>
      <td>0.04</td>
    </tr>
  </tbody>
</table>

Portfolio C dominates portfolio A because it has the same return and lower variance. C also dominates B because it has the same variance and higher return. But A and B are not directly comparable: A has higher return, while B has lower variance. A reader who wants return may prefer A; a reader who hates risk may prefer B. This is why Markowitz does not simply produce one universally best portfolio without saying anything about risk preference.

![AI-generated illustration of portfolio dominance and efficient frontier](/assets/blog/markowitz/ai-efficient-frontier-illustration.png?v=61036fd)

*AI-generated illustration, created with GPT-Image-2 for this post. The blue curve represents nondominated portfolios. The red point is dominated because moving upward improves return at the same risk, while moving left would reduce risk at the same return.*

## Three securities reduce to a triangle

Now we can specialize to the picture in the paper. Markowitz's figures use three securities. That is a convenient case because three portfolio weights can be drawn on a two-dimensional page.

There are three weights, $X_1$, $X_2$, and $X_3$. The budget constraint says

$$
X_1+X_2+X_3=1,
$$

so once $X_1$ and $X_2$ are chosen, $X_3$ is already determined:

$$
X_3=1-X_1-X_2.
$$

The attainable set is the triangle

$$
X_1\ge 0,\qquad X_2\ge 0,\qquad X_1+X_2\le 1.
$$

This is the triangle that appears in the plots. The corners are the three all-in portfolios: all security 1, all security 2, or all security 3.

Expected return becomes a line in this two-dimensional picture:

$$
\begin{aligned}
E
&=X_1R_1+X_2R_2+X_3R_3 \\
&=R_3+X_1(R_1-R_3)+X_2(R_2-R_3).
\end{aligned}
$$

Therefore fixed-$E$ curves are straight lines in the $(X_1,X_2)$ plane. Markowitz calls these isomean lines: "iso" means same, and "mean" here means expected return. The return vector $R$ controls their slope. If we change $R$, the blue dashed lines in the widget below rotate, while the variance ellipses stay the same.

## Variance becomes an ellipse

The next bit is just bookkeeping. I want to write the three weights using only the two coordinates that appear on the page.

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

Here $z$ is the two-dimensional coordinate in the plot. The vector $e_3$ represents the all-security-3 portfolio $(0,0,1)^\top$. The matrix $B$ tells us how the full weight vector changes when we move in the $X_1$ or $X_2$ direction.

Then the full three-security weight vector can be written as

$$
X=e_3+Bz
=
\begin{bmatrix}
X_1\\
X_2\\
1-X_1-X_2
\end{bmatrix}.
$$

Now substitute this into variance. This is where the ellipses come from:

$$
\begin{aligned}
V
&=(e_3+Bz)^\top\Sigma(e_3+Bz)\\
&=z^\top B^\top\Sigma Bz
+2(B^\top\Sigma e_3)^\top z
+e_3^\top\Sigma e_3.
\end{aligned}
$$

To keep the expression readable, define

$$
A=B^\top\Sigma B,\qquad
b=B^\top\Sigma e_3,\qquad
c=e_3^\top\Sigma e_3.
$$

Here $A$ is a $2\times 2$ matrix, $b$ is a two-dimensional vector, and $c$ is a scalar.

Then

$$
V(z)=z^\top A z+2b^\top z+c.
$$

This is a two-dimensional quadratic function. A level curve means "all points with the same value of $V$." The reason those level curves are ellipses is the same reason a simple equation like

$$
ax^2+by^2=k,\qquad a>0,\;b>0
$$

draws an ellipse: the squared terms measure distance from a center, but the two directions may be stretched by different amounts.

In the general case, the expression has a cross term and a linear term, so the ellipse may be tilted and shifted. The center of the ellipses is the point where the unconstrained variance is smallest. I call that point $z_0$. Complete the square around it:

$$
V(z)
= (z-z_0)^\top A(z-z_0)
+ \text{constant}.
$$

If $A$ is positive definite, the quadratic form is bowl-shaped rather than saddle-shaped. In that case, the eigenvectors of $A$ give the principal axes of the ellipse, and the eigenvalues control how quickly variance increases along those axes. A larger eigenvalue means variance rises faster in that direction, so the ellipse is narrower there. This is what the black curves in the plots show: all points on the same black curve have the same variance.

The unconstrained minimum-variance point, which is also the center of the ellipses, solves

$$
\nabla V=2Az+2b=0,
$$

so

$$
z_0=-A^{-1}b.
$$

If $z_0$ lies inside the triangle, the minimum-variance feasible portfolio is an interior point. If $z_0$ lies outside the triangle, the investor cannot hold that unconstrained minimum-variance portfolio under the long-only constraint. The best feasible low-variance portfolio must then occur on the boundary of the triangle.

## Critical line

The critical line is the part of the figure that took me the longest to internalize. It is not an extra constraint. It is the unconstrained path of tangency points between the isomean lines and the isovariance ellipses. Isovariance just means "same variance," so these are the black ellipse level curves from the previous section.

Here is the intuition. Fix a target expected return $E^\star$. Among all points on that fixed-return line, we want the point with the smallest variance. Geometrically, that is where the fixed-return line first touches a variance ellipse. If the line cuts through an ellipse, then there are nearby points on the same return line with smaller variance. At the minimum-variance point for that return level, the return line is tangent to the variance ellipse.

In calculus terms, minimizing $V$ while holding $E$ fixed gives the condition

$$
\nabla V = \lambda \nabla E
$$

for some multiplier $\lambda$. This says the two gradients are parallel, which is the same as saying the two level curves are tangent.

The gradient of expected return in the $(X_1,X_2)$ plane is

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

Here $d$ is a direction vector, and $t$ is just a scalar parameter that moves us along the line. Before imposing the long-only triangle, this is the direction along which the minimum-variance point moves as we ask for higher expected return. In that unconstrained picture, the relevant part of the critical line is efficient: for each return level, the tangency point is the lowest-variance way to get that return.

The triangle constraint changes the story. The line may pass through the feasible triangle, hit a boundary, or miss the triangle completely. When it is inside the triangle and moving in the direction of increasing return from the minimum-variance point, it traces the interior part of the efficient frontier. Once it leaves the triangle, the efficient set continues along a boundary if no interior point can dominate it.

To check whether the critical line intersects the attainable triangle, solve the three inequalities:

$$
z_1(t)\ge 0,\qquad z_2(t)\ge 0,\qquad z_1(t)+z_2(t)\le 1.
$$

Each inequality gives an interval of allowed $t$. The critical line intersects the triangle exactly when the three intervals overlap.

## Efficient frontier as optimization, not a grid cloud

One implementation detail is worth making explicit. It is tempting to draw a grid of many portfolios and keep the nondominated dots. That is useful for intuition, but it is not the mathematical frontier.

For a fixed target return $E^\star$, the efficient candidate is the solution of

$$
\min_X\quad X^\top\Sigma X
$$

subject to

$$
\mathbf{1}^\top X=1,\qquad R^\top X=E^\star,\qquad X_i\ge 0.
$$

Here $\mathbf{1}$ is the vector of all ones, so $\mathbf{1}^\top X=1$ is the same budget constraint as before.

Sweeping $E^\star$ from the global minimum-variance return to the maximum attainable return produces a thin efficient curve.

This distinction matters. A grid-based Pareto filter can create a dense cloud near tangencies, because many nearby grid points are almost nondominated numerically. The target-return optimization gives the cleaner object: for each required return, keep the lowest-variance portfolio that can achieve it.

## How the five notebook cases were designed

After working through the paper figures, I rebuilt five cases in the notebook. The knobs are exactly the two objects from the notation section:

- $R$, which rotates the isomean lines.
- $\Sigma$, which moves the ellipse center $z_0$ and changes the ellipse shape.

When reading the plots, it helps to keep four objects separate:

- The triangle is the set of portfolios we are allowed to hold.
- The blue dashed lines are equal-return lines. Moving to a higher blue line means higher $E$.
- The black ellipses are equal-variance curves. Moving toward the ellipse center means lower $V$.
- The red curve is the efficient set: the portfolios that survive the dominance test.

The efficient set is not simply "the top of the triangle" or "the closest point to the ellipse center." It is where the two goals meet: among portfolios that can achieve a given return, it keeps the lowest-variance ones.

### Book Fig. 2: center inside the attainable triangle

This is the cleanest case. We choose $\Sigma$ so the ellipse center $z_0$ is inside the triangle. The efficient set starts near the interior low-variance point and then moves toward higher-return portfolios.

The inputs are

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

Using $X_3=1-X_1-X_2$, the expected return becomes

$$
E=X_1R_1+X_2R_2+(1-X_1-X_2)R_3
  =0.03+0.05X_1+0.11X_2.
$$

So the isomean lines have normal vector

$$
\nabla E=
\begin{bmatrix}
R_1-R_3\\
R_2-R_3
\end{bmatrix}
=
\begin{bmatrix}
0.05\\
0.11
\end{bmatrix}.
$$

The variance is

$$
V=X^\top\Sigma X
  =0.09X_1^2+0.06X_2^2+0.04(1-X_1-X_2)^2.
$$

After collecting terms,

$$
V=0.13X_1^2+0.08X_1X_2+0.10X_2^2-0.08X_1-0.08X_2+0.04.
$$

In the form $V(z)=z^\top A z+2b^\top z+c$, where $z=(X_1,X_2)^\top$,

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
\end{bmatrix}.
$$

This point is feasible because both coordinates are nonnegative and

$$
0.210526+0.315789<1.
$$

The critical-line direction is

$$
d=A^{-1}\nabla E
=
\begin{bmatrix}
0.052632\\
1.078947
\end{bmatrix},
\qquad
z(t)=z_0+td.
$$

That is why the picture shows an interior ellipse center and an efficient set that begins near the low-variance interior region before moving toward the high-return edge.

![Markowitz book figure 2 reproduction](/assets/blog/markowitz/markowitz-book-fig2-center-inside.png)

### Book Fig. 3: center outside the attainable triangle

Here the unconstrained minimum-variance point is outside the triangle. The lowest reachable variance is no longer at the ellipse center itself; it is forced onto the feasible boundary.

The inputs are

$$
R=\begin{bmatrix}0.143594&0.140737&0.135630\end{bmatrix},
\qquad
\Sigma=
\begin{bmatrix}
4.515211&-4.122941&-0.395992\\
-4.122941&4.859773&1.065369\\
-0.395992&1.065369&0.831767
\end{bmatrix}.
$$

The expected return plane is

$$
E=0.135630+0.007964X_1+0.005107X_2,
$$

so

$$
\nabla E=
\begin{bmatrix}
0.007964\\
0.005107
\end{bmatrix}.
$$

Substituting $X_3=1-X_1-X_2$ into $V=X^\top\Sigma X$ gives

$$
\begin{aligned}
V={}&4.515211X_1^2+4.859773X_2^2+0.831767(1-X_1-X_2)^2\\
&-8.245882X_1X_2-0.791983X_1(1-X_1-X_2)
+2.130738X_2(1-X_1-X_2).
\end{aligned}
$$

After collecting terms,

$$
V=6.138961X_1^2-7.921103X_1X_2+3.560802X_2^2-2.455517X_1+0.467204X_2+0.831767.
$$

Therefore

$$
A=
\begin{bmatrix}
6.138961&-3.960551\\
-3.960551&3.560802
\end{bmatrix},
\qquad
b=
\begin{bmatrix}
-1.227758\\
0.233602
\end{bmatrix},
\qquad
c=0.831767.
$$

The ellipse center is

$$
z_0=-A^{-1}b=
\begin{bmatrix}
0.558277\\
0.555348
\end{bmatrix}.
$$

This violates the triangle constraint because

$$
0.558277+0.555348>1.
$$

The critical-line direction is

$$
d=A^{-1}\nabla E=
\begin{bmatrix}
0.007870\\
0.010188
\end{bmatrix}.
$$

The critical line still reaches the feasible triangle, but the minimum-variance center itself is outside. The efficient set is therefore pushed onto a boundary, and in this construction security 3 drops out along the efficient part.

![Markowitz book figure 3 reproduction](/assets/blog/markowitz/markowitz-book-fig3-center-outside.png)

### Exercise Case 1: critical line misses the triangle

This case is more extreme than Book Fig. 3. The ellipse center is outside the triangle, and the entire unconstrained critical line misses the triangle. The efficient portfolios must then live on a boundary.

The inputs are

$$
R=\begin{bmatrix}0.113307&0.093703&0.099861\end{bmatrix},
\qquad
\Sigma=
\begin{bmatrix}
0.042838&-0.014732&0.063320\\
-0.014732&0.127790&0.095559\\
0.063320&0.095559&0.369518
\end{bmatrix}.
$$

The return plane is

$$
E=0.099861+0.013446X_1-0.006158X_2,
$$

so

$$
\nabla E=
\begin{bmatrix}
0.013446\\
-0.006158
\end{bmatrix}.
$$

The variance expands to

$$
\begin{aligned}
V={}&0.042838X_1^2+0.127790X_2^2+0.369518(1-X_1-X_2)^2\\
&-0.029463X_1X_2+0.126640X_1(1-X_1-X_2)
+0.191117X_2(1-X_1-X_2).
\end{aligned}
$$

After collecting terms,

$$
V=0.285716X_1^2+0.391816X_1X_2+0.306191X_2^2-0.612397X_1-0.547919X_2+0.369518.
$$

Thus

$$
A=
\begin{bmatrix}
0.285716&0.195908\\
0.195908&0.306191
\end{bmatrix},
\qquad
b=
\begin{bmatrix}
-0.306198\\
-0.273960
\end{bmatrix},
\qquad
c=0.369518.
$$

The ellipse center is

$$
z_0=
\begin{bmatrix}
0.816318\\
0.372436
\end{bmatrix},
$$

which is outside the triangle because

$$
0.816318+0.372436>1.
$$

The critical-line direction is

$$
d=A^{-1}\nabla E=
\begin{bmatrix}
0.108413\\
-0.089476
\end{bmatrix}.
$$

When we solve the three feasibility inequalities for $z(t)=z_0+td$,

$$
z_1(t)\ge 0,\qquad z_2(t)\ge 0,\qquad z_1(t)+z_2(t)\le 1,
$$

the three intervals have no common overlap. So the unconstrained tangency path never enters the attainable triangle. The efficient set moves to the boundary $X_3=0$, which means security 3 is absent from efficient portfolios.

![Exercise case with a missing security](/assets/blog/markowitz/markowitz-case1-missing-security.png)

### Exercise Case 2: two securities have the same expected return

This case shows why equal return does not mean equal usefulness. Securities 1 and 2 have the same expected return, but because their covariance is negative, mixing them can reduce variance.

The inputs are

$$
R=\begin{bmatrix}0.12&0.12&0.05\end{bmatrix},
\qquad
\Sigma=
\begin{bmatrix}
0.04&-0.02&0\\
-0.02&0.04&0\\
0&0&0.025
\end{bmatrix}.
$$

Since $R_1=R_2$, the return equation is

$$
E=0.05+0.07X_1+0.07X_2.
$$

Equivalently,

$$
E=0.05+0.07(X_1+X_2).
$$

This means return only cares about the combined weight in securities 1 and 2, not how that combined weight is split between them. Geometrically, the isomean lines are parallel to the edge joining securities 1 and 2.

The variance is

$$
V=0.04X_1^2+0.04X_2^2+0.025(1-X_1-X_2)^2-0.04X_1X_2.
$$

After collecting terms,

$$
V=0.065X_1^2+0.01X_1X_2+0.065X_2^2-0.05X_1-0.05X_2+0.025.
$$

So

$$
A=
\begin{bmatrix}
0.065&0.005\\
0.005&0.065
\end{bmatrix},
\qquad
b=
\begin{bmatrix}
-0.025\\
-0.025
\end{bmatrix},
\qquad
c=0.025.
$$

The ellipse center is

$$
z_0=-A^{-1}b=
\begin{bmatrix}
0.357143\\
0.357143
\end{bmatrix}.
$$

The critical-line direction is

$$
d=A^{-1}
\begin{bmatrix}
0.07\\
0.07
\end{bmatrix}
=
\begin{bmatrix}
1\\
1
\end{bmatrix}.
$$

The equal entries in $d$ are the main visual clue. The efficient path moves in a balanced direction between securities 1 and 2. At the high-return end, the useful portfolio is not "all security 1" or "all security 2"; it is the diversified mix that exploits their negative covariance.

![Exercise case with equal returns](/assets/blog/markowitz/markowitz-case2-equal-returns.png)

### Exercise Case 3: only one portfolio is efficient

In this final case, one vertex is deliberately made both high-return and low-variance. The efficient set collapses to a single portfolio.

The inputs are

$$
R=\begin{bmatrix}0.12&0.08&0.04\end{bmatrix},
\qquad
\Sigma=
\begin{bmatrix}
0.01&0.015&0.02\\
0.015&0.04&0.04\\
0.02&0.04&0.09
\end{bmatrix}.
$$

The expected return plane is

$$
E=0.04+0.08X_1+0.04X_2.
$$

Security 1 has the largest return. The covariance matrix is also chosen so moving away from security 1 increases variance rather than reducing it.

The variance expands to

$$
\begin{aligned}
V={}&0.01X_1^2+0.04X_2^2+0.09(1-X_1-X_2)^2\\
&+0.03X_1X_2+0.04X_1(1-X_1-X_2)
+0.08X_2(1-X_1-X_2).
\end{aligned}
$$

After collecting terms,

$$
V=0.06X_1^2+0.09X_1X_2+0.05X_2^2-0.14X_1-0.10X_2+0.09.
$$

Thus

$$
A=
\begin{bmatrix}
0.06&0.045\\
0.045&0.05
\end{bmatrix},
\qquad
b=
\begin{bmatrix}
-0.07\\
-0.05
\end{bmatrix},
\qquad
c=0.09.
$$

The ellipse center is

$$
z_0=-A^{-1}b=
\begin{bmatrix}
1.282051\\
-0.153846
\end{bmatrix}.
$$

That center is infeasible because $X_2<0$. The critical-line direction is

$$
d=A^{-1}
\begin{bmatrix}
0.08\\
0.04
\end{bmatrix}
=
\begin{bmatrix}
2.256410\\
-1.230769
\end{bmatrix}.
$$

The direction points even farther toward security 1 and away from security 2. Within the feasible triangle, the portfolio $(1,0,0)$ has the highest expected return and is not beaten on variance by any other feasible mixture. Every other point is dominated, so the efficient frontier is just that one vertex.

![Exercise case where only one portfolio is efficient](/assets/blog/markowitz/markowitz-case3-single-efficient-portfolio.png)

## Interactive reconstruction

Use the preset menu to recreate the five notebook plots. Then edit $R$ or the symmetric matrix $\Sigma$ directly.

The matrix below is the covariance matrix used by the geometry. If you want to think in correlation-matrix terms, set the diagonal entries to $1$ and use correlations as the off-diagonal entries. The notebook cases use covariance matrices, so the presets keep the original $\Sigma$ values.

A good way to use the widget:

1. Start with **Book Fig. 2** and change only $R_2$. The blue isomean lines rotate, but the black ellipses do not.
2. Change one diagonal entry of $\Sigma$, such as $\Sigma_{22}$. The ellipses reshape because the variance of that asset changed.
3. Choose **Exercise 1** and notice that the green critical line misses the triangle, so the efficient set lives on a boundary.
4. Choose **Exercise 3** and notice that the red efficient set collapses to one point.

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

## Takeaway

Markowitz's main insight is not that every investor must literally use this three-security picture. The main insight is that diversification is not just a slogan. It comes from covariance.

The old rule fails because expected return alone is a weighted average. It gives no reason to diversify unless several assets tie for best expected return.

Mean-variance analysis adds the missing object: covariance. Once variance enters the decision, diversification can improve the portfolio because the covariance matrix determines whether risks offset each other.

Once we measure risk with variance, the best portfolios are no longer simply the highest-return portfolios. They are the nondominated tradeoffs between return and risk. That is the core idea behind the efficient frontier.

## References and notes

- Markowitz, Harry M. "Portfolio Selection." *The Journal of Finance* 7, no. 1 (1952): 77-91. DOI: [10.2307/2975974](https://doi.org/10.2307/2975974).
- Markowitz, Harry M. *Portfolio Selection: Efficient Diversification of Investments*. 1959. Book record available through [JSTOR](https://www.jstor.org/stable/j.ctt1bh4c8h).
- The five geometry plots and the case-by-case algebra in this post are my own reconstruction from the accompanying Markowitz notebook. The notebook chooses each return vector $R$ and covariance matrix $\Sigma$ so the ellipse center, isomean lines, critical line, and efficient set produce the five cases shown above.
- The handwritten two-stage sketch and the hand-plot-style dominance illustration were generated with GPT-Image-2 for this blog post. They are explanatory visuals, not figures from Markowitz.

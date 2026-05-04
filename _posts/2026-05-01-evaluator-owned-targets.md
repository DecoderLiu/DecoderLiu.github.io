---
layout: post
title: "Evaluator-Owned Targets in PDE Discovery"
description: "A short explanation of why a PDE-discovery agent should propose equations while the evaluator owns targets, features, and residual scoring."
category_label: "Technical note"
date: 2026-05-01
updated: 2026-05-01
---

A tempting design is to ask an agent to write a candidate PDE and also write the code that evaluates it. That looks flexible, but it quietly creates a loophole: the same system being evaluated can decide what counts as the target residual. If the target is wrong, the score can look good for the wrong reason.

## The cleaner contract

The evaluator should own the derivative target, feature construction, coefficient fitting, and residual computation. The agent should only express a hypothesis, such as an equation form and a small set of initial parameters.

- The evaluator knows which derivative is the target, such as `u_t`.
- The evaluator exposes approved features, such as `u`, spatial derivatives, and selected transforms.
- The agent proposes the equation in terms of those approved features.
- The evaluator fits coefficients and computes the residual score consistently.

## Why this matters

In PDE discovery, a low residual is meaningful only if every candidate is judged against the same target and the same feature namespace. This makes failures easier to diagnose. A bad score usually means the symbolic form is wrong, the coefficients are unstable, or the data are insufficient, not that the scoring rule shifted underneath the model.

This separation is also useful for scientific debugging. The trace can show exactly what the model proposed, what the evaluator computed, and where the mismatch occurred.

---
layout: detail
title: "PDE Evaluation Loops"
section_label: "Project"
description: "Evaluator and benchmark infrastructure for reliable PDE-discovery experiments."
permalink: /projects/pde-evaluation-loops/
---

This infrastructure project supports PDE-discovery experiments by making the scoring contract explicit and repeatable.

It exists because evaluation is part of the scientific claim. If the model can infer or construct the target derivative itself, or if the scorer changes between offline and live settings, then a good-looking result may not mean the discovered equation is valid.

## Current emphasis

- Evaluator-owned target derivatives.
- Controlled feature namespaces.
- Residual-based scoring and coefficient fitting.
- Offline and live evaluation alignment.
- Trace inspection for debugging failed discovery attempts.

## What the evaluator should protect

- The model should not define its own target variable.
- Coefficient fitting should be separated from symbolic proposal.
- Residual metrics should be comparable across runs.
- Failed attempts should leave enough evidence to distinguish a bad equation from a bad evaluation setup.

## Why it matters

Agentic scientific-discovery systems can produce impressive-looking outputs for the wrong reason if the evaluator is loose. A careful evaluator makes the experiment harder to game and easier to interpret.

## Related pages

- [PDEScientist](/projects/pdescientist/)
- [Agentic Scientific Discovery](/research/agentic-scientific-discovery/)
- [Symbolic PDE Discovery](/research/symbolic-pde-discovery/)

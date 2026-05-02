---
layout: detail
title: "Foundation Models for Science"
section_label: "Research"
description: "Training reusable models across scientific data families so discovery can transfer across related problems."
permalink: /research/foundation-models-for-science/
---

This direction asks whether models trained across many scientific systems can learn reusable structure, then adapt to new systems with limited data.

The motivation is simple: many scientific datasets are too small to support a new model from scratch, but they are not unrelated. If a model has seen many PDE families during training, it may learn reusable patterns about derivatives, nonlinear terms, coefficients, and symbolic composition.

## Current emphasis

- Treating equation discovery as a learned data-to-symbol problem.
- Pretraining across families of PDEs.
- Using scientific features, derivatives, and coefficient refinement together with sequence models.
- Studying when a general model transfers and when task-specific adaptation is still needed.

## Questions I care about

- What should a scientific foundation model learn from pretraining: syntax, operators, physical structure, or all of them?
- How can derivative and Fourier-style features be used without hiding the scientific task inside the feature pipeline?
- When does few-shot adaptation genuinely improve symbolic recovery rather than only fitting coefficients better?
- How should compositional generalization be tested in equation-discovery settings?

## Connection to my projects

FoundPDE is the current anchor project in this direction. It studies transformer-based symbolic PDE discovery from discretized solution trajectories.

The next step is to connect this foundation-model view with agentic scientific discovery: a direct model can propose a strong first equation, while an evaluator-guided system can test, repair, and refine it.

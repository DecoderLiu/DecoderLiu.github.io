---
layout: detail
title: "FoundPDE"
section_label: "Project"
description: "A generative foundation model for data-driven symbolic discovery of partial differential equations."
permalink: /projects/foundpde/
links:
  - label: "Google Scholar"
    url: "https://scholar.google.com/citations?hl=en&user=CQZcPZQAAAAJ"
---

FoundPDE studies symbolic PDE discovery as a generative modeling problem. The model maps discretized solution trajectories to symbolic PDE expressions, then refines numerical coefficients after the symbolic form is proposed.

The project treats equation discovery as a data-to-symbol task. Instead of fitting a library of candidate terms from scratch for every dataset, the model learns across many PDE families and then predicts the symbolic structure of a new system.

## What the project does

- Uses transformer-based sequence modeling for data-to-symbol prediction.
- Adds scientific feature information such as derivative and Fourier-style features.
- Refines coefficients using numerical optimization.
- Studies robustness under sparse data, noisy data, and few-shot adaptation.

## Research questions

- Can a pre-trained model recover the correct symbolic PDE family from limited spatiotemporal data?
- How much do scientific features and coefficient refinement help beyond pure sequence prediction?
- Does few-shot adaptation help the model move beyond its pretraining distribution?
- Can the model recover composite equations by assembling simpler learned structures?

## Current status

This is the current manuscript-level project. It is the foundation-model anchor of my dissertation direction and the starting point for the more iterative PDEScientist line of work.

## Role in the broader agenda

FoundPDE is the foundation-model component of my current research arc. It establishes a direct generative approach before moving to more iterative, tool-using systems.

## Related pages

- [Foundation Models for Science](/research/foundation-models-for-science/)
- [Symbolic PDE Discovery](/research/symbolic-pde-discovery/)
- [FoundPDE manuscript page](/publications/foundpde/)

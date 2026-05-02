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

## What the project does

- Uses transformer-based sequence modeling for data-to-symbol prediction.
- Adds scientific feature information such as derivative and Fourier-style features.
- Refines coefficients using numerical optimization.
- Studies robustness under sparse data, noisy data, and few-shot adaptation.

## Role in the broader agenda

FoundPDE is the foundation-model component of my current research arc. It establishes a direct generative approach before moving to more iterative, tool-using systems.

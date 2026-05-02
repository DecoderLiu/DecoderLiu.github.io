---
layout: detail
title: "Symbolic PDE Discovery"
section_label: "Research"
description: "Recovering interpretable governing equations from numerical solution fields."
permalink: /research/symbolic-pde-discovery/
---

This research direction studies how to recover symbolic partial differential equations from observed or simulated solution data. The goal is not only to predict a trajectory, but to recover a compact equation that can be inspected, tested, and reused.

For me, the important distinction is between learning a good simulator and discovering a scientific object. A black-box model can be useful, but a symbolic PDE gives a hypothesis that can be checked against known physics, transferred to new settings, and revised when it fails.

## Current emphasis

- Learning from spatiotemporal solution fields.
- Handling sparse, noisy, or heterogeneous data.
- Distinguishing symbolic correctness from downstream trajectory accuracy.
- Building evaluation loops that make failures diagnosable.

## Questions I care about

- When does a model recover the right symbolic family rather than a numerically convenient surrogate?
- How much data are needed before the governing terms become identifiable?
- How should coefficient fitting, derivative estimation, and residual scoring be separated from symbolic proposal?
- What failure modes are caused by the model, and what failures are really caused by the evaluator or data representation?

## Why it matters

Scientific machine learning becomes more useful when the output is an interpretable scientific object, not only a black-box predictor. Symbolic PDE discovery is one version of that problem: the model should produce a governing equation that a scientist can read.

## Related work on this site

- [FoundPDE](/projects/foundpde/) studies direct data-to-symbol PDE prediction.
- [PDEScientist](/projects/pdescientist/) studies iterative, evaluator-guided PDE discovery.
- [PDE Evaluation Loops](/projects/pde-evaluation-loops/) focuses on scoring contracts and trace-based diagnosis.

---
layout: detail
title: "PDEScientist"
section_label: "Project"
description: "An agentic PDE-discovery system for proposal, evaluation, and refinement."
permalink: /projects/pdescientist/
---

PDEScientist is the next stage after direct symbolic prediction. The core idea is to let a model propose candidate PDEs while evaluator tools handle target derivatives, feature construction, coefficient fitting, and residual scoring.

The project is motivated by a practical gap in scientific discovery. A one-shot model can make a plausible symbolic guess, but difficult cases often require inspecting residuals, trying alternative terms, fitting coefficients, and revising the hypothesis. PDEScientist studies that iterative loop.

## What the project studies

- Multi-turn equation proposal and revision.
- Tool feedback for coefficient fitting and residual diagnostics.
- Evaluation contracts that prevent the model from defining its own target.
- Trace-based analysis of why a proposed equation succeeds or fails.

## Design principles

- The evaluator owns the target derivative and scoring logic.
- The model proposes symbolic equations, but it should not be able to redefine the task.
- Tool feedback should be structured enough to support revision, not just pass/fail reporting.
- Each run should leave an inspectable trace of proposals, fitted coefficients, residuals, and final selection.

## Why it is different from a single model

Scientific discovery often requires iteration. A system should be able to make a proposal, test it, understand the mismatch, and use that feedback in the next attempt.

## Related pages

- [Agentic Scientific Discovery](/research/agentic-scientific-discovery/)
- [PDE Evaluation Loops](/projects/pde-evaluation-loops/)
- [Symbolic PDE Discovery](/research/symbolic-pde-discovery/)

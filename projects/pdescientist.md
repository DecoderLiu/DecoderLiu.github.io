---
layout: detail
title: "PDEScientist"
section_label: "Project"
description: "An agentic PDE-discovery system for proposal, evaluation, and refinement."
permalink: /projects/pdescientist/
---

PDEScientist is the next stage after direct symbolic prediction. The core idea is to let a model propose candidate PDEs while evaluator tools handle target derivatives, feature construction, coefficient fitting, and residual scoring.

## What the project studies

- Multi-turn equation proposal and revision.
- Tool feedback for coefficient fitting and residual diagnostics.
- Evaluation contracts that prevent the model from defining its own target.
- Trace-based analysis of why a proposed equation succeeds or fails.

## Why it is different from a single model

Scientific discovery often requires iteration. A system should be able to make a proposal, test it, understand the mismatch, and use that feedback in the next attempt.

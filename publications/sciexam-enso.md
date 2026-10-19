---
layout: detail
title: "SciExam for ENSO: Can AI Agents Build Climate Models?"
section_label: "Publication"
description: "arXiv 2026 preprint on whether AI agents can build low-order stochastic models of the El Niño-Southern Oscillation from real observations."
permalink: /publications/sciexam-enso/
links:
  - label: "arXiv"
    url: "https://arxiv.org/abs/2610.10513"
---

Authors: Yinling Zhang, Langchen Liu, Dongbin Xiu, Xueyan Zou, Xu Kuang, Mengdi Wang, and Shilong Liu.

Preprint, arXiv:2610.10513, October 2026.

## Summary

SciExam for ENSO tests whether AI agents can build low-order stochastic models of the El Niño-Southern Oscillation (ENSO) from real observations within a 6-hour budget. The agents write and freeze their own diagnostics. Hidden graders then score each final model on its statistics, its reconstruction of unobserved variables, and its forecasts of held-out years, and they score a published reference model the same way.

## Results

- 12 agent systems were evaluated, built on the Claude Code, Codex, and Antigravity harnesses.
- 6 of the 12 final models exceed the composite score of the published reference model (0.378). The best scores 0.515, about 36% higher, mainly through reconstruction and forecasting.
- The simplified forms of the agent-built models fall into two families that match two competing explanations of the warm-cold asymmetry of ENSO, a debate the task never mentions.

## Role in my research path

This work extends my interest in evaluating AI agents for science from equation discovery to climate modeling. It shares a theme with [PDEDiscoveryBench](/projects/pdediscoverybench/): agents are scored by evaluators they do not control.

## Topics

- AI agents for scientific modeling.
- Low-order stochastic models of ENSO.
- Hidden graders and held-out evaluation.

## Related pages

- [PDEDiscoveryBench](/projects/pdediscoverybench/)
- [Agentic Scientific Discovery](/research/agentic-scientific-discovery/)

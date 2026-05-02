---
layout: detail
title: "Agentic Scientific Discovery"
section_label: "Research"
description: "Building systems that propose scientific hypotheses, call tools, inspect feedback, and revise."
permalink: /research/agentic-scientific-discovery/
---

This direction studies how AI systems can participate in scientific workflows where one-shot prediction is not enough. A useful scientific agent should propose hypotheses, call evaluators, inspect errors, and revise its next attempt.

I am interested in agents as scientific workflow systems, not just chat interfaces. The useful version is a loop: propose a symbolic hypothesis, evaluate it with controlled tools, inspect the mismatch, and decide what to try next.

## Current emphasis

- Separating hypothesis generation from evaluator-owned scoring.
- Giving agents tools for coefficient fitting, residual evaluation, and data inspection.
- Recording traces so failures can be understood after the run.
- Designing benchmarks where success means scientific validity, not only plausible text.

## Questions I care about

- What information should an agent be allowed to see, and what should remain evaluator-owned?
- How can tool feedback make the next symbolic proposal better rather than merely adding more text?
- What trace information is needed to diagnose why a scientific-discovery run failed?
- How do we evaluate a multi-turn discovery process without letting the model game the benchmark?

## Connection to my projects

PDEScientist is the main project in this direction. It extends symbolic PDE discovery into an iterative, tool-using scientific-discovery loop.

This direction also feeds back into evaluation design. If the evaluator is too permissive, an agent can appear successful for the wrong reason. If the evaluator is too narrow, the system may fail even when the scientific idea is close.

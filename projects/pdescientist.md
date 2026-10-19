---
layout: detail
title: "PDEScientist"
section_label: "Project"
description: "An AI researcher for equation discovery that combines frontier LLM reasoning with classical scientific tools. Supported by Anthropic's AI for Science Program."
permalink: /projects/pdescientist/
---

PDEScientist is the next stage after direct symbolic prediction with [FoundPDE](/projects/foundpde/) and the comparison of methods in [PDEDiscoveryBench](/projects/pdediscoverybench/). The goal is an AI researcher for equation discovery: a system that combines frontier LLM reasoning with classical scientific tools such as sparse regression, symbolic regression, and simulation.

The project is motivated by a practical gap in scientific discovery. A single method can make a plausible guess, but difficult cases often require choosing a different method, collecting new evidence, and testing competing hypotheses. PDEScientist studies that research loop.

The project is supported by Anthropic's AI for Science Program (October 2026). Team: Langchen Liu, Lu Lu (PI), and Yinling Zhang.

## The research loop

- Observe the data.
- Choose a method.
- Extract evidence.
- Design an experiment.
- Validate the result.
- Improve the research strategy.

## An example

Sparse regression proposes an equation, but the equation fails on a new trajectory. The agent diagnoses missing terms, widens the candidate library, and reruns. If two equations still fit the data, it designs an experiment that separates them.

## How it will be evaluated

- An interactive environment with hidden generating equations.
- An independent evaluator that the agent does not control.
- Sealed, held-out equation families.
- Arms that range from a fixed-prompt agent to an adaptive agent, an agent that designs experiments, and an agent that learns from verified past attempts.
- Matched budgets across arms.

## Design principles

- The evaluator owns the target and scoring logic.
- The agent proposes equations and experiments, but it should not be able to redefine the task.
- Tool feedback should be structured enough to support revision, not just pass/fail reporting.
- Each run should leave an inspectable trace of proposals, evidence, and final selection.

## Why it is different from a single model

Scientific discovery often requires iteration. A system should be able to make a proposal, test it, understand the mismatch, and use that feedback in the next attempt.

## Related pages

- [PDEDiscoveryBench](/projects/pdediscoverybench/)
- [Agentic Scientific Discovery](/research/agentic-scientific-discovery/)
- [PDE Evaluation Loops](/projects/pde-evaluation-loops/)
- [Symbolic PDE Discovery](/research/symbolic-pde-discovery/)

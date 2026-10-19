---
layout: detail
title: "PDEDiscoveryBench"
section_label: "Project"
description: "A benchmark for discovering governing equations from observations, comparing classical equation-discovery methods and LLM agents under controlled scientific priors and noise."
permalink: /projects/pdediscoverybench/
---

PDEDiscoveryBench asks a simple question: given observations of a system, can a method recover the governing equation? It compares classical equation-discovery methods and tool-using LLM agents on the same systems, the same data, and the same scoring.

The paper is currently under review.

## What the benchmark contains

- 337 ODE and PDE systems from 19 equation families, stored in one schema.
- 332 systems come with a reference equation and a natural-language "prior card" describing the system.
- 5 blood-flow fields simulated with CFD have no documented governing equation and are left unlabeled.

## Methods compared

- Sparse regression: SINDy and WSINDy.
- Symbolic search: SGA-PDE (genetic programming) and DISCOVER (reinforcement learning).
- LLM-guided search: LLM-PDESR.
- Two tool-using LLM agents: GPT-5.6-sol and Claude Opus 5.

## Protocol

The protocol crosses three levels of disclosed scientific prior (generic, partial physical guidance, and equation-informed) with four noise tiers (clean, 1%, 5%, and 10%).

Scoring covers exact structural recovery of the equation, held-out NMSE, noise robustness, compute cost, and pipeline failures.

## Main findings

- Results depend strongly on the scientific prior a method receives, at every noise level. For each of the six methods run on noisy data, exact recovery is higher with the equation-informed prior than with the generic prior at every noise tier.
- Noise still matters. Going from clean data to 10% noise costs every method 26 to 62 points of exact recovery.

## Case studies

- A wrong prior card led the agents to 0 of 12 exact answers, against 4 of 4 for the controls.
- Telling the agents the noise model raised exact recovery on 20 Fokker-Planck systems from 8 to 21 of 40, pooled.
- Without the true-term-count oracle, the exact recovery of sparse regression falls sharply while its fit error improves.

## Flow fields with no documented equation

For the five CFD blood-flow fields, the physics was hidden: channels were anonymized and rescaled. Claude agents returned relations containing the steady Stokes balance for all five fields, and steady Navier-Stokes momentum for the two fields with the highest Reynolds number.

These are hypotheses, not verified recoveries. The fields have no ground-truth equation, and inertia is at most 0.24% of the pressure force.

## Role in the broader agenda

PDEDiscoveryBench is the evaluation component of my research arc. It measures where classical methods and LLM agents succeed or fail, which sets up the next stage, [PDEScientist](/projects/pdescientist/), an AI researcher for equation discovery. Notes on evaluator design are on the [PDE Evaluation Loops](/projects/pde-evaluation-loops/) page.

## Related pages

- [PDEDiscoveryBench paper page](/publications/pdediscoverybench/)
- [PDE Evaluation Loops](/projects/pde-evaluation-loops/)
- [PDEScientist](/projects/pdescientist/)
- [Symbolic PDE Discovery](/research/symbolic-pde-discovery/)
- [Agentic Scientific Discovery](/research/agentic-scientific-discovery/)

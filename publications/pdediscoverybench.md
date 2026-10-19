---
layout: detail
title: "PDEDiscoveryBench"
section_label: "Publication"
description: "Under review. A benchmark for discovering governing equations from observations, comparing classical equation-discovery methods and LLM agents."
permalink: /publications/pdediscoverybench/
---

First author: Langchen Liu.

This paper is currently under review.

## Summary

PDEDiscoveryBench evaluates equation discovery from observations across 337 ODE and PDE systems from 19 equation families. It compares seven methods, from sparse regression and symbolic search to LLM-guided search and two tool-using LLM agents, under three levels of disclosed scientific prior and four noise tiers.

The main finding is that results depend strongly on the scientific prior a method receives, at every noise level. Noise still matters: going from clean data to 10% noise costs every method 26 to 62 points of exact recovery.

The benchmark also includes five CFD blood-flow fields with no documented governing equation. With the physics hidden, Claude agents returned relations containing the steady Stokes balance for all five fields. These are reported as hypotheses, since no ground-truth equation exists.

## Role in my research

This is the evaluation component of my research arc. It sits between direct symbolic prediction with FoundPDE and the next-stage AI researcher, PDEScientist.

## Topics

- Equation discovery from observations.
- Classical methods versus tool-using LLM agents.
- Scientific priors, noise robustness, and failure analysis.
- Discovery on data with no documented governing equation.

## Related pages

- [PDEDiscoveryBench project](/projects/pdediscoverybench/)
- [PDEScientist](/projects/pdescientist/)
- [Symbolic PDE Discovery](/research/symbolic-pde-discovery/)

---
itemId: sw-acuity-ceiling-rule
itemType: Software Item Spec
itemImplements: rq-acuity-ceiling
---

# Acuity ceiling rule evaluator

## Item fields

### Description

A deterministic evaluator that runs after model inference and before any
recommendation is returned. It matches the input symptom set against the
high-acuity pattern table and, on a match, replaces the recommendation with a
clinician-review escalation.

The evaluator is pure and table-driven: no model call participates in the
decision, so its behaviour is reproducible from the pattern table version alone.
